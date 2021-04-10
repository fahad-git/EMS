import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Image, Button, Collapse, Navbar } from 'react-bootstrap'
import stall from './../assets/images/stall.png';
import FloatActionButton from './FloatActionButton';
import DynamicModal from './DynamicModal';

import './../assets/css/BaseComponents.css';
import AddStall from './AddStall';

import { ToastContainer, toast } from 'react-toastify';
import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs goes here
import { RefreshToken } from './API/Auth';
import { EventOptions, StallCategories, EventStallsById } from './API/userAPIs';


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
    },
    cat:{
        textAlign:"left",
        color:"white",
        cursor:"pointer",
        outline:"none"
    },
    overflow:{
        overflowY:"scroll",
        minHeight:"100%"
    }
}

function Exhibitors(){

    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [content, setContent] = useState();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();

    var [isOrganizer, setIsOrganizer] = useState(0);
    var [screenName, setScreenName] = useState("");
    var [stalls, setStalls] = useState([]);
    var [selectedCategory, setSelectedCategory] = useState("All");
    var [categories, setCategories] = useState([]);
    var [showCollapseButton, setShowCollapseButton] = useState(true)

    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })

    const addStallHandler = () => {
        let cont = {
            header:"Add New Stall",
            component:<AddStall/>,
            footer:""
          }
        setContent(cont);
        toggleModelOpen(false);
        
    }    

    const exhibitorStallHandler = () => {
        history.push(history.location.pathname + "/exhibitor-stall");
    }

    const categoryHandler = (name) => {
        console.log(name);
        setSelectedCategory(name);
    }

    useEffect(
    function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
        if(window.innerWidth < 400)
            setShowCollapseButton(false);
        else            
            setShowCollapseButton(true);
        
            window.addEventListener('resize', handleResize)


            return _ => {
                window.removeEventListener('resize', handleResize)
              }

    },[])
  
  
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
            setScreenName(res.data[0][0].stalls)
            setIsOrganizer(res.data[1][0].organizer);
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

        StallCategories()
        .then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.log();
        })

        EventStallsById(ID)
        .then(res => {
            setStalls(res.data);
        }).catch(err => {
            console.log();
        })
    }, [])


    return  <>
                {modalOpen?  <DynamicModal content={content} />: ''}
                <hr/>
                <Button variant="outline-secondary" onClick={ ()=> setShowCollapseButton(!showCollapseButton)} style={{display: showCollapseButton && window.innerWidth >400? "none" : "block"}} className="float-left"> <i className="material-icons">dashboard</i></Button>
                <Row style={styles.main}>                
                <Collapse in={showCollapseButton}  id="responsive-navbar-nav">
                    <Col sm="3" className="sidebar" style={styles.overflow}>
                        <h3 style={styles.sidebar} className="ml-2">{screenName}</h3>
                         <hr className="divider my-4"/>
                            <Row>
                                <Col className="ml-2" style={styles.align}>
                                <Button variant="link" onClick={() => categoryHandler("All")} style={styles.cat}>ALL</Button>
                                <hr/>
                                </Col>
                            </Row>
                            {
                            categories.map(({cat_id, type, name, index}) => (
                                <Row key={name + "-" +index}>
                                    <Col className="ml-2" style={styles.align}>
                                    <Button variant="link" onClick={() => categoryHandler(name)} style={styles.cat}>{name}</Button>
                                    <hr/>
                                    </Col>
                                </Row>
                            ))
                            }
                         {/*
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
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Weddings</Nav.Link> */}
                    </Col>
                    </Collapse>
                    <Col sm="9"> 
                        <Container>       
                            <Row>
                                <Col>
                                    <h2 className='float-left' style={styles.align}>{selectedCategory}</h2>
                                    <Button className='float-right'  style={{display: isOrganizer? "block":"none" }} onClick={addStallHandler} variant='secondary'>
                                        Add Stall
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                {stalls.map(({stall_id, event_id, name, description, category, slogan, logoImg, owner_name, about_us, status}, index)=>(
                                    <Col key={index} onClick={exhibitorStallHandler} className="mb-5 mx-4 col-4" style={styles.stallContainer}>
                                        <center>
                                        <Image src={stall} style={styles.stall}/>
                                        <p>{name}</p>
                                        <Button style={{display: isOrganizer ? "block":"none" , fontSize:"10px"}} variant="secondary">Remove</Button>
                                        </center>
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