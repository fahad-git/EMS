import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import {DatePickerInput } from 'rc-datepicker';
import { toast } from 'react-toastify';

// CSS import goes here
import 'rc-datetime-picker/dist/picker.css';
import 'rc-datetime-picker/dist/picker.min.css';
import './../assets/css/CustomDatetime.css';

import 'rc-datepicker/lib/style.css';
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';


import {DatetimePickerTrigger} from 'rc-datetime-picker';
import moment from 'moment';

import { useModalContext, useHeaderContext, useUserContext } from './MyContext';

import { RequestForEvent, EventCategories } from './API/userAPIs';
import { RefreshToken } from './API/Auth';

//custome Hooks
function CreateEvent(){

    const { register, errors, watch, handleSubmit, control } = useForm();
    
    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();
    var [categories, setCategories] = useState([]);
    const [disableFields, setDisableFields] = useState(false);

    var [moments, setMoment] = useState(moment());
    var [moments2, setMoment2] = useState(moment());
    const shortcuts = {
        'Today': moment(),
        'Yesterday': moment().subtract(1, 'days'),
      };

    const handleChange = (moment) => {
    setMoment(moment);
    }

    const handleChange2 = (moment) => {
        setMoment2(moment);
    }

    const onSubmit = data => {
        data["status"] = "Pending";
        data["rating"] = "5 / 5";
        setDisableFields(true);
        RequestForEvent(data)
        .then(res => {
            toast("Proposal submitted sucessfully", { type:"info", position: "top-center", onClose: () => window.location.reload()});
        }).catch(err => {
            // console.log(err)
            setDisableFields(false);
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
        toast("Please wait...", { type:"dark", position: "top-center"});
    }

    const styles = {
        err: {
            color:'red',
        }
    }

    useEffect(() => {
        EventCategories()
        .then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.log();
        })
    }, [])

    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicEventName">
                            <Col sm={{span:8, offset:2}}>
                            <Form.Label>Event Name:</Form.Label>
                            <Form.Control disabled = {disableFields}  name="event_name" type="text" placeholder="Type here..." ref={register({required: true, minLength:3})} />
                                {errors.event_name?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                                {errors.event_name?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>
                    
                    
                        <Form.Group as={Row} controlId="formBasicEventStartDate">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Label>Start Date:</Form.Label>
                            <DatetimePickerTrigger
                                shortcuts={shortcuts} 
                                moment={moments}
                                onChange={handleChange}>
                                <Form.Control disabled={disableFields} className="col-9 col-sm-10 float-left" name="start_date" type="text" value={moments?.format('YYYY-MM-DD HH:mm:ss')} placeholder="Date and time" ref={register({required: true, minLength:3})} readOnly />
                                <Button variant="outline-secondary" className="col-3 col-sm-2 form-control">
                                    <i class="large material-icons">date_range</i>
                                </Button>                                
                                {errors.start_date?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.start_date?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                            </DatetimePickerTrigger>
                        </Col>
                        </Form.Group>

                        
                        <Form.Group as={Row} controlId="formBasicEventEndDate">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Label>End Date:</Form.Label>
                            <DatetimePickerTrigger
                                shortcuts={shortcuts} 
                                moment={moments2}
                                onChange={handleChange2}>
                                <Form.Control disabled={disableFields} className="col-9 col-sm-10 float-left" name="end_date" type="text" value={moments2?.format('YYYY-MM-DD HH:mm:ss')} placeholder="Date and time" ref={register({required: true, minLength:3})} readOnly />
                                <Button variant="outline-secondary" className="col-3 col-sm-2 form-control">
                                    <i class="large material-icons">date_range</i>
                                </Button>                                
                                {errors.end_date?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.end_date?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                            </DatetimePickerTrigger>
                        </Col>
                        </Form.Group>

                        {/* category */}
                        <Form.Group as={Row} controlId="formBasicEventType">
                            <Col sm={{span:8, offset:2}}>
                            <Form.Label>Category:</Form.Label>
                            <Form.Control disabled = {disableFields} as="select" name="type" ref={register({required: true, minLength:3  })} custom>
                                <option value="">Select</option>
                                {
                                    categories.map(({cat_id, type, name}, index) => (
                                        <option key = {index} >{name}</option>
                                    ))
                                }
                            </Form.Control>
                            {errors.type?.type === "required" && <div className="err">{"Please select any option."} </div> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventHost">                        
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>Event Host:</Form.Label>
                                <Form.Control disabled = {disableFields} name="host_name" type="text" placeholder="Type here..." ref={register({required: true, minLength:3})} />
                                {errors.host_name?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                                {errors.host_name?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group>
{/* 
                        <Form.Group as={Row} controlId="formBasicEventStartDate">
                            <Col sm={{span:8, offset:2}}>
                            <Controller
                                    disabled = {disableFields}
                                    name="start_date"
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
                            {errors.start_date?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                            {errors.start_date?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  
                            </Col>
                        </Form.Group> */}

{/* 
                        <Form.Group as={Row} controlId="formBasicEventEndDate">
                            <Col sm={{span:8, offset:2}}>
                            <Controller
                                    disabled = {disableFields}
                                    name="end_date"
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
                            {errors.end_date?.type === "required" && <div style={ styles.err }>{"� This field is mandatory."} </div> }
                            {errors.end_date?.type === "minLength" && <div style={styles.err}>{"� Your input is less than minimum length"} </div> }  

                            </Col>
                        </Form.Group>
                         */}
                        <Form.Group as={Row} controlId="formBasicEventDescription">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>Description: </Form.Label>
                                <Form.Control disabled = {disableFields} as="textarea" rows={3} name="description" type="text" placeholder="Type here..." ref={register({required: true, minLength:3})} />
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