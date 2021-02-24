import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import SearchField from "react-search-field";
import '../assets/css/Dashboard.css';

import { useModalContext } from './MyContext';
import CreateEvent from './CreateEvent';
import DynamicModal from './DynamicModal';

import { useHistory } from 'react-router-dom';

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
    },
    searchField:{
        borderRadius: "50%"
    }
}

function Events(){

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();

    const [events, setEvents] = useState(tmp);
    const [content, setContent] = useState();

    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = () => {
        console.log(searchQuery);
    }

    const createEventHandler = () => {
        let cont = {
            header:"Create Event",
            component:<CreateEvent/>,
            footer:""
          }
        setContent(cont);
        toggleModelOpen(true);
    }

  
    return  <>
            {modalOpen?  <DynamicModal content={content} />: ''}

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
                            <Button onClick={createEventHandler} className="float-right" variant="secondary">Create Event</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Events</Col>
                    </Row> 
                    <hr className="divider"/>   
                    <Row style={styles.container} className="justify-content-center" >
                        <Col style={styles.heading}>Name </Col>
                        <Col style={styles.heading}>Date</Col>
                        <Col style={styles.heading}>Host Name </Col>
                        <Col style={styles.heading}>Details</Col>
                    </Row>
                    <hr className="divider"/>   

                    {/* Here wil go dynamic UI */}
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
            </div>
            </>

}
export default Events;