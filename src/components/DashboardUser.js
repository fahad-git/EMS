import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Button, Container, Row, Col } from 'react-bootstrap';
import '../assets/css/Dashboard.css';

import MyContext, { useModalContext,  useHeaderContext, useUserContext } from './MyContext';
// APIs calling
import {UpcomingEventsData, UserDashboardData} from './API/userAPIs';
import { RefreshToken } from './API/Auth';

const styles = {
    container:{
        marginTop:20,
        outline:5,
        border:5
    },
    title:{
        fontSize:"calc(6px + 3vmin)",
        textAlign: "left",
        marginTop:20,
        fontWeight:"bold"
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
    eventSelection:{
        cursor:"pointer"
    }
}

function DashboardUser(){
    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const {state, dispatch} = useContext(MyContext);


    const [notification, setNotifications] = useState([]);
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [organizingEvents, setOrganizingEvents] = useState([]);
    const [myStalls, setMyStalls] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    
    const [totalOrganizingEvents, setTotalOrganizingEvents] = useState();
    const [totalAttendingEvents, setTotalAttendingEvents] = useState();
    const [totalUpcomingEvents, setTotalUpcomingEvents] = useState();
    const [totalStalls, setTotalStalls] = useState();

    const attendingEventHandler = (id) => {
        console.log("Row Clicked", id);
        dispatch({type:"ATTEND-EVENT", params:{"id":id} });
        history.push("/main-lobby/" + id);
    }
    
    const organizingEventHandler = (id) => {
        console.log("Row Clicked", id);
        dispatch({type:"ATTEND-EVENT", params:{"id":id} });
        history.push("/main-lobby/" + id);
    }

    
    const stallEventHandler = (id) => {
        console.log("Row Clicked", id);
        dispatch({type:"ATTEND-EVENT", params:{"id":id} });
        history.push("/main-lobby/" + id);
    }

    useEffect(()=>{
        UserDashboardData()
        .then(res=>{
            setTotalOrganizingEvents(res.data.totalOrganizeEvents);
            setTotalAttendingEvents(res.data.totalAttendingEvents);
            setTotalUpcomingEvents(res.data.totalUpcomingEvents);
            setTotalStalls(res.data.totalStalls);

            setNotifications(res.data.notifications);
            setAttendingEvents(res.data.attendingEvents);
            setOrganizingEvents(res.data.organizingEvents);
            setMyStalls(res.data.myStalls);
            setUpcomingEvents(res.data.upcomingEvents);
            user.isLogin = true;
            setUser(user);
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
                    <Row style={styles.circles} className="justify-content-center">
                        <Col xs={4} md>
                            <Button className="circular-progress">
                                <h3> {totalUpcomingEvents} </h3>
                            </Button>
                            <p>Upcoming Events</p>
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                                <h3> {totalAttendingEvents} </h3>
                            </Button>
                            <p>Attending Events</p>
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                            <h3> {totalOrganizingEvents} </h3>
                            </Button>
                            <p>Organizing Events</p>                            
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                                <h3> {totalStalls} </h3>
                            </Button>
                            <p>Total Stalls</p>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Notifications</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {notification.map( ({event, details}, index) => {
                    return <div key={"notification" + index}>
                                <Row key={"notification-container" + index} style={styles.container}>
                                    <Col className="event-items">
                                        <Row>
                                            <Col style={styles.heading}>Event: {event} </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styles.record}>Details: {details} </Col>
                                        </Row>
                                    </Col>
                                </Row>  
                                <hr className="divider"/>
                            </div>                                                          
                    })}
    
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Attending Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {attendingEvents.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name}, index) => {
                        return <div key={"attending" + index}>
                                    <Row  key={"attending-container" + index}  style={styles.container}>
                                        <Col onClick={ () => attendingEventHandler(event_Id)}  className="event-items"  style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{event_name} </Col>
                                            <Col style={styles.record}>Date & Time: {(new Date(start_date)).toString()}</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host_name} </Col>
                                            <Col style={styles.record}>Type: {type} </Col>
                                            </Row>
                                        </Col>
                                    </Row> 
                                    <hr className="divider"/>
                                </div>       
                    })}
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Organizing Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {organizingEvents.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name}, index) => {
                        return <div key={"organize" + index}>
                                    <Row key={"organize-container" + index} style={styles.container}>
                                        <Col onClick={ () => organizingEventHandler(event_Id)}  className="event-items"  style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{event_name} </Col>
                                            <Col style={styles.record}>Date & Time: {(new Date(start_date)).toString()}</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host_name} </Col>
                                            <Col style={styles.record}>Type: {type} </Col>
                                            </Row>
                                        </Col>
                                    </Row> 
                                    <hr className="divider"/>
                                </div>  
                                                                
                    })}
                </Container>
                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>My Stalls</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {myStalls.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name}, index) => {
                        return <div key={"stall"+ index}>
                                    <Row key={"stall-container"+ index} style={styles.container}>
                                        <Col onClick={ () => stallEventHandler(event_Id)}  className="event-items"  style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{event_name} </Col>
                                            <Col style={styles.record}>Date & Time: {(new Date(start_date)).toString()}</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host_name} </Col>
                                            <Col style={styles.record}>Type: {type} </Col>
                                            </Row>
                                        </Col>
                                    </Row> 
                                    <hr className="divider"/>
                                </div>  
                                                                
                    })}
                </Container>
                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Upcoming Events</Col>
                    </Row> 
                    <hr className="divider"/>
                    {upcomingEvents.map( ({event_Id, eventLobby_Id, event_name, type, description, start_date, end_date, status, rating, host_name}, index) => {
                        return <div key={"stall"+ index}>
                                    <Row key={"stall-container"+ index} style={styles.container}>
                                        <Col onClick={ () => toast("Click events to see details", {type:"info"})} className="event-items"  style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{event_name} </Col>
                                            <Col style={styles.record}>Date & Time: {(new Date(start_date)).toString()}</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host_name} </Col>
                                            <Col style={styles.record}>Type: {type} </Col>
                                            </Row>
                                        </Col>
                                    </Row> 
                                    <hr className="divider"/>
                                </div>  
                    })}
                </Container>
                <div style={{height:"12vh"}}>
                </div>         
            </div>
            </>

}
export default DashboardUser;