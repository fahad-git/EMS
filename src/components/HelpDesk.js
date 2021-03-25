import React from 'react';
import FloatActionButton from './FloatActionButton';
import './../assets/css/MainLobby.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function HelpDesk(){

    return  <>
                <div className="help-desk">
                    <Container>
                        <Row>
                            <Col>
                                <h1>Help Desk</h1> 
                                <p>Write your queries below</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>                            
                                <Form.Group as={Row} controlId="formBasicEventDescription">
                                    {/* <Form.Label>Password</Form.Label> */}
                                    <Col sm={{span:8, offset:2}}>
                                        <Form.Control as="textarea" rows={3} name="description" type="text" placeholder="Description" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span:8, offset:2}}>
                                <Button className="float-right" variant="secondary">Send</Button>
                            </Col>
                        </Row>
                    </Container>
    
                </div>
                <FloatActionButton />
            </>
}
export default HelpDesk;