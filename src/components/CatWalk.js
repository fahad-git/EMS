import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Image, Container, Button } from 'react-bootstrap';
import TextEllipsis from 'react-text-ellipsis';
import FloatActionButton from './FloatActionButton';
import { ToastContainer, toast } from 'react-toastify';
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs goes here
import { RefreshToken } from './API/Auth';
import { EventOptions, EventVideoById } from './API/userAPIs';



// const videos = [
//     {
//         catwalk:"https://www.youtube.com/embed/I5HzV76t01c",
//         title:"VEMINA CITY CATWALK CPM Moscow Fall 2016 2017 by Fashion Channel",
//         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//     },
//     {
//         catwalk:"https://www.youtube.com/embed/7ccefq8s7eU",
//         title:"Evolving Trends in Runway Fashion - 2017 to 2018 Spring-Summer Seasons",
//         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//     },
//     {
//         catwalk:"https://www.youtube.com/embed/-PtDp5C6QB4",
//         title:"Evolving Trends in Runway Fashion - 2018 to 2019 Spring-Summer Seasons",
//         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//     }
// ]

const styles = {
    frame : {
        width:"100%",
        height:"100%"
    },
    align : {
        textAlign:"left",
    },
    description:{
        position:"absolute",
        textAlign:"left"
    },
    header: {
        backgroundColor:"skyblue",
        textAlign:"left"
    },
    tile:{
        width:"100%",
        minHeight:"15%",
        cursor: "pointer",
        marginBottom:"50px"
    },
    videoFrame:{
        width:"100%",
        height:"400px"
    }
}

function CatWalk(){

    const [selectedVideo, setSelectedVideo] = useState();
    const [isOrganizer, setIsOrganizer] = useState(0);
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [videos, setVideos] = useState([]);

    const [screenName, setScreenName] = useState("");

    const history = useHistory();

    const selectCatwalkHandler = (catwalk) => {
        setSelectedVideo(catwalk);
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

            EventVideoById(ID)
            .then(res => {
                console.log(res.data);
               setVideos(res.data);
               setSelectedVideo(res.data? res.data[0]: []);
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
                setScreenName(res.data[0][0].video)
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
    
    }, [])

    return  <>
                    <hr/>
                    <Container fluid>
                    <Row style={styles.header} className="mb-4">
                        <Col>
                            <h1> {screenName} </h1>
                        </Col>    
                        <Col style={{display: (isOrganizer) ? "block" : "none" }}>
                            <Button className="float-right" style={{height:"100%"}} variant="secondary" onClick={ editVideoHandler }>Edit</Button>
                        </Col>
                    </Row>  
                    <Row>
                        <Col xs={{span:12, order:'first'}} sm={4} style={{overflowY:"scroll"}}>
                            <Row>
                                <Col>
                                    {videos.map( ({video_Id, event_Id, title, description, type, link, status}, index) => (
                                        <span key = {index}>
                                            <Row style={styles.tile} className="mb-5" onClick={ () => selectCatwalkHandler({video_Id, link, title, description}) }>
                                                <Col>
                                                    <iframe
                                                        style = {styles.frame}
                                                        src= {link}
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
                                                                console.log();
                                                            // console.log('text get truncated');
                                                            else 
                                                                console.log();
                                                            // console.log('text does not get truncated');
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
  
                        <Col xs={{span:12, order:'last'}} sm={8} style={{overflowY:"scroll"}}> 
                            <Row style={styles.videoFrame }>
                                <Col xs={12}>
                                    <iframe 
                                        style = {styles.frame}
                                        src= {selectedVideo?.link}
                                        frameBorder="0" 
                                        allowFullScreen>
                                    </iframe>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 style={styles.align}>
                                        { selectedVideo?.title }
                                        <br/>
                                        {selectedVideo?.type}
                                    </h4>
                                    <p style={styles.description}>
                                        { selectedVideo?.description }
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{height:"12vh"}}></div>      
                    </Container>
                    <FloatActionButton />
            </>

}
export default CatWalk;