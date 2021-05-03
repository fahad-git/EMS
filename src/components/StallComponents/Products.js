import React from "react";
import {Container, Row, Col, Button, Carousel} from "react-bootstrap";
import StallCarousel from "./StallCarousel";

function Products(props){

    const styles = {
        container:{
            minHeight:"100vh",
            width:"100vw"
        },
    }

    return  <>
                <Container style={styles.container}>
                    <Row className="mt-5">
                        <Col>
                            <h1>Catalogues</h1>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <StallCarousel data= {[1, 2, 3, 4, 5, 6, 7, 8]}/>
                        </Col>
                    </Row>
                </Container>
            </>

}
export default Products;