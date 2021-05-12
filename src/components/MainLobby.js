import React, { useState, useContext, useEffect } from 'react';
import  { useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import FloatActionButton from './FloatActionButton';

import ImageMapper from 'react-image-mapper';
import IMAGE_URL from './../assets/images/main-lobby.jpg'
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';
import DynamicModal from './DynamicModal';
import ChangIconNames from './ChangeIconNames';

import "./../assets/css/Stalls.css";

// APIs goes here
import { RefreshToken } from './API/Auth';
import { EventOptions, EventLobbyImages, UpdateEventLobbyImages } from './API/userAPIs';

import screen1 from "./../assets/images/advertise5.png";
import screen2 from "./../assets/images/advertise5.png";
import screen3 from "./../assets/images/advertise5.png";
import screen4 from "./../assets/images/advertise5.png";
import screen5 from "./../assets/images/advertise5.png";

import gate1 from "./../assets/images/gate1.png";
import gate2 from "./../assets/images/gate2.png";
import reception from "./../assets/images/reception.png";

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
    adScreen:{
        width:"90px",
        height:"60px",
        border:"2px solid"
    },
    lcdScreen:{
        width:"200px",
        height:"130px",
        border:"2px solid",
        backgroundColor:"rgba(85, 83, 83, 0.425) !important"
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

    var [logoImg1, setLogoImg1] = useState(); 
    var [logoImg2, setLogoImg2] = useState(); 
    var [logoImg3, setLogoImg3] = useState(screen3); 
    var [logoImg4, setLogoImg4] = useState(screen4); 
    var [logoImg5, setLogoImg5] = useState(screen5);
    var [sideScreenLeft, setSideScreenLeft] = useState(screen1); 
    var [sideScreenRight, setSideScreenRight] = useState(screen1); 


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


    
    const pictureHandler = (event, loc) => {
        let file = event.target.files[0]
        if(!file)
            return
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        if(file.size > 3200000){
            toast("File is too large! max file size limit is 2 MB", {type:"error"})
            return;
        }
        reader.onloadend = function (e) {
            let img = {}
            img[loc] = reader.result;
            UpdateEventLobbyImages(ID, img)
            .then(res => {
                toast("Image updated!" , {type:"info"})
                switch(loc){
                    case "logo1":
                        setLogoImg1(reader.result);
                        break;
                    case "logo2":
                        setLogoImg2(reader.result);
                        break;
                    case "logo3":
                        setLogoImg3(reader.result);
                        break;
                    case "logo4":
                        setLogoImg4(reader.result);
                        break;
                    case "logo5":
                        setLogoImg5(reader.result);
                        break;
                    case "side_screen_left":
                        setSideScreenLeft(reader.result);
                        break;
                    case "side_screen_right":
                        setSideScreenRight(reader.result);
                        break;
                }
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
                }else  toast("Unknow error! try again later", {type:"error"})
            });
        }
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

        EventLobbyImages(ID)
        .then(res => {
            setLogoImg1(res.data[0].logo1)
            setLogoImg2(res.data[0].logo2)
            setLogoImg3(res.data[0].logo3)
            setLogoImg4(res.data[0].logo4)
            setLogoImg5(res.data[0].logo5)
            setSideScreenLeft(res.data[0].side_screen_left)
            setSideScreenRight(res.data[0].side_screen_right)

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
                    <Container fluid className="my-5 mx-5">
                        <Row style={{height:"40px"}}>
                            <Col>
                                    <Button style={{display: (isOrganizer) ? "block" : "none" }} onClick={changeIconNamesHandler} className="float-right" variant="outline-light">Change Icon Names</Button>
                            </Col> 
                            <Col >
                                <Button style={{display: (isOrganizer) ? "block" : "none" }} onClick={userManagementHandler} className="float-left" variant="outline-light">User Management</Button>
                            </Col>       
                        </Row>
                    </Container>
                    <Container fluid className="my-4">
                        <Row>
                            <Col xs={12} sm={3}>
                                <Button onClick={catwalkHandler} className="float-left product-screens-dark"  style={{ ...{display: eventOptions && eventOptions.video? "block": "none"} } } variant="secondary">{eventOptions && eventOptions.video?eventOptions.video:"" }
                                <br/>
                                <Image src={sideScreenLeft} style={styles.lcdScreen} className="float-left"></Image>
                                </Button>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Row className="no-gutters">
                                    <Col>
                                        <Image src={logoImg1} style={styles.adScreen}></Image>
                                    </Col>
                                    <Col>
                                        <Image src={logoImg2} style={styles.adScreen} ></Image>
                                    </Col>
                                    <Col>
                                        <Image src={logoImg3} style={styles.adScreen}></Image>
                                    </Col>
                                    <Col>
                                        <Image src={logoImg4} style={styles.adScreen} ></Image>
                                    </Col>
                                    <Col>
                                        <Image src={logoImg5} style={styles.adScreen}></Image>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} sm={3}>
                                <Button onClick={catwalkHandler} className="float-right product-screens-dark"  style={{...{display: eventOptions && eventOptions.video? "block": "none"} } } variant="secondary">{eventOptions && eventOptions.video?eventOptions.video:"" }
                                <br/>
                                <Image src={sideScreenRight} style={styles.lcdScreen} className="float-right"></Image>
                                </Button>
                            </Col>
                        </Row>
                        
                    </Container>
                    
                    <Container fluid className="mt-5">
                    <Row>
                        <Col>
                            <Button onClick={webinarHandler} className="float-left special-button" style={{display: eventOptions && eventOptions.links? "block": "none"}} variant="link">{eventOptions && eventOptions.links?eventOptions.links:"" }
                            <br/>
                            <Image src={gate1} ></Image>
                            </Button>                            
                        </Col>
                        <Col>
                            <center>
                            <Button onClick={helpDeskHandler} size="lg" style={{display: eventOptions && eventOptions.helpdesk? "block": "none"}} variant="link">
                                {/* {eventOptions && eventOptions.helpdesk?eventOptions.helpdesk:"" }  */}
                             {/* <br/>    */}
                            <Image src={reception} style={{width:"200px", height:"100px"}}></Image>
                            </Button>
                            </center>
                        </Col>
                        <Col>
                            <center>
                            <Button onClick={exhibitorsHandler} className="float-right special-button"  style={{display: eventOptions && eventOptions.stalls? "block": "none" }} variant="link">
                                {eventOptions && eventOptions.stalls?eventOptions.stalls:"" } 
                            <br/>
                            <Image src={gate2} ></Image>
                            </Button>
                            </center>
                        </Col>

                    </Row>
                    </Container>
                </div>   
                <Container style={{display: (isOrganizer) ? "block" : "none" }} >
                <Row className="w-100 justify-content-center">
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Logo1</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "logo1")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Logo2</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "logo2")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Logo3</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "logo3")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Logo4</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "logo4")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Logo5</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "logo5")}/>
                                </Form.File>
                            </div>
                        </Col>
                    </Row>

                    <Row  className="w-100">
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Left Side Screen</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "side_screen_left")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3 float-right">
                                <Form.File id="formcheck-api-regular" >
                                    <Form.File.Label className="float-left">Right Side Screen</Form.File.Label>
                                    <Form.File.Input onChange={e => pictureHandler(e, "side_screen_right")}/>
                                </Form.File>
                            </div>
                        </Col>
                    </Row>
                    </Container>
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
