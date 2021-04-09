import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import {DatePickerInput } from 'rc-datepicker';
import { toast } from 'react-toastify';

// CSS import goes here
import 'rc-datepicker/lib/style.css';
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { useModalContext, useHeaderContext, useUserContext } from './MyContext';

import { RequestForEvent } from './API/userAPIs';
import { RefreshToken } from './API/Auth';

//custome Hooks
function CreateEvent(){

    const { register, errors, watch, handleSubmit, control } = useForm();
    
    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [disableFields, setDisableFields] = useState(false);

    const onSubmit = data => {
        RequestForEvent(data)
        .then(res => {
            console.log(data);
            setDisableFields(true);
            toast("Proposal submitted sucessfully", { type:"info", position: "top-center", });
            // toggleModelOpen(false);    
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
                    window.location.reload();
                    history.push("/");
                })
            }
        })
    }

    const styles = {
        err: {
            color:'red',
        }
    }

    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicEvent Name">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control disabled = {disableFields}  name="eventName" type="text" placeholder="Event Name" ref={register({required: true, minLength:3})} />
                                {errors.eventName?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                                {errors.eventName?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} controlId="formBasicEventType">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control disabled = {disableFields} name="type" type="text" placeholder="Event Category" ref={register({required: true, minLength:3})} />
                                {errors.type?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                                {errors.type?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventHost">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control disabled = {disableFields} name="eventHost" type="text" placeholder="Event Host" ref={register({required: true, minLength:3})} />
                                {errors.eventHost?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                                {errors.eventHost?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventStartDate">
                            <Col sm={{span:8, offset:2}}>
                            <Controller
                                    disabled = {disableFields}
                                    name="startDate"
                                    forwardRef = {{ required: true, minLength:3, pattern: /^[A-Z]+[A-Z0-9_]+[A-Z0-9]+$/i }}
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={({ name, onBlur, onChange, value, ref }) => (
                                        <DatePickerInput className="col-12 date-picker"
                                        disabled = {disableFields} 
                                        name={name}
                                        value={value}
                                        onBlur={onBlur}
                                        // onChange pass the raw value so you can access it using e instead of
                                        // e.target.value. props.onChange can accept the value directly
                                        onChange={onChange} 
                                        className='my-custom-datepicker-component'
                                        placeholder="Start Date" 
                                        ref = {ref}                                                    
                                        />
                                    )}
                                    
                                    />
                            {errors.startDate?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                            {errors.startDate?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} controlId="formBasicEventEndDate">
                            <Col sm={{span:8, offset:2}}>
                            <Controller
                                    disabled = {disableFields}
                                    name="endDate"
                                    forwardRef={register({required: true, minLength:3 })}
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={({ name, onBlur, onChange, value }) => (
                                        <DatePickerInput className="col-12 date-picker"
                                        disabled = {disableFields} 
                                        name={name}
                                        value={value}
                                        onBlur={onBlur}
                                        // onChange pass the raw value so you can access it using e instead of
                                        // e.target.value. props.onChange can accept the value directly
                                        onChange={onChange} 
                                        className='my-custom-datepicker-component'
                                        placeholder="End Date"                                                     
                                        />
                                    )}
                                    
                                    />
                            {errors.endDate?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                            {errors.endDate?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicEventDescription">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control disabled = {disableFields} as="textarea" rows={3} name="description" type="text" placeholder="Description" ref={register({required: true, minLength:3})} />
                                {errors.description?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                                {errors.description?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm={{span:8, offset:2}}>
                                <Button disabled = {disableFields} size="lg" variant="dark" type="submit" block>
                                    Submit Proposal
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default CreateEvent;