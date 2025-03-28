import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import SearchField from "react-search-field";
import '../assets/css/Dashboard.css';
import { useModalContext,  useHeaderContext, useUserContext } from './MyContext';
import CreateEvent from './CreateEvent';
import DynamicModal from './DynamicModal';
import { RefreshToken } from './API/Auth';

import { useHistory } from 'react-router-dom';

// APIs
import { OrganizingEventsData } from "./API/userAPIs";

const tmp = [{
    "id":1,
    "name":"Health Awareness",
    "date":"10-1-2021",
    "host":"Ali",
    "details":"This time of events is 4pm"
},{
    "name":"Catwalk Show",
    "date":"10-1-2021",
    "host":"James",
    "details":"This time of events is 4pm"
},{
    "name":"Games Theory",
    "date":"10-1-2021",
    "host":"Aqib",
    "details":"This time of events is 4pm"
}]

const styles = {
    container:{
        marginTop:20,
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
    },record:{
        fontSize:"calc(3px + 2vmin)",
        textAlign:"left"
    },
    searchField:{
        borderRadius: "50%"
    },
    eventSelection:{
        cursor:"pointer"
    },
}

function OrganizingEvents(){

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const [organizingEvents, setOrganizingEvents] = useState(tmp);
    const [allEvents, setAllEvents] = useState([]);

    const [content, setContent] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = () => {
        if(searchQuery.trim() === "")
            {
                setOrganizingEvents(allEvents);
            }
        let eventList = []
        for(let tmp of allEvents)
            if(tmp.event_name.toLowerCase().includes(searchQuery.toLowerCase()))
                eventList.push(tmp)
                setOrganizingEvents(eventList)
    }

    const organizeEventHandler = () => {
        let cont = {
            header:"Organize Event",
            component:<CreateEvent />,
            footer:""
          }
        setContent(cont);
        toggleModelOpen(true);
    }

    const selectedEventHandler = (eventId) => {
        history.push("/main-lobby/" + eventId);
    }

    const requestsHandler = () => {
        history.push("/organizer/events");
    }

    useEffect(() => {
        OrganizingEventsData()
        .then(res => {
            setOrganizingEvents(res.data)
            setAllEvents(res.data);
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
        })
    },[modalOpen])

  
    return  <>
            {modalOpen?  <DynamicModal content={content} />: ''}

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
                        <Col sm="5"></Col>
                        <Col sm="4">
                            <SearchField
                                placeholder="Search..."
                                onChange={value => setSearchQuery(value)}
                                searchText=""
                                className="float-right"
                                style={styles.searchField}
                                onEnter={searchHandler}
                                onSearchClick = {searchHandler}
                                />
                        </Col>
                        <Col sm="3">
                            <Button onClick={organizeEventHandler} className="float-right" variant="secondary">Organize Event</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Organizing Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {/* Here wil go dynamic UI */}
                    {organizingEvents.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name}, index) => {
                        return <div key={"events"+index}>
                                <Row key={"events-container"+index} className="event-items" style={styles.container}>
                                    <Col style={styles.eventSelection}>
                                        <Row>
                                            <Col sm={5} style={styles.heading}>{event_name} </Col>
                                            <Col sm={7} style={styles.record}><b>Date & Time:</b> { (new Date(start_date)).toString() }</Col>
                                        </Row>
                                        <Row>
                                            <Col sm={5} style={styles.record}><b>Organizier:</b> {host_name} </Col>
                                            <Col sm={7} style={styles.record}><b>Type:</b> {type} </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} style={styles.record}>
                                                <Button variant="secondary" className="float-right mx-3 my-2" onClick={ () => selectedEventHandler(event_Id)}>Details</Button>
                                                <Button variant="secondary" className="float-right mx-3 my-2" onClick={requestsHandler}>Requests</Button>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <hr className="divider"/>
                            </div>
                    })
                    }
                </Container>
            </div>
            </>
}
export default OrganizingEvents;