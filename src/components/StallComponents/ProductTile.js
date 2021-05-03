import React from "react";
import {Container, Row, Col, Button, Image, Card} from "react-bootstrap";
import "./../../assets/css/Carousel.css";

function ProductTile(props){


    const tileClass = () => {
        if(props.selected)
            return "ml-5 event-item-selected";
        else
            return "ml-5 event-items";
    }

    return  <>
            <div className="carousel">
            <Card style={{ width: '18rem' }} className={tileClass()}>
                <Card.Img variant="top" src="https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg" />
                <Card.Body>
                    <Card.Title>Card Title {props.item}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </div>
            </>
}
export default ProductTile;