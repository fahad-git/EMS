import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import {Container, Row, Col, Button, Carousel} from "react-bootstrap";
import StallCarousel from "./StallCarousel";

import { ToastContainer, toast } from "react-toastify";
import { ProductInformation } from "./../API/userAPIs";

import { useModalContext, useUserContext, useHeaderContext } from './../MyContext';
import { RefreshToken } from './../API/Auth';
import AddProduct from "./AddProduct";
import Product from "./Product";
import DynamicModal from "./../DynamicModal";


function Products(props){

    const styles = {
        container:{
            minHeight:"100vh",
            width:"100vw"
        },
    }
    
    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [user, setUser] = useUserContext();
    const [header, toggleHeader] = useHeaderContext();
    const [content, setContent] = useState();

    const moreDetails = (product) => {
        setContent({
            "header":product.name,
            "component":<Product item = {product}/>,
            "footer":""
        })
        toggleModelOpen(true)
      }
    

    const addProductHandler = () => {
        setContent({
            "header":"Add New Product",
            "component":<AddProduct />,
            "footer":""
        })
        toggleModelOpen(true)
    }

    var [stallProducts, setStallProducts] = useState([]);

    useEffect(() => {
        ProductInformation(props.data.stall_Id)
            .then(res => {
                console.log("working")
                console.log(res.data)
                setStallProducts(res.data);
            })
            .catch(err => {
                if(err.message === "INVALID"){
                    toast("Please login to access events", {
                        type:"error",
                        });
                }else if(err.message === "EXPIRED"){
                    toast("You must login first", {
                        type:"warning",
                        });
                        localStorage.clear();
                        toggleHeader(true);
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
                        window.location.reload();
                        history.push("/");
                    })
                }else{
                    toast("Unexpected error. Please try again later", {type: "error", autoClose: 4000})
                }
            })
    }, [modalOpen]);

    return  <>
                {modalOpen ? <DynamicModal content={content} /> : <></>}
                <Container style={styles.container}>
                    <Row className="mt-5">
                        <Col>
                            <h1>Products</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="secondary" className="float-right mx-5" onClick={addProductHandler}>Add New Product</Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <StallCarousel data= {stallProducts} moreDetails = {moreDetails} />
                        </Col>
                    </Row>
                </Container>
            </>

}
export default Products;