import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import SearchField from "react-search-field";
import DynamicModal from './../DynamicModal';

// CSS
import '../../assets/css/Dashboard.css';
import 'react-toastify/dist/ReactToastify.css';

import { useModalContext,  useHeaderContext, useUserContext } from './../MyContext';
import EventDetails from './../EventDetails';
import Invoice from './../Invoice';
import { useHistory } from 'react-router-dom';

// API Callings
import { AllEventsData, UpcomingEventsData, RequestedEventsData } from './../API/userAPIs';
import { AllEventRequestForAdmin, UpdateEventRequestForAdmin } from './../API/AdminAPIs';
import { RefreshToken } from './../API/Auth';

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
        cursor:"default",
    },
    btn:{
        width:"100px"
    }
}

function EventRequests(){

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [content, setContent] = useState();

     var [events, setEvents] = useState([]);
     const [allEvents, setAllEvents] = useState([]);
     const [requestedEvents, setRequestedEvents] = useState([])

    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = () => {
        if(searchQuery.trim() === "")
        {
                setEvents(allEvents);
        }
        let eventList = []
        for(let tmp of allEvents)
            if(tmp.event_name.toLowerCase().includes(searchQuery.toLowerCase()))
                eventList.push(tmp)
        setEvents(eventList)
    }

    const detailsHandler = (id) => {
        if(!user){
            toast("You must login first", {
                type:"info",
                });
        }else {
            let cont = {
                header:"Event Details",
                component:<EventDetails id = {id} />,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
        }
    }

    const buyTicketHandler = (id) => {
        if(!user){
            toast("You must login first", {
                type:"info",
                });
                return;
        }else {
            let cont = {
                header:"Buy Ticket",
                component:<Invoice id = {id}/>,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
        }
    }

    const selectedEventHandler = (event_Id) => {
        // console.log(event_Id)
        return;
    }

    const eventActionHandler = (updateStatus, roleId) => {
        UpdateEventRequestForAdmin({"status": updateStatus}, roleId)
        .then(res => {
            toast("Event " + updateStatus, {type:"info", onClose: () => window.location.reload()})
        }).catch(err => {
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
        }});
    }
  
    useEffect(() => {
        const api = (user) ? AllEventsData : UpcomingEventsData;
        api()
        .then(res => {
            setAllEvents(res.data)
            setEvents(res.data)
        }).catch(err => {
        //    Error
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

        }});

        if(user){
            AllEventRequestForAdmin()
            .then(res => {
                console.log(res.data)
                setRequestedEvents(res.data)
            }).catch(err => {
            //    Error
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
    
            }});      
        }
    },[])

    const renderModalHandler = () => {
        if(user && user.isLogin)
            return modalOpen ? <DynamicModal content={content} /> : <></> ;
        return;
    }

    return  <>
            {renderModalHandler()}

            <Button variant onClick={() => {toast("You must login first")} }></Button>

            <ToastContainer 
                position="top-center"
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
                
                <Container className="mb-5">
                    <Row style={styles.container}>
                        <Col style={styles.title}>Requested Events</Col>
                    </Row> 
                    <hr className="divider"/>       
                    {/* Here wil go dynamic UI */}
                    {requestedEvents.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name, userRole_id}, index) => {
                        return <div key={"events"+index}>
                            { ( new Date(start_date) ) > Date.now() ? 
                                <Row key={"events-container"+index} className="event-items"  style={styles.container}>
                                    <Col sm={12} md={12} onClick={ () => selectedEventHandler(event_Id)} style={styles.eventSelection}>
                                        <Row className="my-2">
                                            <Col sm={4} style={styles.heading}>{event_name} </Col>
                                            <Col sm={8} style={styles.record}><b>Start Date & Time:</b> {( new Date(start_date) ).toString()}</Col>
                                        </Row>
                                        <Row className="my-2">
                                            <Col sm={4} style={styles.record}><b>Organizier:</b> {host_name} </Col>
                                            <Col sm={8} style={styles.record}><b>End Date & Time:</b> {( new Date(end_date) ).toString()}</Col>
                                        </Row>
                                        <Row className="my-2">
                                            <Col sm={4} style={styles.record}><b>type:</b> {type} </Col>
                                            <Col sm={8} style={styles.record}><b>Description:</b> {description} </Col>
                                        </Row>
                                        <Row className="my-2">
                                            <Col sm={12} style={styles.record}>
                                                <Button variant="secondary" className="float-right mx-3" onClick={() => eventActionHandler("Active", userRole_id)}>Approve</Button>
                                                <Button variant="secondary" className="float-right mx-3" onClick={() => eventActionHandler("Rejected", userRole_id)}>Reject</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> 
                                : "" }
                                { ( new Date(start_date) ) > Date.now() ? <hr className="divider"/> : "" }
                                </div>
                    })}
                    <br/><br/>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>All Events</Col>
                    </Row> 
                    <hr className="divider"/>       
                    {/* Here wil go dynamic UI */}
                    {events.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name}, index) => {
                        return <div key={"events"+index}>
                            { ( new Date(start_date) ) > Date.now() ? 
                                <Row key={"events-container"+index} className="event-items"  style={styles.container}>
                                    <Col sm={12} md={12} onClick={ () => selectedEventHandler(event_Id)} style={styles.eventSelection}>
                                        <Row>
                                            <Col sm={4} style={styles.heading}>{event_name} </Col>
                                            <Col sm={6} style={styles.record}><b>Date & Time:</b> {( new Date(start_date) ).toString()}</Col>
                                            <Col sm={2} style={styles.record}><b>Host:</b> {host_name}</Col>
                                        </Row>
                                        <Row>
                                            <Col sm={4} style={styles.record}><b>Organizier:</b> {host_name} </Col>
                                            <Col sm={6} style={styles.record}><b>type:</b> {type} </Col>
                                            <Col sm={2} style={styles.record}><b>Rating:</b> {rating} / 5</Col>
                                        </Row>
                                    </Col>

                                    <Col sm={12} md={2}>
                                        <Row>
                                            {/* <Col sm={6} md={12} className="mb-1" style={styles.record}><Button onClick={ () => detailsHandler(event_Id)} style={styles.btn} variant="secondary">Details</Button></Col>                                    
                                            <Col sm={6} md={12} style={styles.record}><Button onClick={ () => buyTicketHandler(event_Id) } style={styles.btn} variant="secondary">Buy Ticket</Button></Col> */}
                                        </Row>
                                    </Col>
                                </Row> 
                                : "" }
                                { ( new Date(start_date) ) > Date.now() ? <hr className="divider"/> : "" }
                                </div>
                    })}
                </Container>

            </div>
            <Row className="my-5">
                <Col className="my-5">
                </Col>
            </Row>
            </>
}
export default EventRequests;