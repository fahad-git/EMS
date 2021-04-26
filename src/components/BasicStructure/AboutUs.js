import React from 'react';
import {Button} from 'react-bootstrap';

// CSS import goes here
import './../../assets/css/BaseComponents.css';

function AboutUs(){


    return  <div>
                <div className="services">
                    <h1 className="mt-5">About Us</h1>
                        <p>Event Management System</p>
                        <div className="ml-3" style={{textAlign:"left", color:"white"}}>
                            <br/>
                                This is an Online event management system software project that serves the functionality of an event manager. The system allows only registered users to login and new users are allowed to resister on the application. This is a web application developed in Asp.net and Sql but desktop application of the same application is also available. The project provides most of the basic functionality required for an event. It allows the user to select from a list of event types. Once the user enters an event type eg(Marriage, Dance Show etc), the system then allows the user to select the date and time of event, place and the event equipment’s. All this data is logged in the database and the user is given a receipt number for his booking. This data is then sent to the administrator (website owner) and they may interact with the client as per his requirements and his contact data stored in the database.
                            <br/>
                        </div>
                </div>
            </div>
}
export default AboutUs;