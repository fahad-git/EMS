import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import { Container, Form, Row, Col, Button, Image } from "react-bootstrap";
import { toast } from "react-toastify"
import { useUserContext, useModalContext, useHeaderContext } from "./../MyContext";
import { AddProductInformation } from "./../API/userAPIs";
import { RefreshToken } from "./../API/Auth";

import "./../../assets/css/FormStyles.css";

function AddProduct(){

    const styles = {
        img:{
            maxWidth: '18rem',
            maxHeight: '10rem',
        }
    }

    const { register, errors, handleSubmit, formState } = useForm()
    const history = useHistory();
    const [modalOpen, toggleModelOpen] = useModalContext();
    const [isBaseHeader, toggleHeader] = useHeaderContext();
    const [user, setUser] = useUserContext();

    var [disableFields, setDisableFields] = useState(false);
    var [img1, setImg1] = useState("");
    var [img2, setImg2] = useState("");
    var [img3, setImg3] = useState("");
    var [img4, setImg4] = useState("");

    const onSubmit = data => {
        delete data["img1"]
        delete data["img2"]
        delete data["img3"]
        delete data["img4"]

        data["status"] = "Available";

        var arr = history.location.pathname.split("/");
        var Ids = [];
        for(let i of arr)
            if(!Number.isNaN(parseInt(i))){
                Ids.push(parseInt(i));
            }
        console.log(Ids)
        if(Ids == []){
            history.goBack();
            return;
        }
        try{
            // IDs["eventId"] = Ids[0];
            data["stall_Id"] = Ids[1];
        }catch(e){
            history.goBack();
            return;
        }

        let imgs = {
            "image1":img1,
            "image2":img2,
            "image3":img3,
            "image4":img4,
        }
        data["imgs"] = imgs;
        console.log(data);


        AddProductInformation(data)
        .then(res => {
           toast("Product Added Successfully", {type:"info", onClose: () => toggleModelOpen(!modalOpen) })
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
    }

    const pictureHandler = (event, setterMethod) => {
        console.log("working")
        let file = event.target.files[0]
        if(!file)
            return
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        if(file.size > 3200000){
            toast("File is too large! max file size limit is 2 MB", {type:"error"})
            return;
        }
        reader.onloadend = function (e) {
            setterMethod(reader.result)
        }
    }

    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>                   
                        <Form.Group as={Row} controlId="formBasicName">
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.Control name="name" disabled={disableFields} type="text" placeholder="Product Name" ref={register({required: true, minLength:3  })} />
                                    {errors.name?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                    {errors.name?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicType">
                            <Col sm={{span:12, offset:0}}>
                            {/* <Form.Label block>Password</Form.Label> */}
                                <Form.Control name="type" disabled={disableFields} type="text" placeholder="Product Type" ref={register({required: true, minLength:3  })} />
                                    {errors.type?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                    {errors.type?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPrice">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.Control name="price" disabled={disableFields} type="text" placeholder="Price in Euro ex. 200" ref={register({required: true })} />
                                    {errors.price?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicCompany">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.Control name="company" disabled={disableFields} type="text" placeholder="Company" ref={register({required: true, minLength:3  })} />
                                    {errors.company?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                    {errors.company?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicDescription">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.Control name="description" disabled={disableFields} as ="textarea" rows={4} type="text" placeholder="Description" ref={register({required: true, minLength:3  })} />
                                    {errors.description?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                                    {errors.description?.type === "minLength" && <div className="err">{"Your input is less than minimum length"} </div> }                             
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} controlId="formBasicImage1">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input onChange={e => pictureHandler(e, setImg1)} isValid name="img1" ref={register({require:true})} />
                                    <Form.File.Label data-browse="Image 1">
                                        Upload Image
                                    </Form.File.Label>
                                    <Form.Control.Feedback type="valid">Image</Form.Control.Feedback>
                                </Form.File>
                                    {  <Image src = {img1} style = {styles.img}  alt="Image preview" />}
                                    {errors.img1?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicImage2">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input onChange={e => pictureHandler(e, setImg2)} isValid name="img2" ref={register({require:true})} />
                                    <Form.File.Label data-browse="Image 3">
                                            Upload Image
                                    </Form.File.Label>
                                    <Form.Control.Feedback type="valid">Image</Form.Control.Feedback>
                                </Form.File>
                                {<Image src = {img2} style = {styles.img} alt="Image preview" />}
                                {errors.img2?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicImage3">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input onChange={e => pictureHandler(e, setImg3)} isValid name="img3" ref={register({require:true})} />
                                    <Form.File.Label data-browse="Image 2">
                                        Upload Image
                                    </Form.File.Label>
                                    <Form.Control.Feedback type="valid">Image</Form.Control.Feedback>
                                </Form.File>
                                {<Image src = {img3} style = {styles.img} alt="Image preview" />}
                                {errors.img3?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicImage4">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Col sm={{span:12, offset:0}}>
                                <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input onChange={e => pictureHandler(e, setImg4)} isValid name="img4" ref={register({require:true})} />
                                    <Form.File.Label data-browse="Image 4">
                                        Upload Image
                                    </Form.File.Label>
                                    <Form.Control.Feedback type="valid">Image</Form.Control.Feedback>
                                </Form.File>
                                {<Image src = {img4} style = {styles.img} alt="Image preview" />}
                                {errors.img4?.type === "required" && <div className="err">{"This field is mandatory."} </div> }
                            </Col>
                        </Form.Group>                        

                        <Row className="mt-3">
                            <Col sm={{span:12, offset:0}}>
                                <Button size="lg" variant="dark" type="submit" block>
                                    Add
                                </Button>
                            </Col>
                        </Row>

                    </Form>

                </Container>
            </>
}
export default AddProduct;