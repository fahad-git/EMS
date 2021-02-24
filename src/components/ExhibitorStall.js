import React from 'react';
import TextEllipsis from 'react-text-ellipsis';


import { Container, Row, Col, Image } from 'react-bootstrap';

import exhibitorStall from './../assets/images/exhibitor-stall.jpg';

const styles = {
    main:{
        // minHeight:"90vh"
    },
    sidebar:{
        backgroundColor:"gray",
        color:"white"
    },
    exhibitorStall:{
        position:"cover"
    },
    tile:{
        width:"100%",
        height:150,
        marginTop:10
    }
}

function ExhibitorStall(){

    return  <>
                {/* <Container> */}
                    <Row style = {styles.main}>
                        <Col sm="2" style={styles.sidebar}>
                            <br/>
                            <h2>About Us</h2>
                            <hr/>
                            <TextEllipsis 
                                lines={8} 
                                tag={'p'} 
                                ellipsisChars={'...'} 
                                tagClass={'className'} 
                                debounceTimeoutOnResize={200} 
                                useJsOnly={true} 
                                onResult={(result) => { 
                                    if (result === TextEllipsis.RESULT.TRUNCATED)
                                        console.log('text get truncated');
                                    else 
                                        console.log('text does not get truncated');
                                    }}>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
                            </TextEllipsis>                                                        
                            <br/>
                            <h2>Description</h2>
                            <hr/>
                            <TextEllipsis 
                                lines={10} 
                                tag={'p'} 
                                ellipsisChars={'...'} 
                                tagClass={'className'} 
                                debounceTimeoutOnResize={200} 
                                useJsOnly={true} 
                                onResult={(result) => { 
                                    if (result === TextEllipsis.RESULT.TRUNCATED)
                                        console.log('text get truncated');
                                    else 
                                        console.log('text does not get truncated');
                                    }}>
                            'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </TextEllipsis>                                                        

                        </Col>
                        <Col sm="8">
                            <Image src={exhibitorStall} style={styles.exhibitorStall} fluid/>
                        </Col>
                        <Col sm="2" style = {styles.sidebar}>
                            <Row>
                                <Image style={styles.tile} src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/fashionmain-2014091009305823.jpg"></Image>
                            </Row>
                            <Row>
                            <Image style={styles.tile} src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/fashionmain-2014091009305823.jpg"></Image>
                            </Row>
                            <Row>
                            <Image style={styles.tile} src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/fashionmain-2014091009305823.jpg"></Image>
                            </Row>

                        </Col>
                    </Row>
                {/* </Container> */}
            </>
}
export default ExhibitorStall;