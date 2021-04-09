import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DynamicModal from './DynamicModal';
import { ToastContainer, toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

import AddVideoForm from "./AddVideoForm";
import FloatActionButton from './FloatActionButton';

import { RefreshToken } from './API/Auth';
import { EventVideoById, RemoveVideoFromEvent } from './API/userAPIs';

const videos = [
    {
        catwalk:"https://www.youtube.com/embed/I5HzV76t01c",
        title:"VEMINA CITY CATWALK CPM Moscow Fall 2016 2017 by Fashion Channel",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        catwalk:"https://www.youtube.com/embed/7ccefq8s7eU",
        title:"Evolving Trends in Runway Fashion - 2017 to 2018 Spring-Summer Seasons",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        catwalk:"https://www.youtube.com/embed/-PtDp5C6QB4",
        title:"Evolving Trends in Runway Fashion - 2018 to 2019 Spring-Summer Seasons",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
]


const styles = {
    container:{
        textAlign:"left",
        padding:"0px 50px"
    }
}

function AddVideos() {

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [content, setContent] = useState();
    const history = useHistory()

    const [videos, setVideos] = useState([]);

    const addVideoHandler = () => {
            let cont = {
                header:"ADD VIDEOS",
                component:<AddVideoForm />,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
    }

    const removeVideoHandler = (videoId, eventId) => {
        confirmAlert({
            title: 'Removing Video',
            message: 'Are you sure to remove this video?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    
                    RemoveVideoFromEvent({'video_Id':videoId, 'event_Id':eventId})
                    .then(res => {
                        toast("Removed Successfully", {
                            type:"info",
                            });
                        window.location.reload();
                    }).catch(err => {
                        console.log(err)
                        if(err.message === "INVALID"){
                            toast("Please login to access events", {
                                type:"info",
                                });
                        }else if(err.message === "EXPIRED"){
                            toast("You must login first", {
                                type:"info",
                                });
                                localStorage.clear();
                                toggleHeader(true);
                                window.location.reload();
                                history.push("/");
                        }else if(err.message === "REFRESH"){
                            RefreshToken()
                            .then(res => {
                                if(res.data.success){
                                    console.log("Token Refreshed")
                                    var d = new Date();
                                    d.setSeconds(d.getSeconds() + res.data.user.tokenExpiry);
                                    res.data.user.tokenExpiry = d;
                                    setUser(res.data.user);
                                }
                            }).catch(err => {
                                console.log(err);
                                localStorage.clear();
                                toggleHeader(true);
                                window.location.reload();
                                history.push("/");
                            })
                        }
                    });



                }
              },
              {
                label: 'No',
                onClick: () => console.log()
              }
            ]
          });
    }
    
    const viewVideoHandler = () => {
        history.goBack();
    }

    useEffect(()=>{

        var arr = history.location.pathname.split("/");
        console.log(arr)
    
        var ID = -1;
        for(let i of arr)
            if(!Number.isNaN(parseInt(i))){
                ID = parseInt(i);
                break;
            }
            
        if(ID === -1){
            history.goBack();
            return;
        }

        
        EventVideoById(ID)
        .then(res => {
            console.log(res.data);
           setVideos(res.data);
        }).catch(err => {
            console.log(err)
            if(err.message === "INVALID"){
                toast("Please login to access events", {
                    type:"info",
                    });
            }else if(err.message === "EXPIRED"){
                toast("You must login first", {
                    type:"info",
                    });
                    localStorage.clear();
                    toggleHeader(true);
                    window.location.reload();
                    history.push("/");
            }else if(err.message === "REFRESH"){
                RefreshToken()
                .then(res => {
                    if(res.data.success){
                        console.log("Token Refreshed")
                        var d = new Date();
                        d.setSeconds(d.getSeconds() + res.data.user.tokenExpiry);
                        res.data.user.tokenExpiry = d;
                        setUser(res.data.user);
                    }
                }).catch(err => {
                    console.log(err);
                    localStorage.clear();
                    toggleHeader(true);
                    window.location.reload();
                    history.push("/");
                })
            }
        });

    }, [modalOpen])
    

    return  <>
            {    modalOpen ? <DynamicModal content={content} /> : <></> }
            <div className="dashboard">
                <Container style={styles.container}>
                    <Row>
                        <Col>
                            <Button className="mb-5 float-right" variant="secondary" onClick={ viewVideoHandler }>View</Button>
                            <Button className="mb-5 float-right" variant="secondary" onClick={ addVideoHandler }>ADD Video</Button>
                        </Col>
                    </Row>
                    {
                    videos.map( ({video_Id, event_Id, title, description, type, link, status}, index) => (
                    <Row key={index} className="mb-5">
                        <Col className="event-items">
                            <Row><Col>
                            <h3>{title}</h3>
                            <h4>Category: {type}</h4>
                            <p>{description}</p>
                            </Col></Row>
                            <Row>
                            <Col sm={8} >
                                <p>Link: <a href={link} >{link}</a></p>
                            </Col>
                            <Col sm={4}>
                                <Button className="mt-2 float-right" variant="secondary" onClick={ () => removeVideoHandler(video_Id, event_Id) }>Remove</Button>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                    ))
                    }
                    <div style={{height:"12vh"}}></div>
                </Container>
            </div>
            <FloatActionButton/>
            </>
}
export default AddVideos;