import React, {useState} from 'react';
import {Form, Container, Row, Button, Col, Dropdown, ButtonGroup, SplitButton } from 'react-bootstrap';
import { useForm } from "react-hook-form";

// CSS import goes here
import './../assets/css/BaseComponents.css';

import { useModalContext } from './MyContext';

import { useHistory } from 'react-router-dom';

//custome Hooks
function AddUser(){

    const history = useHistory();

    const { register, errors, watch, handleSubmit } = useForm();
    
    const [modalOpen, toggleModelOpen] = useModalContext();

    const onSubmit = data => {
        console.log(data)
        toggleModelOpen(false);
        console.log("User Added");
    }

    const styles = {
        dropdown: {
            width:"100%",
        }
    }


    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicName">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="name" type="text" placeholder="Name" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEmail">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="email" type="text" placeholder="Email" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPhone">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="Phone" type="text" placeholder="Phone" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicUserRole">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control as="select" custom>
                                    <option>User type</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                                {/* <SplitButton 
                                    as={ButtonGroup} 
                                    style={styles.dropdown} 
                                    variant="secondary" 
                                    id="dropdown-basic-button" 
                                    title="User Types"
                                    menuAlign={{ lg: 'left' }}
                                    drop="down"
                                    >
                                    <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">SubAdmin</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Event Planner</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Event Host</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Visitor</Dropdown.Item>
                                </SplitButton> */}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicUsername">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="username" type="text" placeholder="Username" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPassword">
                            {/* <Form.Label>Address</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="password" type="password" placeholder="Password" ref={register}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicSubmitButton">
                            <Col sm={{span:8, offset:2}}>
                                <Button size="lg" variant="dark" type="submit" block>
                                    ADD
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </>
}
export default AddUser;