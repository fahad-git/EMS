import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import "./../../assets/css/Stalls.css";

import screen1 from "./../../assets/images/advertise1.png";
import screen2 from "./../../assets/images/advertise2.png";
import screen3 from "./../../assets/images/advertise3.png";
import screen4 from "./../../assets/images/advertise4.png";
import screen5 from "./../../assets/images/advertise5.png";
import logo from "./../../assets/images/shop-logo.PNG";

function StallHome(){


    const styles = {
        sideScreen:{
            width:"100px",
            height:"150px",
        },
        centerScreen:{
            width:"200px",
            height: "100px"
        }
    }

    return  <>
                <div className="stall">
                <Container>
                    <Row className="w-100">
                        <Col>
                            <Button className="my-2 product-screens"  ><Image style={styles.sideScreen}  src={screen1}></Image></Button>
                        </Col>
                        <Col>
                            <Button className="mb-2 ml-4 product-screens" > <Image style={styles.centerScreen}  src={screen5} /> </Button>
                        </Col>
                        <Col>
                            <Button   className="product-screens"> <Image style={styles.sideScreen}  src={screen2} /></Button>
                        </Col>

                    </Row>
                    <Row className="w-100">
                        <Col>
                            <Button className="my-2 product-screens"  > <Image style={styles.sideScreen}  src={screen3} /></Button>
                        </Col>
                        <Col>
                            <Button className="mt-4 ml-4 product-screens-dark"  ><Image style={styles.centerScreen}  src={logo} />  </Button>
                        </Col>
                        <Col>
                            <Button  className="product-screens"><Image style={styles.sideScreen}  src={screen4} /></Button>
                        </Col>

                    </Row>

                </Container>
                </div>
            </>
}
export default StallHome;