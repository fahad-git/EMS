import React from "react";
import { Container, Form,Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";


function AddVideoForm() {

    const { register, errors, watch, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return  <>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId="formBasicTitle">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control name="title" type="text" placeholder="Video title" ref={register} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicDetails">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control name="details" type="text" placeholder="Add details here" ref={register} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicLink">
                        <Col sm={{span:8, offset:2}}>
                            <Form.Control name="link" type="text" placeholder="Paste link here" ref={register} required/>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col sm={{span:8, offset:2}}>
                            <Button size="lg" variant="secondary" type="submit" block>
                                ADD
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Container>

            </>
}
export default AddVideoForm;