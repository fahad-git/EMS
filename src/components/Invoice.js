import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import {toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import {DatePickerInput } from 'rc-datepicker';

// CSS import goes here
import 'rc-datepicker/lib/style.css';
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs
import { EventDetailsByID, StallCategories, BuyEventTicket } from './API/userAPIs';
import { RefreshToken } from './API/Auth';


//custome Hooks
function Invoice(props){
    const ID = props.id;

    // var today = new Date();
    // var date = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());

    const { register, errors, watch, handleSubmit } = useForm();
    
    var [eventData, setEventData] = useState();
    var [lockFields, setLockFields] = useState(false);

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [requestFormDisplay, setRequestFormDisplay] = useState("none");

    var [categories, setCategories] = useState([]);

    const styles = {
        request:{
            display:requestFormDisplay
        },
        btn:{
            display: (requestFormDisplay === "none") ? "block" : "none",
            width:"100%"
        },
        err:{
            color: 'red'
        }
    }
    
    const onSubmit = () => {
        BuyEventTicket(ID)
        .then(res => {
            setLockFields(true);
            toast("Ticket buy request submitted successfully please wait for admin to approve", 
            { type:"info", onClose: () => window.location.reload() });
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

        // toggleModelOpen(false);
        // window.location.reload();
    }

    useEffect(() => {
        EventDetailsByID(ID)
        .then(res => {
            setEventData(res.data[0]);
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
        });
        StallCategories()
        .then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.log();
        })


    }, [])

    return  <>
                <Container>
                    <Form>
                        <Form.Group as={Row} controlId="formBasicEventName">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>Event Name:</Form.Label>
                                <Form.Control disabled={true} name="eventName" type="text" placeholder="Event Name" value = {eventData? eventData.event_name : ""}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventHost">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>Event Organizer:</Form.Label>
                                <Form.Control disabled={true} name="eventHost" type="text" placeholder="Event Host" value={eventData? eventData.host_name : ""} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventType">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>Event Type:</Form.Label>
                                <Form.Control disabled={true} name="eventType" type="text" placeholder="Event Type" value={eventData? eventData.type : ""} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventStartDate">
                            <Col sm={{span:8, offset:2}}>
                            <Form.Label>Event Start Date:</Form.Label>
                            <DatePickerInput 
                                disabled = {true}
                                className="col-12 date-picker"
                                className='my-custom-datepicker-component'
                                placeholder="Start Date"
                                value = {eventData? eventData.start_date : ""}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventEndDate">
                            <Col sm={{span:8, offset:2}}>
                            <Form.Label>Event End Date:</Form.Label>
                            <DatePickerInput 
                                disabled = {true}
                                className="col-12 date-picker"                                             
                                className='my-custom-datepicker-component'
                                placeholder="End Date"
                                value = {eventData? eventData.end_date : ""}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventDescription">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>Event Description:</Form.Label>
                                <Form.Control disabled={true} as="textarea" rows={3} name="description" type="text" placeholder="Description" value={eventData? eventData.description:"" } />
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm={{span:8, offset:2}}>
                                <Button size="lg" variant="dark" onClick={onSubmit} style={styles.btn} >
                                    Confirm
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default Invoice;