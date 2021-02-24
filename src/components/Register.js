import React from 'react';
import {Form, Container, Row, Button, Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";

// CSS import goes here
import './../assets/css/BaseComponents.css';

function Register(){

    const { register, errors, watch, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);


    return  <div>
                <div className="services">
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col sm={{span:6, offset:3}}>
                                   <h1>Register</h1>
                                </Col>
                            </Row>
                        
                            <Row>
                                <Col sm={{span:6, offset:3}}>
                                    <hr className="divider"/>
                                </Col>
                            </Row>
                        
                            <Form.Group as={Row} controlId="formBasicFirstName">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="firstName" type="text" placeholder="First Name" ref={register} required/>
                                    {/* <Form.Text className="text-muted">
                                        {errors.firstName && "Your input is required"}
                                    </Form.Text> */}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicLastName">
                                <Col sm={{span:6, offset:3}}>
                                {/* <Form.Label block>Password</Form.Label> */}
                                    <Form.Control name="lastName" type="text" placeholder="Last Name" ref={register} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicEmail">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="email" type="email" placeholder="Email" ref={register} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPhone">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone ex. 071-56-223" ref={register}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicAddress1">
                                {/* <Form.Label>Address</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="address" type="text" placeholder="Address" ref={register}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicAccountType">
                                {/* <Form.Label>Address 2</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="role" as="select" defaultValue="Account Type" ref={register}>
                                        <option>Account Type</option>
                                        <option>Admin</option>
                                        <option>Exhibitor</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                           
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Terms and Conditions" />
                            </Form.Group>
                                <Row>
                                    <Col sm={{span:6, offset:3}}>
                                        <Button size="lg" variant="dark" type="submit" block>
                                            Register
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                    </Container>
                </div>
            </div>
}
export default Register;