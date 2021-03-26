import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Image, Button,Nav } from 'react-bootstrap'
import stall from './../assets/images/stall.png';
import FloatActionButton from './FloatActionButton';
import DynamicModal from './DynamicModal';

import './../assets/css/BaseComponents.css';
import AddStall from './AddStall';

import { ToastContainer, toast } from 'react-toastify';
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs goes here
import { RefreshToken } from './API/Auth';
import { EventOptions } from './API/userAPIs';


const exhibitors = [{
    "name": "Exhibitor 1",
    "img":stall
},{
    "name": "Exhibitor 2",
    "img":stall
},{
    "name": "Exhibitor 3",
    "img":stall
},{
    "name": "Exhibitor 4",
    "img":stall
},{
    "name": "Exhibitor 5",
    "img":stall
},{
    "name": "Exhibitor 6",
    "img":stall
},{
    "name": "Exhibitor 7",
    "img":stall
},{
    "name": "Exhibitor 8",
    "img":stall
}
]



const styles = {
    stall:{
        width: "calc(100px + 3vmin)",
        height: "calc(100px + 3vmin)"
    },
    stallContainer:{
        cursor: "pointer",
    },
    main:{
        minHeight:"80vh"
    },
    align:{
        textAlign:"left",
    },
    sidebar:{
        textAlign:"left",
        color:"white"
    }
}

function Exhibitors(){

    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [content, setContent] = useState();
    const [user, setUser] = useUserContext();
    const [userRole, setUserRole] = useState();
    const [header, toggleHeader] = useHeaderContext();


    const addStallHandler = () => {
        let cont = {
            header:"Add New Stall",
            component:<AddStall/>,
            footer:""
          }
        setContent(cont);
        toggleModelOpen(true);
        
    }    

    const exhibitorStallHandler = () => {
        history.push(history.location.pathname + "/exhibitor-stall");
    }

    useEffect(() => {

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

        EventOptions(ID)
        .then(res => {
            setUserRole(res.data.role);
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
                {modalOpen?  <DynamicModal content={content} />: ''}
            <hr/>
                <Row style={styles.main}>
                    <Col sm="3" className="sidebar">
                        <h3 style={styles.sidebar}>Exhibitors</h3>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#aboutUs">Daily Wear</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#contactUs">Holiday Dresses</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Accessaries</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Communion Dresses</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Exhibitors</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Weddings</Nav.Link>
                    </Col>
                    <Col sm="9"> 
                        <Container>       
                            <Row>
                                <Col>
                                    <h2 className='float-left' style={styles.align}>Daily Wear</h2>
                                    <Button className='float-right'  style={{display: (userRole === "attendee") ? "none":"block" }} onClick={addStallHandler} variant='secondary'>
                                        Add Stall
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                {exhibitors.map(({name, img}, index)=>(
                                    <Col key={index} onClick={exhibitorStallHandler} className="mb-5 mx-4" style={styles.stallContainer}>
                                        <Image src={img} style={styles.stall}/>
                                        <p>{name}</p>
                                        <Button className="ml-5" style={{display: (userRole === "attendee") ? "none":"block" , fontSize:"10px"}} variant="secondary">Remove</Button>
                                    </Col>         
                                ))}
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <FloatActionButton />
            </>

}
export default Exhibitors;