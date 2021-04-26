import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import {toast } from 'react-toastify';

// CSS import goes here
import 'rc-datepicker/lib/style.css';
import './../assets/css/BaseComponents.css';
import './../assets/css/EventManagement.css';

import { useModalContext,  useHeaderContext, useUserContext } from './MyContext';

// APIs
import { EventOptions, ChangeNames} from './API/userAPIs';
import { RefreshToken } from './API/Auth';


//custome Hooks
function ChangeIconNames(props){
    const ID = props.id;

    var [eventData, setEventData] = useState("");
    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    const forceUpdate = useForceUpdate();

    var [catwalkName, setCatwalkName] = useState()
    var [webinarName, setWebinarName] = useState();
    var [helpdeskName, setHelpDeskName] = useState();
    var [exhibitorName, setExhibitorName] = useState();

    var [disable, setDisable] = useState({
        "video":false,
        "links":false,
        "stalls":false,
        "helpdesk":false
    })
     
    const updateNamesHandler = (col, value) =>{
        
        if(!value || value == "" || value?.trim() == "")
        {
            toast("Update name can not be null",{position:"top-center", type:"warning"});
            return;
        }

        ChangeNames(eventData.eventLobby_Id, {"col":col, "value":value})
        .then(res => {
            disable[col] = true;
            setDisable(disable);
            toast(value + " Updated Successfully",{position:"top-center", type:"info"});
            forceUpdate();
        }).catch(err => {
            toast("Failed to update",{position:"top-center", type:"warning"});
        });
    }

    useEffect(() => {
        EventOptions(ID)
        .then(res => {
            setEventData(res.data[0][0]);
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
                    toggleModelOpen(false);
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
                    toggleModelOpen(false);
                    window.location.reload();
                    history.push("/");
                })
            }
        });

    }, [])
// UPDATE `eventlobby` SET `stalls` = 'Exhibitors' WHERE CONCAT(`eventlobby`.`eventLobby_Id`) = '2';
    return  <>
                <Container>
                    <Form >
                        <Form.Group as={Row} controlId="formBasicEventName">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>{eventData?.video}</Form.Label>
                                <Button variant="link" disabled={disable.video} className="float-right" onClick={() => updateNamesHandler("video", catwalkName )}>Update</Button>
                                <Form.Control disabled={disable.video} name="catwalk" type="text" placeholder="Type here" onChange={e => setCatwalkName(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventHost">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>{eventData?.links}</Form.Label>
                                <Button variant="link" disabled={disable.links} className="float-right" onClick={() => updateNamesHandler("links", webinarName)}>Update</Button>
                                <Form.Control name="eventHost" disabled={disable.links} type="text" placeholder="Type here" onChange={e => setWebinarName(e.target.value) }/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventType">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>{eventData?.stalls}</Form.Label>
                                <Button variant="link" disabled={disable.stalls} className="float-right" onClick={() => updateNamesHandler("stalls", exhibitorName)}>Update</Button>
                                <Form.Control disabled={disable.stalls} name="eventType" type="text" placeholder="Type here" onChange={e => setExhibitorName(e.target.value) } />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEventType">
                            <Col sm={{span:8, offset:2}}>
                                <Form.Label>{eventData?.helpdesk}</Form.Label>
                                <Button variant="link"  disabled={disable.helpdesk} className="float-right" onClick={() => updateNamesHandler("helpdesk", helpdeskName)}>Update</Button>
                                <Form.Control  disabled={disable.helpdesk} name="helpdesk" type="text" placeholder="Type here" onChange={e => setHelpDeskName(e.target.value) } />
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </>
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default ChangeIconNames;