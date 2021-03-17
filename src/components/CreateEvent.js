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

    var [selectedStartDate, setSelectedStartDate] = useState(date);
    var [selectedEndDate, setSelectedEndDate] = useState(date);

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

    const selectStartDateHandler = (date) => {
        console.log(date)
        setSelectedStartDate(date);
    }

    const selectEndDateHandler = (date) => {
        console.log(date)
        setSelectedEndDate(date);
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

                        <Form.Group as={Row} controlId="formBasicEventStartDate">
                            <Col sm={{span:8, offset:2}}>
                            <DatePickerInput className="col-12 date-picker"
                                             onChange={selectStartDateHandler}
                                             className='my-custom-datepicker-component'
                                             placeholder="Start Date"
                                             />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} controlId="formBasicEventEndDate">
                            <Col sm={{span:8, offset:2}}>
                            <DatePickerInput className="col-12 date-picker"
                                             onChange={selectEndDateHandler}
                                             className='my-custom-datepicker-component'
                                             placeholder="End Date"
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
                                    Submit Proposal
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default CreateEvent;