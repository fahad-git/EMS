import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import "./../../assets/css/Stalls.css";
import { ToastContainer, toast } from 'react-toastify';


import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './../MyContext';
import{ StallImages, UpdateStallImages } from "./../API/userAPIs";
import{ RefreshToken } from "./../API/Auth";


import screen1 from "./../../assets/images/advertise1.png";
import screen2 from "./../../assets/images/advertise2.png";
import screen3 from "./../../assets/images/advertise3.png";
import screen4 from "./../../assets/images/advertise4.png";
import screen5 from "./../../assets/images/advertise5.png";
import logo from "./../../assets/images/shop-logo.PNG";

function StallHome(props){

    const history = useHistory()
    var IDs = {}
    var [leftUpCorner, setLeftUpCorner] = useState(screen1); 
    var [leftBottomCorner, setLeftBottomCorner] = useState(screen2);
    var [centerUp, setCenterUp] = useState(screen5);
    var [centerBottom, setCenterBottom] = useState(logo);
    var [rightUpCorner, setRightUpCorner] = useState(screen4);
    var [rightBottomCorner, setRightBottomCorner] = useState(screen3);


    const [content, setContent] = useState();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();


    const styles = {
        sideScreen:{
            width:"100px",
            height:"150px",
        },
        centerScreen:{
            width:"200px",
            height: "100px"
        }
    }

    useEffect(() => {

        var arr = history.location.pathname.split("/");
        var Ids = [];
        for(let i of arr)
            if(!Number.isNaN(parseInt(i))){
                Ids.push(parseInt(i));
            }

        if(Ids == []){
            history.goBack();
            return;
        }
        try{
            IDs["eventId"] = Ids[0];
            IDs["stallId"] = Ids[1];
        }catch(e){
            history.goBack();
            return;
        }


        StallImages(IDs.stallId)
        .then(res => {
            setLeftUpCorner(res.data[0].left_up_corner);
            setLeftBottomCorner(res.data[0].left_bottom_corner);
            setCenterBottom(res.data[0].center_bottom);
            setCenterUp(res.data[0].center_up);
            setRightUpCorner(res.data[0].right_up_corner);
            setRightBottomCorner(res.data[0].right_bottom_corner);
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

            var arr = history.location.pathname.split("/");
            var Ids = [];
            for(let i of arr)
                if(!Number.isNaN(parseInt(i))){
                    Ids.push(parseInt(i));
                }
    
            if(Ids == []){
                history.goBack();
                return;
            }
            try{
                IDs["eventId"] = Ids[0];
                IDs["stallId"] = Ids[1];
            }catch(e){
                history.goBack();
                return;
            }
            UpdateStallImages(IDs.stallId, img)
            .then(res => {
                console.log(res.data)
                switch(loc){
                    case "left_up_corner":
                        setLeftUpCorner(reader.result);
                        break;
                    case "center_up":
                        setCenterUp(reader.result);
                        break;
                    case "right_up_corner":
                        setRightUpCorner(reader.result);
                        break;
                    case "left_bottom_corner":
                        setLeftBottomCorner(reader.result);
                        break;
                    case "center_bottom":
                        setCenterBottom(reader.result);
                        break;
                    case "right_bottom_corner":
                        setRightBottomCorner(reader.result);
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
                }
            });
        }
    }

    return  <>
                <div className="stall">
                <Container>
                    <Row className="w-100">
                        <Col>
                            <Button className="my-2 product-screens"  ><Image style={styles.sideScreen}  src={leftUpCorner}></Image></Button>
                        </Col>
                        <Col>
                            <Button className="mb-2 ml-4 product-screens" > <Image style={styles.centerScreen}  src={centerUp} /> </Button>
                        </Col>
                        <Col>
                            <Button   className="product-screens"> <Image style={styles.sideScreen}  src={rightUpCorner} /></Button>
                        </Col>

                    </Row>
                    <Row className="w-100">
                        <Col>
                            <Button className="my-2 product-screens"  > <Image style={styles.sideScreen}  src={leftBottomCorner} /></Button>
                        </Col>
                        <Col>
                            <Button className="mt-4 ml-4 product-screens-dark"  ><Image style={styles.centerScreen}  src={centerBottom} />  </Button>
                        </Col>
                        <Col>
                            <Button  className="product-screens"><Image style={styles.sideScreen}  src={rightBottomCorner} /></Button>
                        </Col>

                    </Row>
                    {/* <div className="custom-file mb-3" >
                        <input type="file"  className="custom-file-input" id="customFile" onChange={pictureHandler} />
                        <label className="custom-file-label form-control" style={{width:"40%"}} htmlFor="customFile" >Upload</label>
                    </div> */}
                </Container>
                </div>

                
                <Row className="w-100 justify-content-center">
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                                <Form.File.Input onChange={e => pictureHandler(e, "left_up_corner")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                                <Form.File.Input onChange={e => pictureHandler(e, "center_up")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                                <Form.File.Input onChange={e => pictureHandler(e, "right_up_corner")}/>
                                </Form.File>
                            </div>
                        </Col>
                    </Row>

                    <Row  className="w-100">
                        <Col>
                            <div className="mb-3">
                                <center>
                                    <Form.File id="formcheck-api-regular" >
                                    {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                                    <Form.File.Input onChange={e => pictureHandler(e, "left_bottom_corner")}/>
                                    </Form.File>
                                </center>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                                <Form.File.Input onChange={e => pictureHandler(e, "center_bottom")}/>
                                </Form.File>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular" >
                                {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                                <Form.File.Input onChange={e => pictureHandler(e, "right_bottom_corner")}/>
                                </Form.File>
                            </div>
                        </Col>
                    </Row>
            </>
}
export default StallHome;