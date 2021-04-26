import React, { useState, useContext, useEffect } from 'react';
import  { useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import FloatActionButton from './FloatActionButton';

import ImageMapper from 'react-image-mapper';
import IMAGE_URL from './../assets/images/main-lobby.jpg'
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';
import DynamicModal from './DynamicModal';
import ChangIconNames from './ChangeIconNames';

// APIs goes here
import { RefreshToken } from './API/Auth';
import { EventOptions } from './API/userAPIs';

// css goes here
import './../assets/css/MainLobby.css';

const imgs = {
    src1:"https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3aaa3d4c-33d5-4df8-8dc2-17fb1a0f302a/15.jpg",
    src2:"https://lh3.googleusercontent.com/proxy/Tj_crS8zZBsCE383p0KL3HxPW44QJZeAuW1wyNBgXMWy9mfcme9h0TEgmD9dOHwZ1dfpLI9C4e6NdNo1TsOHieipKjMCbvyQ2RfgBeilIvIb_J_xGS3APNIxML9zPaXn6RGCMaBx3ryuGaLmx-SR0wGZjBSm4-aduicD2aG7FktUmaenjiwcY4c",
    src3:"https://lh3.googleusercontent.com/proxy/Tj_crS8zZBsCE383p0KL3HxPW44QJZeAuW1wyNBgXMWy9mfcme9h0TEgmD9dOHwZ1dfpLI9C4e6NdNo1TsOHieipKjMCbvyQ2RfgBeilIvIb_J_xGS3APNIxML9zPaXn6RGCMaBx3ryuGaLmx-SR0wGZjBSm4-aduicD2aG7FktUmaenjiwcY4c",
    src4:"http://www.onextrapixel.com/wp-content/uploads/2012/01/products-design-3.jpg",
    src5: "https://assets.crowdspring.com/marketing/landing-page/crowdspring-product-design-phase1-1120.jpg"
}

const styles = {
    img: {
        width:100,
        height:100
    },
    btn:{
        width:"150px",
        height:"100px",
        marginTop:"10px",
    },
    userBtn:{
        width:"150px",
        height:"100px",
        marginTop:"10px",
    },
    align:{
        marginLeft:"10px !important"
    }
}

// const IMAGE_URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg" 
const AREAS_MAP = { name: "my-map",
areas: [
  { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
  { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },
  { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
  { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
  { name: "5", shape: "circle", coords: [170, 100, 25 ] },
]}


function MainLobby(){

    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();
    const [content, setContent] = useState();

    var [isOrganizer, toggleIsOrganizer] = useState(false);

    const [eventOptions, setEventOptions] = useState();

    const {state, dispatch} = useContext(MyContext);

    const ID = history.location.pathname.split("/").pop();

    const catwalkHandler = () => {
            history.push(history.location.pathname + "/catwalk");
    }

    const helpDeskHandler = () => {
        history.push("/main-lobby/" + ID + "/help-desk")
    }

    const exhibitorsHandler = () => {
        history.push("/main-lobby/" + ID + "/exhibitors");
    }

    const webinarHandler = () => {
        history.push("/main-lobby/" + ID + "/webinar");
    }

    const userManagementHandler = () => {
        history.push("/main-lobby/" + ID + "/user-management");
    }

    const changeIconNamesHandler = () => {
        let cont = {
            header:"Change Names",
            component:<ChangIconNames id = {ID}/>,
            footer:""
        }
        setContent(cont);
        toggleModelOpen(true);
    }

    useEffect(() => {

        EventOptions(ID)
        .then(res => {
            setEventOptions(res.data[0][0]);
            toggleIsOrganizer(res.data[1][0].organizer);
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
                <ToastContainer 
                    position="top-left"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {modalOpen ? <DynamicModal content={content} /> : <></> }


                <div className="main-lobby">
                    <Container fluid style={{position: 'absolute', top: 100}}>
                    <Row className="justify-content-center">
                        <Col>
                            <center>
                            <Button size="lg" onClick={catwalkHandler}  style={{...styles.btn, ...{display: eventOptions && eventOptions.video? "block": "none"} } } variant="outline-light">{eventOptions && eventOptions.video?eventOptions.video:"" }</Button>
                            </center>
                        </Col>
                        <Col>
                            <center>
                            <Button onClick={helpDeskHandler} style={{...styles.btn, ...{display: eventOptions && eventOptions.helpdesk? "block": "none"} }} variant="outline-light">{eventOptions && eventOptions.helpdesk?eventOptions.helpdesk:"" } </Button>
                            </center>
                        </Col>
                        <Col style={{display: (isOrganizer) ? "block" : "none" }}>
                            <center>
                            <Button onClick={userManagementHandler} style={styles.userBtn} variant="outline-light">User Management</Button>
                            </center>
                        </Col>       

                        <Col>
                            <center>
                            <Button onClick={exhibitorsHandler} style={{...styles.btn, ...{display: eventOptions && eventOptions.stalls? "block": "none"} }} variant="outline-light">{eventOptions && eventOptions.stalls?eventOptions.stalls:"" } </Button>
                            </center>
                        </Col>
                        <Col>
                            <center>
                            <Button onClick={webinarHandler} style={{...styles.btn, ...{display: eventOptions && eventOptions.links? "block": "none"} }} variant="outline-light">{eventOptions && eventOptions.links?eventOptions.links:"" } </Button>
                            </center>
                        </Col>
                    </Row>
                    <br/><br/><br/><br/>
                    <Row className="mt-5">
                        <Col style={{display: (isOrganizer) ? "block" : "none" }}>
                            <center>
                            <Button onClick={changeIconNamesHandler} style={styles.userBtn} variant="outline-light">Change Icon Names</Button>
                            </center>
                        </Col> 
                    </Row>
                    </Container>
                </div>   
                {/* <FloatActionButton /> */}
            </>

}

export default MainLobby;

                    {/* <Container>
                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src1} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src2} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src3} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src4} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src5} rounded/>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Container> */}
                    {/* <ImageMapper src={IMAGE_URL} map={AREAS_MAP} width={1400} /> */}
