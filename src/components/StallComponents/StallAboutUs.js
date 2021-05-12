import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./../../assets/css/FormStyles.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { UpdateStallInfo, StallOwner } from "./../API/userAPIs";

import { useModalContext, useUserContext, useHeaderContext } from './../MyContext';
import { RefreshToken } from './../API/Auth';

function StallAboutUs(props){

    const styles = {
        container:{
            minHeight:"100vh",
            width:"100vw"
        },
        text:{
            alignText:"center"
        },
    }

    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();

    const [isStallOwner, setIsStallOwner] = useState(false);

    const { register, errors, watch, handleSubmit, reset } = useForm();
    const { register:register2, errors:errors2, handleSubmit:handleSubmit2 } = useForm();

    const UpdateInfo = (stallId, data) => {
        UpdateStallInfo(stallId, data)
        .then(res => {
            toast("Updated Successfully", {type: "info", onClose : () => window.location.reload()})
        }).catch(err => {
        if(err.message === "INVALID"){
            toast("Please login to access events", {
                type:"error",
                });
        }else if(err.message === "EXPIRED"){
            toast("You must login first", {
                type:"warning",
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
        }else{
            toast("Unexpected error. Please try again later", {type: "error", autoClose: 4000})
        }
    });
    }
    
    const updateAbout = data => {
        console.log(data)
        UpdateInfo(props.data.stall_Id, data)
    }

    const updateDescription = data => {
        console.log(data)
        UpdateInfo(props.data.stall_Id, data)
    }

    useEffect(() => {
        StallOwner(props.data.stall_Id)
        .then(res => {
            console.log(res.data);
            if(res.data.length)
                setIsStallOwner(true);
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
                        window.location.reload();
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
                <Container className="mt-5" style={{display: (isStallOwner) ? "block": "none"}}>
                    <Form onSubmit={handleSubmit(updateAbout)}>
                        <Form.Group as={Row} controlId="formBasicAboutUs">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">About Us:</Form.Label>
                                <Button variant="link" className="float-right" type="submit">Update</Button>
                                <Form.Control name="about_us" as="textarea" rows={4} type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.about_us?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.about_us?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit2(updateDescription)}>
                        <Form.Group as={Row} controlId="formBasicDescription">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">Description</Form.Label>
                                <Button variant="link" className="float-right" type="submit" >Update</Button>
                                <Form.Control name="description" as="textarea" rows={4} type="type" placeholder="Type here..." ref={register2({required: true, minLength:3  })} />
                                {errors2.description?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors2.description?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                    <hr className="divider"/>
                </Container>
                <Container style={styles.container}>
                    <Row className="mt-5 mb-3">
                        <Col className="text-left ml-3">
                            <h1>About Us</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left ml-3">
                            {props.data.about_us}
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-3">
                        <Col className="text-left ml-3">
                            <h1>Description</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left ml-3">
                            {props.data.description}
                        </Col>
                    </Row>
                </Container>
            </>
}
export default StallAboutUs;