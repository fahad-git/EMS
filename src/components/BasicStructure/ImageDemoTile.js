import React from 'react';
import {Carousel} from 'react-bootstrap';

// CSS import goes here
import './../../assets/css/BaseComponents.css';

function ImageDemoTile(props){

    const img = props.img;

    return  <div className="services">

                <Carousel>
                    <Carousel.Item>
                    <img
                    className="d-block w-100"
                    style = {{width:"90vh", height:"90vh"}}
                    src={img.src}
                    alt={"Not found!"}
                    />
                    <Carousel.Caption>
                    <h3>{img.title}</h3>
                    <p>{img.caption}</p>
                    </Carousel.Caption>
                </Carousel.Item>    
                </Carousel>
            </div>
}
export default ImageDemoTile;