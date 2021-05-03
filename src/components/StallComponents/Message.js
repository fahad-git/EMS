import React from "react";
import { Container, Form, Row, Col, Button} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./../../assets/css/FormStyles.css";

function Message(props){

    const styles = {
        alignment:{
            textAlign: "left"
        }
    }

    const { register, errors, watch, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
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
                <Container className="my-5">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formBasicName">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.name?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.name?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label >Email:</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.email?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.email?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicSubject">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label >Subject:</Form.Label>
                                <Form.Control name="subject" type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.subject?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.subject?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventMessage">
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}} style={styles.alignment}>
                                <Form.Label>Message:</Form.Label>
                               <Form.Control as="textarea" rows={5} name="message" type="text" placeholder="Type here..." ref={register({required: true, minLength:3  })} />
                                {errors.message?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                {errors.message?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm={{span:6, offset:3}} xs={{span:12, offset:0}}>
                                <Button size="lg" variant="dark" type="submit" block>
                                   Send
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
}
export default Message;