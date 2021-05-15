import React, {useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, Modal} from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Terms from './BasicStructure/Terms';

// CSS import goes here
import './../assets/css/BaseComponents.css';
import './../assets/css/FormStyles.css';
import 'react-toastify/dist/ReactToastify.css';


import { CheckUsernameAvailability, RegisterUser } from './API/Auth';

function Register(){

    const history =  useHistory();
    const { register, errors, watch, handleSubmit, control, setError } = useForm();
    const watchAllFields = watch();
    const [regModalOpen, toggleRegModelOpen] = useState(false);
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async data => {
        // console.log(data)    ;
        data["name"] = data.firstName + " " + data.lastName;
        data["userType"] = "User";
        delete data["firstName"];
        delete data["lastName"];
        delete data["check"];
        delete data["confirmPassword"];

        var salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        // console.log(data);
        RegisterUser(data)
        .then(res => {
            toast("Register Successfully", {
                type:"info",
                onClose: () => history.push("/home")
                });            
        }).catch(err => {
            toast("Registration failed", {
                type:"info",
                });
        })
    }

    const termsHandler = () => {  
        toggleRegModelOpen(true);
      }
    

    return  <div>
                <ToastContainer 
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                <Modal show={regModalOpen}
                    onHide = {()=> { toggleRegModelOpen(false)}}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2><center>Terms and Conditions</center></h2>                                              
                    </Modal.Header>

                    <Modal.Body >
                        <Terms/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> { toggleRegModelOpen(false)}}>Close</Button>
                    </Modal.Footer>
                </Modal>    

                <div className="services pb-5">
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col sm={{span:6, offset:3}}>
                                   <h1>Register</h1>
                                </Col>
                            </Row>
                        
                            <Row>
                                <Col sm={{span:6, offset:3}}>
                                    <hr className="divider"/>
                                </Col>
                            </Row>
                        
                            <Form.Group as={Row} controlId="formBasicFirstName">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="firstName" type="text" placeholder="First Name" ref={register({required: true, minLength:3  })} />
                                        {errors.firstName?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                        {errors.firstName?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicLastName">
                                <Col sm={{span:6, offset:3}}>
                                {/* <Form.Label block>Password</Form.Label> */}
                                    <Form.Control name="lastName" type="text" placeholder="Last Name" ref={register({required: true, minLength:3  })} />
                                        {errors.lastName?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                        {errors.lastName?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicEmail">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="email" type="email" placeholder="Email" ref={register({required: true, minLength:7  })} />
                                        {errors.email?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                        {errors.email?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                                </Col>
                            </Form.Group>

                            

                            {/* To create this field workable basically I have called a Controller component
                            *   Controller component is responsible to integrate third party Libraries/APIs 
                            *   with the useForm hook.
                            */}
                            {/* <Form.Control name="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone ex. 071-56-223" ref={register}/> */}
                            <Form.Group as={Row} controlId="formBasicPhone">
                                <Col sm={{span:6, offset:3}}>
                                    <Controller
                                    name="phone"
                                    forwardRef={register({required: true, minLength:3 })}
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={({ name, onBlur, onChange, value }) => (
                                        <PhoneInput
                                        className="w-100"
                                        country = {'us'}
                                        name={name}
                                        value={value}
                                        onBlur={onBlur}
                                        // onChange pass the raw value so you can access it using e instead of
                                        // e.target.value. props.onChange can accept the value directly
                                        onChange={onChange}                                
                                        />
                                    )}
                                    
                                    />
                                    {errors.phone?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                    {errors.phone?.type === "minLength" && <div className="error">{"Write you number in complete format"} </div> }                             
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicAddress1">
                                {/* <Form.Label>Address</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="address" type="text" placeholder="Address" ref={register({required: true, minLength:7  })}  />
                                        {errors.address?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                        {errors.address?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                                </Col>
                            </Form.Group>
                                    
                            <Form.Group as={Row} controlId="formBasicUsername">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="username" type="text" placeholder="Username" ref={register({required: true, 
                                                                                                                    minLength:3,
                                                                                                                    pattern: /^[A-Z]+[A-Z0-9_]+[A-Z0-9]+$/i,
                                                                                                                    validate: value => {
                                                                                                                         CheckUsernameAvailability(value)
                                                                                                                        .then(res => {
                                                                                                                            if(!res.data.success)
                                                                                                                                setError("username", {
                                                                                                                                type: "validate",
                                                                                                                                message: ""
                                                                                                                              });
                                                                                                                            return res.data.success;
                                                                                                                        }).catch(err => {
                                                                                                                            setError("username", {
                                                                                                                                type: "validate",
                                                                                                                                message: ""
                                                                                                                              });
                                                                                                                            return false;
                                                                                                                        })
                                                                                                                        
                                                                                                                    }
                                                                                                                    })} />    
                                        {errors.username?.type === "validate" && <div className="error">{"Username is not available try another username"} </div> }
                                        {errors.username?.type === "pattern" && <div className="error">{"Username must not start with number and should not contain special characters like '-, ., ]' only '_' is allowed"} </div> }
                                        {errors.username?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                        {errors.username?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                {/* <Form.Label>Address</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="password" type="password" placeholder="Password" ref={register({required: true, minLength:8  })} />
                                        {errors.password?.type === "required" && <div className="error">{"You must specify a password"} </div> }
                                        {errors.password?.type === "minLength" && <div className="error">{"Password must have at least 8 characters"} </div> }                             
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicConfirmPassword">
                                {/* <Form.Label>Address</Form.Label> */}
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({
                                                                                                validate: value =>
                                                                                                    value === password.current
                                                                                                })}/>
                                    {errors.confirmPassword?.type === "validate" && !errors.confirmPassword.validate && <div className="error">{"The passwords do not match"} </div> }
                                </Col>
                            </Form.Group>
                           
                            <Form.Group controlId="formBasicCheckbox">
                                <Col sm={{span:6, offset:3}}>
                                    <Form.Check type="checkbox" name="check" label="By clicking this, you agree to our Terms, 
                                    Data Policy and Cookie Policy." ref={register({ required: true})} />
                                    <Button variant="link" onClick={termsHandler}>Learn more</Button>
                                    {errors.check?.type === "required" && <div className="error">{"You must agreee to the terms and conditions"} </div> }
                                </Col>
                            </Form.Group>
                                <Row>
                                    <Col sm={{span:6, offset:3}}>
                                        <Button size="lg" variant="dark" type="submit" block>
                                            Register
                                        </Button>
                                    </Col>
                                </Row>
                           </Form>
                    </Container>
                </div>
            </div>
}
export default Register;

    {/* <Form.Group as={Row} controlId="formBasicAccountType">
            <Form.Label>Address 2</Form.Label>
        <Col sm={{span:6, offset:3}}>
            <Form.Control name="role" as="select" defaultValue="Account Type" ref={register}>
                <option>Account Type</option>
                <option>Admin</option>
                <option>Exhibitor</option>
            </Form.Control>
        </Col>
    </Form.Group> */}