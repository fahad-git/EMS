import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { useForm } from "react-hook-form";
// CSS import goes here
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { ToastContainer, toast } from 'react-toastify';

import { useModalContext, useUserContext, useHeaderContext } from './MyContext';
import { ExplicitlyAddStallInEvent, StallCategories } from './API/userAPIs';
import { RefreshToken } from './API/Auth';

import { CheckUserAvailable } from './API/userAPIs';


function AddStall(){

    const { register, errors, watch, handleSubmit, setError, clearErrors, getValues } = useForm();
    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();

    var [categories, setCategories] = useState([]);
    var [name, setName] = useState('');

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

        data['event_Id'] = ID;
        data['status'] = "Active";
        let ownerID = parseInt(data["ownerID"]) 
        delete data["ownerID"]

        let insertedObj = {
            role: {
                event_Id:ID,
                role_Id:6,
                user_Id:  ownerID
            },
            stall: data
        }
        
        console.log(insertedObj);

        ExplicitlyAddStallInEvent(insertedObj)
        .then(res => {
            toast("Stall added successfully", {
                type:"info",
                onClose: () => toggleModelOpen(false)
                });
        }).catch(err => {
            console.log(err)
            if(err.message === "INVALID"){
                toast("Please login to access events", {
                    type:"error",
                    });
            }else if(err.message === "EXPIRED"){
                toast("You must login first", {
                    type:"warning",
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

    const styles = {
        name:{
            color:"green"
        }
    }

    const validateUserHandler = () => {
        const singleValue = parseInt(getValues("ownerID"));
        if(!singleValue){
            setError("ownerID", {
                type: "available",
                message: "No user exist with this ID"
            });
            return;
        }

        CheckUserAvailable(singleValue)
        .then(res => {
            clearErrors(['ownerID']);
            console.log(res.data)
            setName("User: " + res.data[0].name)
        }).catch(err => {
            setName("")
            setError("ownerID", {
                type: "available",
                message: "No user exist with this ID"
              });
              clearErrors('sucess');
        })
    }

    useEffect(() => {
        StallCategories()
        .then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.log();
        })
    }, [])

    return  <>
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    />

                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicStallName">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="name" type="text" placeholder="Stall Name" ref={register({required: true, minLength:3  })} />
                                {errors.name?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.name?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicOwnerName">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="owner_name" type="text" placeholder="Owner Name" ref={register({required: true, minLength:3  })} />
                                {errors.owner_name?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.owner_name?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicOwnerID">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="ownerID" type="text" onBlur={validateUserHandler} placeholder="Owner ID" ref={register({required: true})} />
                                {errors.ownerID?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.ownerID?.type === "available" && <div className="err">{errors.ownerID.message} </div> }
                                {!errors.ownerID && <div style={styles.name}>{name} </div> }
                            </Col>
                        </Form.Group>

                        {/* category */}
                        <Form.Group as={Row} controlId="formBasicCategory">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                            <Form.Control as="select" name="category" ref={register({required: true, minLength:3  })} custom>
                                <option value="">Category</option>
                                {
                                    categories.map(({cat_id, type, name}, index) => (
                                        <option key = {index} >{name}</option>
                                    ))
                                }
                            </Form.Control>
                            {errors.category?.type === "required" && <div className="err">{"Please select any option."} </div> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicSlogan">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control name="slogan" type="text" placeholder="Slogan" ref={register({required: true, minLength:3  })} />
                                {errors.slogan?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.slogan?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        {/* Logo Image */}

                        <Form.Group as={Row} controlId="formBasicEventDescription">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control as="textarea" rows={5} name="description" type="text" placeholder="Description" ref={register({required: true, minLength:3  })} />
                                {errors.description?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.description?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicAboutUs">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:8, offset:2}}>
                                <Form.Control as="textarea" rows={3} name="about_us" type="text" placeholder="About US" ref={register({required: true, minLength:3  })} />
                                {errors.about_us?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.about_us?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
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