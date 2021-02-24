import React from 'react';
import  { useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

import ImageMapper from 'react-image-mapper';

import IMAGE_URL from './../assets/images/main-lobby.jpg';

// css goes here
import './../assets/css/MainLobby.css';

const imgs = {
    src1:"https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3aaa3d4c-33d5-4df8-8dc2-17fb1a0f302a/15.jpg",
    src2:"https://lh3.googleusercontent.com/proxy/Tj_crS8zZBsCE383p0KL3HxPW44QJZeAuW1wyNBgXMWy9mfcme9h0TEgmD9dOHwZ1dfpLI9C4e6NdNo1TsOHieipKjMCbvyQ2RfgBeilIvIb_J_xGS3APNIxML9zPaXn6RGCMaBx3ryuGaLmx-SR0wGZjBSm4-aduicD2aG7FktUmaenjiwcY4c",
    src3:"https://lh3.googleusercontent.com/proxy/Tj_crS8zZBsCE383p0KL3HxPW44QJZeAuW1wyNBgXMWy9mfcme9h0TEgmD9dOHwZ1dfpLI9C4e6NdNo1TsOHieipKjMCbvyQ2RfgBeilIvIb_J_xGS3APNIxML9zPaXn6RGCMaBx3ryuGaLmx-SR0wGZjBSm4-aduicD2aG7FktUmaenjiwcY4c",
    src4:"http://www.onextrapixel.com/wp-content/uploads/2012/01/products-design-3.jpg",
    src5: "https://assets.crowdspring.com/marketing/landing-page/crowdspring-product-design-phase1-1120.jpg"
}

const styles = {
    img: {
        width:100,
        height:100
    },
    btn:{
       height:"10vh",
       width:"15vh",
       marginTop:"50px",
    },
    align:{
        marginLeft:"10px !important"
    }
}

// const IMAGE_URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg" 
const AREAS_MAP = { name: "my-map",
areas: [
  { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
  { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },
  { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
  { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
  { name: "5", shape: "circle", coords: [170, 100, 25 ] },
]}


function MainLobby(){

    const history = useHistory();

    const catwalkHandler = () => {
        history.push("/catwalk");
    }

    const helpDeskHandler = () => {
        history.push("/help-desk")
    }

    const exhibitorsHandler = () => {
        history.push("/exhibitors");
    }

    const webinarHandler = () => {
        history.push("/webinar");
    }

    return  <>
                <div className="main-lobby">
                    {/* <Container>
                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src1} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src2} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src3} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src4} rounded/>
                            </Col>
                            <Col>
                                <Image style={styles.img} src={imgs.src5} rounded/>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Container> */}
                    {/* <ImageMapper src={IMAGE_URL} map={AREAS_MAP} width={1400} /> */}
                    <Container style={styles.align} >
                    <Row>
                        <Col>
                            <Button onClick={catwalkHandler} style={styles.btn} className="float-left" variant="outline-light">Catwalk </Button>
                        </Col>
                        <Col>
                            <Button onClick={helpDeskHandler} style={styles.btn} variant="outline-light">Help Desk </Button>
                        </Col>
                        <Col>
                            <Button onClick={exhibitorsHandler} style={styles.btn} variant="outline-light">Exhibition </Button>
                            <Button onClick={webinarHandler} style={styles.btn} className="float-right" variant="outline-light">Webinar </Button>
                        </Col>
                    </Row>
                    </Container>
                </div>   
            </>

}

export default MainLobby;