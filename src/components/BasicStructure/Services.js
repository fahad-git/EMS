import React from 'react';

// CSS import goes here
import './../../assets/css/BaseComponents.css';

function Services(){

    return  <div className="services">
             
                <h1 className="my-5">Our Services</h1>
             
                <div id="action1" className="ml-3" style={{textAlign:"left", color:"white"}}>
                    <h2 style={{fontWeight:"bold"}}>EMS</h2>
                    <br/>
                        This is an Online event management system software project that serves the functionality of an event manager. The system allows only registered users to login and new users are allowed to resister on the application. This is a web application developed in Asp.net and Sql but desktop application of the same application is also available. The project provides most of the basic functionality required for an event. It allows the user to select from a list of event types. Once the user enters an event type eg(Marriage, Dance Show etc), the system then allows the user to select the date and time of event, place and the event equipment’s. All this data is logged in the database and the user is given a receipt number for his booking. This data is then sent to the administrator (website owner) and they may interact with the client as per his requirements and his contact data stored in the database.
                    <br/>
                </div>
                <div id="action2" style={{textAlign:"left", color:"white"}}>
                    <br/>
                    <h2 style={{ fontWeight:"bold"}} className="ml-3">Advantages</h2>
                       <ul>
                           <li>The system is useful as it calculates an exact cost for all the resources required during the event.</li>
                           <li>The user gets all the resources at a single place instead of wandering around for these.</li>
                           <li>This system is effective and saves time and cost of the users.</li>
                       </ul>
                    <br/>
                </div>
                <div id="action3">
                    <br/>
                        <img alt="N/A" src = "https://www.globaltimes.cn/Portals/0//attachment/2020/2020-03-15/3fd97522-4f5e-47ab-b2f5-e55e7f1cac57.jpeg" />
                    <br/>
                </div>
            </div>
}
export default Services;