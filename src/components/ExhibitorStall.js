import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextEllipsis from 'react-text-ellipsis';
import FloatActionButton from './FloatActionButton';

import { Container, Row, Col, Image, Nav, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import exhibitorStall from './../assets/images/exhibitor-stall.jpg';

import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';


import { RefreshToken } from './API/Auth';
import { GetStallByStallId } from "./API/userAPIs";

import StallHome from './StallComponents/StallHome';
import StallAboutUs from './StallComponents/StallAboutUs';
import StallContactUs from './StallComponents/StallContactUs';
import Products from './StallComponents/Products';
import Message from './StallComponents/Message';
import Chat from './StallComponents/Chat';
import StallVideos from './StallComponents/StallVideos';
import Catalogues from './StallComponents/Catalogues';

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

    var IDs = {}
    const history = useHistory();

    const [content, setContent] = useState();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();

    var [stall, setStall] = useState();
    var [component, setComponent] = useState("HOME");

    const renderComponent = () => {
        switch(component){
            case "HOME":
                return <StallHome data = {stall} />
            case "ABOUTUS":
                return <StallAboutUs data = {stall}/>
            case "CONTACTUS":
                return <StallContactUs data = {stall} />
            case "PRODUCTS":
                return <Products data={stall} />
            case "MESSAGE":
                return <Message data={stall} />
            case "CHAT":
                return <Chat data={stall} />
            case "VIDEOS":
                return <StallVideos data={stall} />
            case "CATALOGUE":
                return <Catalogues data={stall} />  
        }
    }

    useEffect(() =>{
        var arr = history.location.pathname.split("/");
        var Ids = [];
        for(let i of arr)
            if(!Number.isNaN(parseInt(i))){
                Ids.push(parseInt(i));
            }
        console.log(Ids)
        if(Ids == []){
            history.goBack();
            return;
        }
        try{
            IDs["eventId"] = Ids[0];
            IDs["stallId"] = Ids[1];
        }catch(e){
            history.goBack();
            return;
        }

        GetStallByStallId(IDs.stallId)
        .then(res => {
            setStall(res.data[0])
            console.log(res.data[0])
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


    }, [])

    return  <>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    <div className="exhibitor">
                <Container>
                    <Row>
                    <Col>
                        <Nav fill  className="justify-content-center" variant="tabs" defaultActiveKey="#home">
                            <Nav.Item>
                                <Nav.Link href="#home" onClick={() => setComponent("HOME")} >Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link  href="#about-us" onClick={() => setComponent("ABOUTUS")} >About Us</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#catalogue" onClick={() => setComponent("CATALOGUE")} >Catalogues & Price List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#catalogue" onClick={() => setComponent("PRODUCTS")}>Order Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#message" onClick={() => setComponent("MESSAGE")}>Leave a Message</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link  href="#chat" onClick={() => setComponent("CHAT")}>Start Chat</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>Book a slot</Nav.Link>
                            </Nav.Item>
                            <Dropdown as={NavItem}>
                                <Dropdown.Toggle as={NavLink}>More</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item  href="#contact-us" onClick={() => setComponent("CONTACTUS")} >Contact Us</Dropdown.Item>
                                    <Dropdown.Item href={stall?.logoImage} target="_blank">Instagram</Dropdown.Item>
                                    <Dropdown.Item href="#videos" onClick={() => setComponent("VIDEOS")}>Videos</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                            {renderComponent()}
                        </Col>
                    </Row>
                </Container>
                </div>
                <FloatActionButton />
            </>
}
export default ExhibitorStall;


                {/* <Container> */}
            //     <Row style = {styles.main}>
            //     <Col sm="2" style={styles.sidebar}>
            //         <br/>
            //         <h2>About Us</h2>
            //         <hr/>
            //         <TextEllipsis 
            //             lines={8} 
            //             tag={'p'} 
            //             ellipsisChars={'...'} 
            //             tagClass={'className'} 
            //             debounceTimeoutOnResize={200} 
            //             useJsOnly={true} 
            //             onResult={(result) => { 
            //                 if (result === TextEllipsis.RESULT.TRUNCATED)
            //                     console.log('text get truncated');
            //                 else 
            //                     console.log('text does not get truncated');
            //                 }}>
            //             It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
            //         </TextEllipsis>                                                        
            //         <br/>
            //         <h2>Description</h2>
            //         <hr/>
            //         <TextEllipsis 
            //             lines={10} 
            //             tag={'p'} 
            //             ellipsisChars={'...'} 
            //             tagClass={'className'} 
            //             debounceTimeoutOnResize={200} 
            //             useJsOnly={true} 
            //             onResult={(result) => { 
            //                 if (result === TextEllipsis.RESULT.TRUNCATED)
            //                     console.log('text get truncated');
            //                 else 
            //                     console.log('text does not get truncated');
            //                 }}>
            //         'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            //         </TextEllipsis>                                                        

            //     </Col>
            //     <Col sm="8">
            //         <Image src={exhibitorStall} style={styles.exhibitorStall} fluid/>
            //     </Col>
            //     <Col sm="2" style = {styles.sidebar}>
            //         <Row>
            //             <Image style={styles.tile} src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/fashionmain-2014091009305823.jpg"></Image>
            //         </Row>
            //         <Row>
            //         <Image style={styles.tile} src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/fashionmain-2014091009305823.jpg"></Image>
            //         </Row>
            //         <Row>
            //         <Image style={styles.tile} src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/fashionmain-2014091009305823.jpg"></Image>
            //         </Row>

            //     </Col>
            // </Row>
        {/* </Container> */}