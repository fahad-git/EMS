import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import '../assets/css/Dashboard.css';

import { useUserContext } from './MyContext';

const tmp = [{
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


function Dashboard(){

    const [user, setUser] = useUserContext();
    const [events, setEvents] = useState(tmp);

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
            fontSize:"calc(5px + 3vmin)"
        },
        circles:{
            marginBottom: 30
        },
        record:{
            fontSize:"calc(3px + 2vmin)"
        }
    }

    const [totalEvents, setTotalEvents] = useState(23);
    const [todayEvents, setTodayEvents] = useState(3);
    const [upcomingEvents, setUpcomingEvents] = useState(20);
    const [totalUsers, setTotalUsers] = useState(105);
    const [totalAdmins, setTotalAdmins] = useState(40);

    return  <>
            <div className="dashboard">
                <Container>
                    <Row style={styles.circles} className="justify-content-center">
                        <Col xs={4} md>
                            <Button className="circular-progress">
                                <h3> {totalEvents} </h3>
                            </Button>
                            <p>Total Events</p>
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                                <h3> {todayEvents} </h3>
                            </Button>
                            <p>Today's Events</p>
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                            <h3> {upcomingEvents} </h3>
                            </Button>
                            <p>Upcoming Events</p>                            
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                                <h3> {totalUsers} </h3>
                            </Button>
                            <p>Total Users</p>
                        </Col>
                        <Col xs={4} md>
                            <Button className="circular-progress">
                            <h3> {totalAdmins} </h3>
                            </Button>
                            <p>Total Admins</p>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Today's Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    <Row style={styles.container} className="justify-content-center" >
                        <Col style={styles.heading}>Event Name </Col>
                        <Col style={styles.heading}>Date</Col>
                        <Col style={styles.heading}>Host </Col>
                        <Col style={styles.heading}>Details </Col>
                    </Row>
                    <hr className="divider"/>   

                    {/* Here wil go dynamic UI */}
                    {events.map( ({name, date, host, details}, index) => {
                        return <Row key={index} className="justify-content-center" style={styles.container}>
                            <Col style={styles.record}>{name} </Col>
                            <Col style={styles.record}>{date}</Col>
                            <Col style={styles.record}>{host} </Col>
                            <Col style={styles.record}>{details} </Col>
                            </Row>                                   
                    })}
                    <hr className="divider"/>

                </Container>
            </div>
            </>

}
export default Dashboard;