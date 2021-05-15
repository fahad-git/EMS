import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DynamicModal from './DynamicModal';
import { ToastContainer, toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

import AddWebinarForm from "./AddWebinarForm";
import FloatActionButton from './FloatActionButton';

import { RefreshToken } from './API/Auth';
import { EventWebinarById, RemoveWebinarFromEvent, EventOptions } from './API/userAPIs';


const styles = {
    container:{
        textAlign:"left",
        padding:"0px 50px"
    },
    header: {
      
        textAlign:"center"
    },
}

function Webinar() {

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();


    const [isOrganizer, setIsOrganizer] = useState(0);

    const [screenName, setScreenName] = useState("");

    const [content, setContent] = useState();
    const history = useHistory()

    const [webinars, setWebinars] = useState([]);

    const addWebinarHandler = () => {
            let cont = {
                header:"ADD Webinar",
                component:<AddWebinarForm />,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
    }

    const removeWebinarHandler = (linkId, eventId) => {
        confirmAlert({
            title: 'Removing Webinar',
            message: 'Are you sure to remove this webinar?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    
                    RemoveWebinarFromEvent({'link_Id':linkId, 'event_Id':eventId})
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
    
    useEffect(()=>{

        var arr = history.location.pathname.split("/");
    
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

        
        EventWebinarById(ID)
        .then(res => {
            console.log(res.data);
           setWebinars(res.data);
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

        EventOptions(ID)
        .then(res => {
            setScreenName(res.data[0][0].links)
            setIsOrganizer(res.data[1][0].organizer);
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
                    <Row style={styles.header} className="mb-4">
                        <Col>
                            <h1> <u>{screenName}</u> </h1>
                        </Col>  
                    </Row>
                    <Row>
                        <Col style={{display: (isOrganizer) ? "block" : "none" }}>
                                <Button className="mb-5 float-right" variant="secondary" onClick={ addWebinarHandler }>ADD Webinar</Button>
                        </Col>
                    </Row>

                    <hr/>
                    {
                    webinars.map( ({link_Id, event_Id, title, description, type, date, duration, link, status, platform}, index) => (
                    <Row key={index} className="mb-5">
                        <Col className="event-items">
                            <Row><Col>
                            <h3>{title}</h3>
                            </Col>
                            <Col>
                                <p>Date & Time: {(new Date(date)).toString() }</p>
                            </Col></Row>
                            <Row><Col>
                            <p>Category: {type}</p>
                            </Col><Col>
                            <p>Duration: {duration}</p>
                            </Col></Row>
                            <Row><Col>
                                <p>Details: {description}</p>
                            </Col><Col>
                                <p>Platform: {platform} </p>
                            </Col></Row>
                            <Row>
                            <Col sm={8} >
                                <p>Link: <a href={link} >{link}</a></p>
                            </Col>
                            <Col sm={4} style={{display: (isOrganizer) ? "block" : "none" }}>
                                <Button className="mt-2 float-right" variant="secondary" onClick={ () => removeWebinarHandler(link_Id, event_Id) }>Remove</Button>
                            </Col>
                            </Row>
                            <hr/>
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
export default Webinar;