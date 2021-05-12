import React from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import "./../assets/css/FormStyles.css";
import { ToastContainer, toast } from "react-toastify"; 

import { useModalContext,  useHeaderContext, useUserContext } from './MyContext';
import { UpdateUserProfile } from "./API/userAPIs";
import { RefreshToken } from './API/Auth';

function Setting(){

    const styles = {
        container:{
            minHeight:"100vh",
            width:"100vw"
        },
        text:{
            alignText:"center"
        },
    }

    const history = useHistory()
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const { register, errors, watch, handleSubmit } = useForm();
    const { register:register2, errors:errors2, handleSubmit:handleSubmit2 } = useForm();
    const { register:register3, errors:errors3, handleSubmit:handleSubmit3 } = useForm();
    const { register:register4, errors:errors4, handleSubmit:handleSubmit4 } = useForm();
    const { register:register5, errors:errors5, handleSubmit:handleSubmit5 } = useForm();

    const onSubmit = data => {
        UpdateUserProfile(data)
        .then(res => {
            if(data.name)
                user["name"] = data.name;
            else if(data.email)
                user["email"] = data.email;
            else if(data.phone)
                user["phone"] = data.phone;
            else if(data.address)
                user["address"] = data.address;
            
            setUser(user)
            toast("Profile Updated", {type:"info", onClose: () => window.location.reload()})
        }).catch(err => {
        //    Error
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

        }});   
    }

    return  <>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                <Container>
                    <Row className="my-3">
                        <Col>
                            <h1>Profile</h1>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicName">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">Name:</Form.Label>
                                <Button variant="link" className="float-right" type="submit">Update</Button>
                                <Form.Control name="name" type="text" placeholder={user?.name} ref={register({required: true, minLength:3  })} />
                                {errors.name?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.name?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit2(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicUserName">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">Username:</Form.Label>
                                <Button variant="link" className="float-right" type="submit" disabled>Update</Button>
                                <Form.Control name="username" type="text" disabled={true} placeholder={user?.username} ref={register2({required: true, minLength:3  })} />
                                {errors2.username?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors2.username?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit3(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">Email:</Form.Label>
                                <Button variant="link" className="float-right" type="submit">Update</Button>
                                <Form.Control name="email" type="email" placeholder={user?.email} ref={register3({required: true, minLength:3  })} />
                                {errors3.email?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors3.email?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit4(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicName">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">Phone:</Form.Label>
                                <Button variant="link" className="float-right" type="submit">Update</Button>
                                <Form.Control name="phone" type="text" placeholder={user?.phone} ref={register4({required: true, minLength:3  })} />
                                {errors4.phone?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors4.phone?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit5(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicAddress">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label className="float-left">Address:</Form.Label>
                                <Button variant="link" className="float-right" type="email" >Update</Button>
                                <Form.Control name="address" as="textarea" rows={4} type="text" placeholder={user?.address} ref={register5({required: true, minLength:3  })} />
                                {errors5.address?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors5.address?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </>
}
export default Setting;