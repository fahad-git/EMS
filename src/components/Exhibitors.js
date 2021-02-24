import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Image, Button,Nav } from 'react-bootstrap'
import stall from './../assets/images/stall.png';

import { ModalContext, useModalContext } from './MyContext';
import DynamicModal from './DynamicModal';

import './../assets/css/BaseComponents.css';
import AddStall from './AddStall';

const exhibitors = [{
    "name": "Exhibitor 1",
    "img":stall
},{
    "name": "Exhibitor 2",
    "img":stall
},{
    "name": "Exhibitor 3",
    "img":stall
},{
    "name": "Exhibitor 4",
    "img":stall
},{
    "name": "Exhibitor 5",
    "img":stall
},{
    "name": "Exhibitor 6",
    "img":stall
},{
    "name": "Exhibitor 7",
    "img":stall
},{
    "name": "Exhibitor 8",
    "img":stall
}
]

const styles = {
    stall:{
        width: "calc(100px + 3vmin)",
        height: "calc(100px + 3vmin)"
    },
    stallContainer:{
        cursor: "pointer"
    },
    main:{
        minHeight:"80vh"
    },
    align:{
        textAlign:"left",
    },
    sidebar:{
        textAlign:"left",
        color:"white"
    }
}

function Exhibitors(){

    const history = useHistory();

    const [modalOpen, toggleModelOpen] = useModalContext();
    const [content, setContent] = useState();


    const addStallHandler = () => {
        let cont = {
            header:"Add New Stall",
            component:<AddStall/>,
            footer:""
          }
        setContent(cont);
        toggleModelOpen(true);
        
    }    

    const exhibitorStallHandler = () => {
        history.push("/exhibitor-stall");
    }

    return  <>
                {modalOpen?  <DynamicModal content={content} />: ''}
            <hr/>
                <Row style={styles.main}>
                    <Col sm="3" className="sidebar">
                        <h3 style={styles.sidebar}>Exhibitors</h3>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#aboutUs">Daily Wear</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#contactUs">Holiday Dresses</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Accessaries</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Communion Dresses</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Exhibitors</Nav.Link>
                        <hr />
                        <Nav.Link style={styles.align} className="sidebar-item ml-4" href="#login" >Weddings</Nav.Link>
                    </Col>
                    <Col sm="9"> 
                        <Container>       
                            <Row>
                                <Col>
                                    <h2 className='float-left' style={styles.align}>Daily Wear</h2>
                                    <Button className='float-right' onClick={addStallHandler} variant='secondary'>
                                        Add Stall
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                {exhibitors.map(({name, img})=>(
                                    <Col onClick={exhibitorStallHandler} style={styles.stallContainer}>
                                        <Image src={img} style={styles.stall}/>
                                        <p>{name}</p>
                                    </Col>                        
                                ))}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </>

}
export default Exhibitors;