import React from 'react';
import {Form, Container, Row, Button, Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";

function Setting(){

    const { register, errors, watch, handleSubmit } = useForm();

    const onSubmit = () => {
        console.log("Updated")
    }

    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm={{span:6, offset:3}}>
                                <h1>Settings</h1>
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
                                <Form.Control name="firstName" type="text" placeholder="James" ref={register} required/>
                                {/* <Form.Text className="text-muted">
                                    {errors.firstName && "Your input is required"}
                                </Form.Text> */}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicLastName">
                            <Col sm={{span:6, offset:3}}>
                            {/* <Form.Label block>Password</Form.Label> */}
                                <Form.Control name="lastName" type="text" placeholder="Martin" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEmail">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:6, offset:3}}>
                                <Form.Control name="email" type="email" placeholder="james@abc.com" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPhone">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:6, offset:3}}>
                                <Form.Control name="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="071-56-223" ref={register}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicAddress1">
                            {/* <Form.Label>Address</Form.Label> */}
                            <Col sm={{span:6, offset:3}}>
                                <Form.Control name="address" type="text" placeholder="abc street UK" ref={register}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicRole">
                            {/* <Form.Label>Address</Form.Label> */}
                            <Col sm={{span:6, offset:3}}>
                                <Form.Control name="role" type="text" placeholder="Admin" ref={register}/>
                            </Col>
                        </Form.Group>

                            <Form.Group as={Row} controlId="formBasicRole">
                                <Col sm={{span:6, offset:3}}>
                                    <Button size="lg" variant="dark" type="submit" block>
                                        Update
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                </Container>
            </>
}
export default Setting;