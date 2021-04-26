import React from 'react';

// CSS import goes here
import './../../assets/css/BaseComponents.css';

function ContactUs(){

    return  <div>
                <div className="services">
                    <h1 className="mt-5">Contact Us</h1>
                    <p>Event Management System Contacts</p>

                    <div className="ml-2" style={{textAlign:"left", color:"white"}}>
                        <h2 style={{ fontWeight:"bold"}}>Head Office</h2>
                        NevonSolutions (Mumbai) – Head Office <br/>
                        710, Nevon Solutions Pvt. Ltd,<br/>
                        7th Floor, Vihan Complex,<br/>
                        Sonawala Road, Goregaon East,<br/>
                        Mumbai 400063,<br/>
                        Maharashtra, India.<br/>
                    </div>
                    <br/>
                    <div className="ml-5" style={{textAlign:"left", color:"white"}}>
                        <h2 style={{ fontWeight:"bold"}}>Side Office</h2>
                        NevonSolutions (Mumbai) – Manufacturing Unit <br/>
                        C4, Laghu Udyog,<br/>
                        IB Patel Road, Goregaon East,<br/>
                        Behind Petrol Pump,<br/>
                        Off Western Express Highway.<br/>
                        Mumbai 400063.<br/>
                    </div>
                </div>
            </div>
}
export default ContactUs;