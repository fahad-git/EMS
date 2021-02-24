import React, { useState } from 'react';
import { Button, Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import SearchField from "react-search-field";

import '../assets/css/Dashboard.css';

import { useModalContext } from './MyContext';
import AddUser from './AddUser';
import DynamicModal from './DynamicModal';
import { useHistory } from 'react-router-dom';

const tmp = [{
    "name":"Ali",
    "role":"Admin",
    "details":"This user has admin rights"
},{
    "name":"James",
    "role":"Host",
    "details":"This user has event host rights"
},{
    "name":"Aqib",
    "role":"Visitor",
    "details":"This user can only view content"
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

function UserManagement(){

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();

    const [users, setUsers] = useState(tmp);
    const [content, setContent] = useState();

    const [searchQuery, setSearchQuery] = useState("");

    const searchHandler = () => {
        console.log(searchQuery);
        toggleModelOpen(false);
        console.log('Working')
    }

    const addUserHandler = () => {
        let cont = {
            header:"ADD USER",
            component:<AddUser/>,
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
                        <Col sm="3">
                            <DropdownButton className="float-right" variant="secondary" id="dropdown-basic-button" title="User Types">
                                <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">SubAdmin</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Event Planner</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Event Host</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Visitor</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col sm="4">
                            <SearchField
                                placeholder="Search..."
                                onChange={value => { toggleModelOpen(false); setSearchQuery(value) }}
                                searchText=""
                                classNames="float-left"
                                style={styles.searchField}
                                onEnter={searchHandler}
                                onSearchClick={searchHandler}
                                />
                        </Col>
                        <Col sm="5">
                            <Button onClick={addUserHandler} className="float-right" variant="secondary">Add User</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row style={styles.container}>
                        <Col style={styles.title}>Users</Col>
                    </Row> 
                    <hr className="divider"/>   
                    <Row style={styles.container} className="justify-content-center" >
                        <Col style={styles.heading}>Event Name </Col>
                        <Col style={styles.heading}>Role</Col>
                        <Col style={styles.heading}>Details </Col>
                        <Col style={styles.heading}> </Col>
                    </Row>
                    <hr className="divider"/>   

                    {/* Here wil go dynamic UI */}
                    {users.map( ({name, role, details}, index) => {
                        return <Row key={index} style={styles.container}>
                                    <Col style={styles.record}>{name} </Col>
                                    <Col style={styles.record}>{role}</Col>
                                    <Col style={styles.record}>{details} </Col>
                                    <Col><Button variant="link">Edit</Button></Col>
                                </Row>                                   
                    })}
                    <hr className="divider"/>

                </Container>
            </div>
            </>

}
export default UserManagement;