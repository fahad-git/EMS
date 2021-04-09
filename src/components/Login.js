import React, { useState } from 'react';
// import passwordHash from 'password-hash';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";

import { Authenticate } from './API/Auth';
import bcrypt from 'bcryptjs';

// CSS import goes here
import './../assets/css/BaseComponents.css';

//custome Hooks
import { useUserContext, useModalContext, useHeaderContext } from './MyContext';

function Login(){

    const history = useHistory();
    const [user, setUser] = useUserContext();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [error, setError] = useState({
        display:"none",
        msg:""
    })

    const { register, errors, watch, handleSubmit } = useForm();    

    const onSubmit = data => {
        let buff = new Buffer(data.password);
        data.password = buff.toString('base64');         
        Authenticate(data)
        .then((res) => {
            if(res.data.success)
            {
            const usr = res.data.user;
            console.log(usr)
            var d = new Date();
            d.setSeconds(d.getSeconds() + usr.tokenExpiry);
            usr.tokenExpiry = d;
            usr.isLogin = false;
            setUser(usr);
            toggleHeader(false);
            toggleModelOpen(false);
            if(usr.role === "Admin")
                history.push("/dashboard");
            else
                history.push("/user-dashboard");

            }else{
                setError({
                    display:"block",
                    msg:res.data.message
                })
            }
        }).catch((err) => {
            // console.log(err.response.data);
            setError({
                display:"block",
                msg:err.response.data.message
            })
        })

    }

    const styles = {
        errors: {
            color:"red",
            display: error.display
        }
    }


    return  <div>
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group as={Row} controlId="formBasicUsername">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Col sm={{span:8, offset:2}}>
                                    <Form.Control onFocus={()=> setError({display:"none",msg:null})} name="username" type="text" placeholder="Username or Email" ref={register} required/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                {/* <Form.Label>Address</Form.Label> */}
                                <Col sm={{span:8, offset:2}}>
                                    <Form.Control onFocus={()=> setError({display:"none",msg:null})} name="password" type="password" placeholder="Password" ref={register} required/>
                                    <i className="ion-eye-outline" id="togglePassword"></i>
                                    <Form.Label><a href="/forget-password">Forget Password?</a></Form.Label>
                                </Col>
       
                                <Col style={styles.errors} sm={{span:8, offset:2}}>
                                        {error.msg /* Invalid username or password! */}
                                </Col>
        
                            </Form.Group>
                            
                                <Row>
                                    <Col sm={{span:8, offset:2}}>
                                        <Button size="lg" variant="dark" type="submit" block>
                                            Login
                                        </Button>
                                        <Form.Label style={styles[0]}>
                                            <center>
                                                Don't have account? <a href="/register">Register Now</a>
                                            </center>        
                                        </Form.Label>
                                    </Col>
                                </Row>
                            </Form>
                    </Container>
            </div>
}
export default Login;