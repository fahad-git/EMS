import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Image, Container, Button } from 'react-bootstrap';
import TextEllipsis from 'react-text-ellipsis';
import FloatActionButton from './FloatActionButton';
import { ToastContainer, toast } from 'react-toastify';
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs goes here
import { RefreshToken } from './API/Auth';
import { EventOptions } from './API/userAPIs';



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
    frame : {
        width:"100%",
        height:"100%"
    },
    align : {
        textAlign:"left"
    },
    header: {
        backgroundColor:"skyblue",
        textAlign:"left"
    },
    tile:{
        width:"100%",
        height:"30%",
        cursor: "pointer"
    },
    videoFrame:{
        width:"100%",
        height:"40%"
    }
}

function CatWalk(){

    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [userRole, setUserRole] = useState();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();


    const history = useHistory();

    const selectCatwalkHandler = (catwalk) => {
        setSelectedVideo(catwalk);
        console.log("Working")
    }

    const editVideoHandler = () => {
        history.push(history.location.pathname + "/add-videos");
    }

    useEffect(() => {

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

            EventOptions(ID)
            .then(res => {
                setUserRole(res.data.role);
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
    
    }, [])

    return  <>
                    <hr/>
                    <Container>
                    <Row style={{display: (userRole === "attendee") ? "none" : "block" }}>
                        <Col>
                            <Button className="mb-5 float-right" variant="secondary" onClick={ editVideoHandler }>Edit</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h1 style={styles.header}> CatWalks </h1>
                                </Col>    
                            </Row>  
                            <Row>
                                <Col>
                                    {videos.map( ({catwalk, title, description}, index) => (
                                        <span key = {index}>
                                            <Row style={styles.tile} onClick={ () => selectCatwalkHandler({catwalk, title, description}) }>
                                                <Col>
                                            
                                                <iframe
                                                    
                                                    style = {styles.frame}
                                                    src= {catwalk}
                                                >
                                                </iframe>

                                                </Col>
                                                <Col>
                                                    <p style={styles.align}><b>{title} </b></p>
                                                    <TextEllipsis 
                                                        style={styles.align}
                                                        lines={4} 
                                                        tag={'p'} 
                                                        ellipsisChars={'...'} 
                                                        tagClass={'className'} 
                                                        debounceTimeoutOnResize={200} 
                                                        useJsOnly={true} 
                                                        onResult={(result) => { 
                                                            if (result === TextEllipsis.RESULT.TRUNCATED)
                                                                console.log('text get truncated');
                                                            else 
                                                                console.log('text does not get truncated');
                                                            }}>
                                                    {description}
                                                    </TextEllipsis>                                                        
                                                </Col>
                                            </Row>
                                            <hr/>
                                        </span>
                                    ))
                                    }
                                </Col>
                            </Row>
                        </Col>
  
                        <Col>
                            <Row style={styles.videoFrame }>
                                <Col>
                                    <iframe 
                                        style = {styles.frame}
                                        src= {selectedVideo.catwalk}
                                        frameBorder="0" 
                                        allowFullScreen>
                                    </iframe>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 style={styles.align}>
                                        { selectedVideo.title }
                                    </h4>
                                    <p style={styles.align}>
                                        { selectedVideo.description }
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Container>
                    <FloatActionButton />

            </>

}
export default CatWalk;