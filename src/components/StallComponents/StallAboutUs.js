import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function StallAboutUs(props){

    const styles = {
        container:{
            minHeight:"100vh",
            width:"100vw"
        },
        text:{
            alignText:"center"
        }
    }


    return  <>
                <Container style={styles.container}>
                    <Row className="mt-5 mb-3">
                        <Col className="text-left ml-3">
                            <h1>About Us</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left ml-3">
                            {props.data.about_us}
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-3">
                        <Col className="text-left ml-3">
                            <h1>Description</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left ml-3">
                            {props.data.description}
                        </Col>
                    </Row>
                </Container>
            </>
}
export default StallAboutUs;