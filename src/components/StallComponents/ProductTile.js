import React, {useState} from "react";
import {Container, Row, Col, Button, Image, Card} from "react-bootstrap";
import "./../../assets/css/Carousel.css";
import TextEllipsis from 'react-text-ellipsis';

const styles = {
    img:{
        width: '18rem',
        height: '10rem',
    },
    des:{
        width: '100%',
        height: '6rem',
    }

}

function ProductTile(props){


    const tileClass = () => {
        if(props.selected)
            return "ml-5 event-item-selected";
        else
            return "ml-5 event-items";
    }

    return  <>
            <div className="carousel">
            <Card style={{ width: '18rem' , height: '25rem' }} className={tileClass()}>
                <Card.Img variant="top" style={styles.img} src={props.item.image1} />
                <Card.Body>
                    <Card.Title >{props.item.name}</Card.Title>
                    <Card.Text className="text-left"><b>Price: €{props.item.price}</b></Card.Text>
                        <div style={styles.des}>
                        <TextEllipsis 
                            lines={3} 
                            tag={'p'} 
                            ellipsisChars={'...'} 
                            tagClass={'className'} 
                            debounceTimeoutOnResize={200} 
                            useJsOnly={true} 
                            onResult={(result) => { 
                                if (result === TextEllipsis.RESULT.TRUNCATED)
                                    console.log();
                                // console.log('text get truncated');
                                else 
                                    console.log();
                                // console.log('text does not get truncated');
                                }}>
                                {props.item.description}
                        </TextEllipsis>
                        </div>
                    <Button variant="dark" className="align-bottom" style={styles.btn}  onClick={props.onChange}>More</Button>
                </Card.Body>
            </Card>
            </div>
            </>
}
export default ProductTile;