import React from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";

// CSS import goes here
import './../assets/css/BaseComponents.css';

//custome Hooks
import { useUserContext, useModalContext, useHeaderContext } from './MyContext';

function Login(){

    const history = useHistory();
    const [user, setUser] = useUserContext();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();

    const { register, errors, watch, handleSubmit } = useForm();
    
    const onSubmit = data => {
        console.log(data);
        if(data.email === "jaimer" && data.password === "123"){
            setUser({
                "name":"Fahad",
                "islogin":"true"
            })
            toggleHeader(false);
            toggleModelOpen(false);
            history.push("/dashboard");
        }
    }

    const styles = [
        {
            width:"100%",
        }
    ]


    return  <div>
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group as={Row} controlId="formBasicEmail">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Col sm={{span:8, offset:2}}>
                                    <Form.Control name="email" type="text" placeholder="Username or Email" ref={register} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                {/* <Form.Label>Address</Form.Label> */}
                                <Col sm={{span:8, offset:2}}>
                                    <Form.Control name="password" type="password" placeholder="Password" ref={register}/>
                                    <i className="ion-eye-outline" id="togglePassword"></i>
                                    <Form.Label><a href="/forget-password">Forget Password?</a></Form.Label>
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