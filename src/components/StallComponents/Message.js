import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Row, Col, Button} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./../../assets/css/FormStyles.css";

import { SendEmailToStallOwner } from "./../API/userAPIs";


import { useModalContext, useUserContext, useHeaderContext } from './../MyContext';
import { ExplicitlyAddStallInEvent, StallCategories } from './../API/userAPIs';
import { RefreshToken } from './../API/Auth';

function Message(props){

    const styles = {
        alignment:{
            textAlign: "left"
        }
    }

    const { register, errors, watch, handleSubmit, reset } = useForm();

    const [disableFields, setDisableFields] = useState(false);
    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();

    const onSubmit = data => {
        data["stall_Id"] = props.data.stall_Id;
        console.log(data);
        SendEmailToStallOwner(data)
        .then(res => {
            console.log(res)
            toast("Message sent sucessfully", {type: "info"})
            reset({ name: "", email: "", subject: "",  message:"" });
            setDisableFields(false);
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
            toast("Unexpected error. Please try again later", {type: "error", autoClose: 4000, onClose: () => setDisableFields(false)})
        }
    });
        toast("Please wait...", {type: "dark"})
        setDisableFields(true);
    }

    return  <>
                <Container className="my-5">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicName">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control disabled={disableFields} name="name" type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.name?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.name?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label >Email:</Form.Label>
                                <Form.Control disabled={disableFields} name="email" type="email" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.email?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.email?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicSubject">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label >Subject:</Form.Label>
                                <Form.Control disabled={disableFields} name="subject" type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.subject?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.subject?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventMessage">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label>Message:</Form.Label>
                               <Form.Control disabled={disableFields} as="textarea" rows={5} name="message" type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.message?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.message?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}}>
                                <Button disabled={disableFields} size="lg" variant="dark" type="submit" block>
                                   Send
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default Message;