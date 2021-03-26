import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DynamicModal from './DynamicModal';

import { useModalContext } from "./MyContext";

import AddVideoForm from "./AddVideoForm";

const videos = [
    {
        catwalk:"https://www.youtube.com/embed/I5HzV76t01c",
        title:"VEMINA CITY CATWALK CPM Moscow Fall 2016 2017 by Fashion Channel",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        catwalk:"https://www.youtube.com/embed/7ccefq8s7eU",
        title:"Evolving Trends in Runway Fashion - 2017 to 2018 Spring-Summer Seasons",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        catwalk:"https://www.youtube.com/embed/-PtDp5C6QB4",
        title:"Evolving Trends in Runway Fashion - 2018 to 2019 Spring-Summer Seasons",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
]


const styles = {
    container:{
        textAlign:"left",
        padding:"0px 50px"
    }
}

function AddVideos() {

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [content, setContent] = useState();
    const history = useHistory()

    const addVideoHandler = () => {
            let cont = {
                header:"ADD VIDEOS",
                component:<AddVideoForm />,
                footer:""
            }
            setContent(cont);
            toggleModelOpen(true);
    }
    
    const viewVideoHandler = () => {
        history.goBack();
    }

    

    return  <>
            {    modalOpen ? <DynamicModal content={content} /> : <></> }
            <div className="dashboard">
                <Container style={styles.container}>
                    <Row>
                        <Col>
                            <Button className="mb-5 float-right" variant="secondary" onClick={ viewVideoHandler }>View</Button>
                            <Button className="mb-5 float-right" split variant="secondary" onClick={ addVideoHandler }>ADD Video</Button>
                        </Col>
                    </Row>
                    {
                    videos.map( ({ catwalk, title, description}, index) => (
                    <Row key={index} className="mb-5">
                        <Col className="event-items">
                            <Row><Col>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            </Col></Row>
                            <Row>
                            <Col sm={8} >
                                <p>Link: <a href={catwalk} >{catwalk}</a></p>
                            </Col>
                            <Col sm={4}>
                                <Button className="mt-2 float-right" variant="secondary" onClick={ addVideoHandler }>Remove</Button>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                    ))
                    }
                </Container>
            </div>
            </>
}
export default AddVideos;