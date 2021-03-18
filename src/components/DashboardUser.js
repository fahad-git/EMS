import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import '../assets/css/Dashboard.css';

import { useUserContext } from './MyContext';
// APIs calling
import {UserDashboardData} from './API/userAPIs';

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

    const [user, setUser] = useUserContext();

    const [notification, setNotifications] = useState([]);
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [organizingEvents, setOrganizingEvents] = useState([]);
    const [myStalls, setMyStalls] = useState([])
    
    const [totalOrganizingEvents, setTotalOrganizingEvents] = useState();
    const [totalAttendingEvents, setTotalAttendingEvents] = useState();
    const [totalUpcomingEvents, setTotalUpcomingEvents] = useState();
    const [totalStalls, setTotalStalls] = useState();

    const selectedEventHandler = (name) => {
        console.log("Row Clicked", name);
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
            user.isLogin = true;
            setUser(user);
        }).catch(err => {
            console.log(err)
        });
    }, [])


    return  <>
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
                                    <Col>
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
                    {attendingEvents.map( ({name, date, host, details}, index) => {
                        return <div key={"attending" + index}>
                                    <Row  key={"attending-container" + index}  style={styles.container}>
                                        <Col onClick={ () => selectedEventHandler(name)} style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{name} </Col>
                                            <Col style={styles.record}>Date & Time: {date} 10 pm</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host} </Col>
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
                        <Col style={styles.title}>Organizing Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {organizingEvents.map( ({name, date, host, details}, index) => {
                        return <div key={"organize" + index}>
                                    <Row key={"organize-container" + index} style={styles.container}>
                                        <Col onClick={ () => selectedEventHandler(name)} style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{name} </Col>
                                            <Col style={styles.record}>Date & Time: {date} 10 pm</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host} </Col>
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
                        <Col style={styles.title}>My Stalls</Col>
                    </Row> 
                    <hr className="divider"/>   
                    {myStalls.map( ({name, date, host, details}, index) => {
                        return <div key={"stall"+ index}>
                                    <Row key={"stall-container"+ index} style={styles.container}>
                                        <Col onClick={ () => selectedEventHandler(name)} style={styles.eventSelection}>
                                            <Row>
                                            <Col style={styles.heading}>{name} </Col>
                                            <Col style={styles.record}>Date & Time: {date} 10 pm</Col>
                                            </Row>
                                            <Row>
                                            <Col style={styles.record}>Organizier: {host} </Col>
                                            <Col style={styles.record}>Details: {details} </Col>
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
export default DashboardUser;