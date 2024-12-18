import React, {useState} from "react";
import { useHistory} from 'react-router-dom';
import { Container, Form,Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import './../assets/css/FormStyles.css';
import { ToastContainer, toast } from 'react-toastify';
import { AddVideoInEvent } from './API/userAPIs';
import { RefreshToken } from './API/Auth';
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

function AddVideoForm() {

    const { register, errors, watch, handleSubmit } = useForm();

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

        data["event_Id"] = ID
        data["status"] = "Active";
        console.log(data);
        
        AddVideoInEvent(data)
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
                            <Form.Control disabled={disableFields} name="title" type="text" placeholder="Video title" ref={register({required: true, minLength:3})} />
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
export default AddVideoForm;