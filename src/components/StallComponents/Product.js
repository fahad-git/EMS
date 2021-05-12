import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

function Product(props){

    const styles = {
        img:{
            width: '20rem',
            height: '17rem',
        }
    }

    return  <>
                <Container>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.item.image1}
                        style={styles.img}
                        alt="First slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.item.image2}
                        style={styles.img}
                        alt="First slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.item.image3}
                        style={styles.img}
                        alt="First slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={props.item.image4}
                        style={styles.img}
                        alt="First slide"
                        />
                    </Carousel.Item>

                </Carousel>
    
                <Row className="my-2">
                    <Col>
                        <b>Product ID:</b> 
                    </Col>
                    <Col >
                        {props.item.product_Id}
                    </Col>
                </Row>

                <Row className="my-2">
                    <Col >
                        <b>Status:</b> 
                    </Col>
                    <Col >
                        {props.item.status}
                    </Col>
                </Row>

                <Row className="my-2">
                    <Col >
                        <b>Price:</b> 
                    </Col>
                    <Col >
                        {props.item.price}
                    </Col>
                </Row>

                <Row className="my-2">
                    <Col >
                        <b>Company:</b> 
                    </Col>
                    <Col >
                        {props.item.company}
                    </Col>
                </Row>

                <Row className="my-2">
                    <Col >
                        <b>Description:</b>
                        <br/>
                        {props.item.description}
                    </Col>
                </Row>
                </Container>
            </>

}
export default Product;