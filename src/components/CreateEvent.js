import React, { useState } from 'react';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {DatePickerInput } from 'rc-datepicker';
// CSS import goes here
import 'rc-datepicker/lib/style.css';
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { useModalContext } from './MyContext';

//custome Hooks
function CreateEvent(){

    var today = new Date();
    var date = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());

    var [selectedDate, setSelectedDate] = useState(date);

    const { register, errors, watch, handleSubmit } = useForm();
    
    const [modalOpen, toggleModelOpen] = useModalContext();

    const onSubmit = data => {
        console.log("Event Added");
        toggleModelOpen(false);
    }

    const styles = [
        {
            width:"100%",
        }
    ]

    const selectDateHandler = (date) => {
        console.log(date)
    }

    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicEvent Name">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="name" type="text" placeholder="Event Name" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventHost">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="eventHost" type="text" placeholder="Event Host" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventDate">
                            <Col sm={{span:8, offset:2}}>
                            <DatePickerInput className="col-12 date-picker"
                                             onChange={selectDateHandler}
                                             value={selectedDate}
                                             className='my-custom-datepicker-component'
                                             />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventDescription">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control as="textarea" rows={3} name="description" type="text" placeholder="Description" ref={register} />
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm={{span:8, offset:2}}>
                                <Button size="lg" variant="dark" type="submit" block>
                                    Create Event
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default CreateEvent;