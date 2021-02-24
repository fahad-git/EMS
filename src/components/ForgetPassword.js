import React from 'react';
import {Container, Row, Button, Col} from 'react-bootstrap';

// CSS import goes here
import './../assets/css/BaseComponents.css';

function ForgetPassword(){
    return  <>
                <div className="services">
                    <Container>                        
                        <Row>
                            <Col sm={{span:6, offset:3}}>
                                <h1>Forget Password</h1>
                            </Col>
                        </Row>      
                    </Container>
                </div>
            </>
}
export default ForgetPassword;