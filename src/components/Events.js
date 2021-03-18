import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import SearchField from "react-search-field";
import '../assets/css/Dashboard.css';
import 'react-toastify/dist/ReactToastify.css';

import { useModalContext, useUserContext } from './MyContext';
import CreateEvent from './CreateEvent';
import { useHistory } from 'react-router-dom';

// API Callings
import { UpcomingEventsData } from './API/userAPIs';
import DynamicModal from './DynamicModal';

const styles = {
    container:{
        marginTop:20,
        outline:5,
        border:5
    },
    title:{
        fontSize:"calc(5px + 3vmin)",
        textAlign: "left",
        marginTop:20
    },
    heading:{
        fontSize:"calc(5px + 3vmin)",
        textAlign:"left"
    },
    circles:{
        marginBottom: 30
    },
    record:{
        fontSize:"calc(3px + 2vmin)",
        textAlign:"left"
    },
    searchField:{
        borderRadius: "50%"
    },
    eventSelection:{
        cursor:"pointer"
    },
    btn:{
        width:"100px"
    }
}

function Events(){

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [user, setUser] = useUserContext();
    const [content, setContent] = useState();

    const [events, setEvents] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = () => {
        console.log(searchQuery);
    }

    const detailsHandler = () => {
        if(!user){
            toast("You must login first", {
                type:"info",
                });
        }else {
            let cont = {
                header:"Organize Event",
                component:<CreateEvent/>,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
        }
    }

    const buyTicketHandler = () => {
        if(!user){
            toast("You must login first", {

                type:"info",
                });
        }else {
            let cont = {
                header:"Buy Ticket",
                component:<CreateEvent/>,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
        }
    }

    const selectedEventHandler = (name) => {
        console.log(name)
    }
  
    useEffect(() => {
        UpcomingEventsData()
        .then(res => {
            setEvents(res.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    const renderModalHandler = () => {
        if(user && user.isLogin)
            return modalOpen ? <DynamicModal content={content} /> : <></> ;
        return;
    }

    return  <>
            {renderModalHandler()}

            <ToastContainer 
                position="top-left"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="dashboard">
                <Container>
                    <Row>
                        <Col>
                            <SearchField
                                placeholder="Search..."
                                onChange={value => setSearchQuery(value)}
                                searchText=""
                                style={styles.searchField}
                                onEnter={searchHandler}
                                onSearchClick = {searchHandler}
                                />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Upcoming Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {/* Here wil go dynamic UI */}
                    {events.map( ({name, date, host, details}, index) => {
                        return <div key={"events"+index}>
                                <Row key={"events-container"+index} style={styles.container}>
                                    <Col sm={12} md={10} onClick={ () => selectedEventHandler(name)} style={styles.eventSelection}>
                                        <Row>
                                        <Col sm={4} style={styles.heading}>{name} </Col>
                                        <Col sm={6} style={styles.record}>Date & Time: {date} 10 pm</Col>
                                        </Row>
                                        <Row>
                                        <Col sm={4} style={styles.record}>Organizier: {host} </Col>
                                        <Col sm={6} style={styles.record}>Details: {details} </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={2}>
                                        <Row>
                                            <Col sm={6} md={12} className="mb-1" style={styles.record}><Button onClick={detailsHandler} style={styles.btn} variant="secondary">Details</Button></Col>                                    
                                            <Col sm={6} md={12} style={styles.record}><Button onClick={buyTicketHandler} style={styles.btn} variant="secondary">Buy Ticket</Button></Col>
                                        </Row>
                                    </Col>
                                </Row> 
                                <hr className="divider"/>
                                </div>
                    })}
                </Container>
            </div>
            </>

}
export default Events;

{/*
                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Upcoming Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    <Row style={styles.container} className="justify-content-center" >
                        <Col style={styles.heading}>Name </Col>
                        <Col style={styles.heading}>Date</Col>
                        <Col style={styles.heading}>Host Name </Col>
                        <Col style={styles.heading}>Details</Col>
                    </Row>
                    <hr className="divider"/>   

                    
                    {events.map( ({name, date, host, details}, index) => {
                        return <Row key={index} style={styles.container}>
                                    <Col style={styles.record}>{name} </Col>
                                    <Col style={styles.record}>{date}</Col>
                                    <Col style={styles.record}>{host}</Col>
                                    <Col style={styles.record}>{details} </Col>
                                </Row>                                   
                    })}
                    <hr className="divider"/>

                </Container>
*/}