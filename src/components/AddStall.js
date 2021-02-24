import React from 'react';

import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useForm } from "react-hook-form";
// CSS import goes here
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { useModalContext } from './MyContext';


function AddStall(){

    const { register, errors, watch, handleSubmit } = useForm();
    
    const [modalOpen, toggleModelOpen] = useModalContext();

    const onSubmit = data => {
        console.log("Stall Added");
        toggleModelOpen(false);
    }

    const styles = [
        {
            width:"100%",
        }
    ]

    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicStallName">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="name" type="text" placeholder="Stall Name" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicOwnerID">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="ownerID" type="text" placeholder="Owner ID" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicAboutUs">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="aboutus" type="text" placeholder="About US" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventDescription">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control as="textarea" rows={5} name="description" type="text" placeholder="Description" ref={register} />
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm={{span:8, offset:2}}>
                                <Button size="lg" variant="dark" type="submit" block>
                                    Add Stall
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default AddStall;