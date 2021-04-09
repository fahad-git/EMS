import React, {useState} from "react";
import { useHistory} from 'react-router-dom';
import { Container, Form,Row, Col, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

import 'rc-datepicker/lib/style.css';
import './../assets/css/FormStyles.css';
import { ToastContainer, toast } from 'react-toastify';
import {DatePickerInput } from 'rc-datepicker';
import {DatetimePicker} from 'rc-datetime-picker';
import { AddWebinarInEvent } from './API/userAPIs';
import { RefreshToken } from './API/Auth';
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

function AddWebinarForm() {

    const { register, errors, watch, handleSubmit, control } = useForm();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [disableFields, toggleDisableFields] = useState(false);

    const history = useHistory();

    const onSubmit = data => {

        var arr = history.location.pathname.split("/");
        console.log(arr)
    
        var ID = -1;
        for(let i of arr)
            if(!Number.isNaN(parseInt(i))){
                ID = parseInt(i);
                break;
            }
            
        if(ID === -1){
            history.goBack();
            return;
        }

        data["event_Id"] = ID;
        data["status"] = "Active";
        AddWebinarInEvent(data)
        .then(res => {
            console.log(res.data);
            toast("Added Successfully", {
                type:"info",
                });
            toggleDisableFields(true);
            window.location.reload();
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
        });


    }
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId="formBasicTitle">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control disabled={disableFields} name="title" type="text" placeholder="Webinar title" ref={register({required: true, minLength:3})} />
                            {errors.title?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            {errors.title?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicType">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control disabled={disableFields} name="type" type="text" placeholder="Category" ref={register({required: true, minLength:3  })}/>
                            {errors.type?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            {errors.type?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicWebinarDate">
                        <Col sm={{span:8, offset:2}}>
                            <Controller
                            name="date"
                            forwardRef={register({required: true, minLength:3 })}
                            rules={{ required: true }}
                            control={control}
                            defaultValue=""

                            render={({ name, onBlur, onChange, value }) => (
                            <DatetimePicker 
                                disabled={disableFields}
                                name={name}
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                className="col-12 date-picker"
                                className='my-custom-datepicker-component'
                                placeholder="Start Date"
                                />
                            )}
                            
                            />
                            {errors.date?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            {errors.date?.type === "minLength" && <div className="err">{"Write you number in complete format"} </div> }                             
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicDuration">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control disabled={disableFields} name="duration" type="text" placeholder="Duration" ref={register({required: true, minLength:3  })}/>
                            {errors.duration?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            {errors.duration?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                        </Col>
                    </Form.Group>

                    
                    <Form.Group as={Row} controlId="formBasicPlatform">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control disabled={disableFields} name="platform" type="text" placeholder="Platform" ref={register({required: true, minLength:3  })}/>
                            {errors.platform?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            {errors.platform?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} controlId="formBasicLink">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control disabled={disableFields} name="link" type="text" placeholder="Paste link here" ref={register({required: true, minLength:3  })}/>
                            {errors.link?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            {errors.link?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                                                     
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicDescription">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control disabled={disableFields} name="description" as="textarea" rows={5} type="text" placeholder="Add video description" ref={register}/>
                        </Col>
                    </Form.Group>

                    <Row>
                        <Col sm={{span:8, offset:2}}>
                            <Button disabled={disableFields} size="lg" variant="secondary" type="submit" block>
                                ADD
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Container>

            </>
}
export default AddWebinarForm;