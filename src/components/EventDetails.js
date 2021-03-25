import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import {DatePickerInput } from 'rc-datepicker';

// CSS import goes here
import 'rc-datepicker/lib/style.css';
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs
import { EventDetailsByID } from './API/userAPIs';
import { RefreshToken } from './API/Auth';

//custome Hooks
function EventDetails(props){

    const ID = props.id;

    var today = new Date();
    var date = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());

    var [selectedStartDate, setSelectedStartDate] = useState(date);
    var [selectedEndDate, setSelectedEndDate] = useState(date);

    const { register, errors, watch, handleSubmit } = useForm();
    
    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [name, setName] = useState("");
    const [requestFormDisplay, setRequestFormDisplay] = useState("none");
    const styles = {
        request:{
            display:requestFormDisplay
        },
        btn:{
            display: (requestFormDisplay === "none") ? "block" : "none",
            width:"100%"
        }
    }
    
    const onSubmit = data => {
        console.log("Event Added");
        toggleModelOpen(false);
    }

    const selectStartDateHandler = (date) => {
        console.log(date)
        setSelectedStartDate(date);
    }

    const selectEndDateHandler = (date) => {
        console.log(date)
        setSelectedEndDate(date);
    }

    useEffect(() => {
        EventDetailsByID(ID)
        .then(res => {
            setName(res.data.name);
        }).catch(err => {
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
                    toggleModelOpen(false);
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
                    toggleModelOpen(false);
                    window.location.reload();
                    history.push("/");
                })
            }
        })
    }, [])

    return  <>
            <ToastContainer 
                position="top-left"
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
                    <Form>
                        <Form.Group as={Row} controlId="formBasicEvent Name">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control disabled={true} name="name" type="text" placeholder="Event Name" value = {name} ref={register} />
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

                        <Row>
                            <Col sm={{span:8, offset:2}}>
                                <Button size="lg" variant="dark" onClick={() => setRequestFormDisplay("block")} style={styles.btn} >
                                    Request for Stall
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>

                <Container style={styles.request}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicEvent Name">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control disabled={true} name="name" type="text" placeholder="Event Name" value = {name} ref={register} />
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
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>

            </>
}
export default EventDetails;