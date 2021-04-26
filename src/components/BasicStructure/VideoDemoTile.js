import React from 'react';
import {Carousel} from 'react-bootstrap';

// CSS import goes here
import './../../assets/css/BaseComponents.css';

function VideoDemoTile(props){

    const vid = props.vid;

    return  <div className="services">
                <Carousel>
                    <Carousel.Item>
                        <iframe title={vid.title} 
                            style = {{width:"90%", height:"80vh"}}
                            src={vid.src} 
                            frameBorder="0" 
                            allowFullScreen>
                        </iframe>
                          
                        {/* <Carousel.Caption>
                            <h3>{vid.title}</h3>
                            <p>{vid.caption}</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>    
                </Carousel>
            </div>
}
export default VideoDemoTile;