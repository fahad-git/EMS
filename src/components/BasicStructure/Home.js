import React from 'react';
import {useHistory} from 'react-router-dom';
import {ButtonGroup, Button} from 'react-bootstrap';
import ReactFullpage from "@fullpage/react-fullpage";

//CSS import goes here
import './../../assets/css/Home.css';

// User defined components goes here
import VideoDemoTile from './VideoDemoTile';
import ImageDemoTile from './ImageDemoTile';
import NavbarFooter from "../HeadersAndFooters/NavbarFooter"
import {imgs, vids} from '../../assets/content/SliderContent';
import Events from './../Events';

function Home(){

    const history = useHistory();

    const onLeave = (origin, destination, direction) => {
        console.log()
      }
    const afterLoad = (origin, destination, direction) => {
        console.log()
      }

    const watchDemoHandler = () => {
        history.push("/home#watchDemo");
        window.location.reload();
    }

    const registerHandler = () =>{
        history.push("/register");
    }

    return <ReactFullpage
        scrollOverflow={true}
        allowScrolling={true}
        autoScrolling= {true}
        verticalCentered={true}
        lockAnchors = {true}
        scrollBar = {true}
        dragAndMove = {true}
        fadingEffect = {true}
        slidesNavigation = {true}
        fitToSection= {true}
        loopBottom= {true}
        licenseKey = {''}
        sectionsColor={[]}
        anchors = {["First", "Second", "events", "watchDemo", "Fourth"]}
        onLeave={onLeave}
        afterLoad={afterLoad}
        render={({ state, fullpageApi }) => {
        return (
            <ReactFullpage.Wrapper>
                <div className="section section1">
                    <div className="home">
                        <h1 className="text-3d">Event Management System</h1>
                        {/* <p>Organize your events online with us!</p> */}
                    
                        <ButtonGroup>
                            <Button onClick={watchDemoHandler} className="mr-3 demo" variant="outline-light" size="lg">Watch Demo</Button>
                            <Button onClick={registerHandler} className="ml-3 register" variant="light" size="lg">Register Now</Button>
                        </ButtonGroup>
                        
                    </div>

                </div>
                <div className="section">
                    {imgs.map((img, index) => (
                        <ImageDemoTile key = {index} img={img}/>
                    ))}
                </div>
                <div className="section">
                   <Events />
                </div>
                <div className="section">
                    {vids.map((vid, index) => (
                        <VideoDemoTile key={index} vid={vid}/>  
                    ))}
                </div>
                <div className="section">
                    <div className="home-footer">
                        <div className="home-footer-content">
                            <h1>We always support you</h1>
                            <p>Organize your virtual events!</p>
                        </div>                    
                        <NavbarFooter/>
                    </div>
                </div>
            </ReactFullpage.Wrapper>
        );
        }}
        />
        

}
export default Home;