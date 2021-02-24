import React from 'react';
import {Card} from 'react-bootstrap';

const styles = {
    width:"50px",
    height:"50px",
}

const BgStyle = {
    background: "url('./../assets/images/backgroundImg2.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color:"white"
}

function FooterTile(props){
    return <Card style={BgStyle}>
                <Card.Img variant="top" src={props.content.source} style={styles}/>
                <Card.Body>
                    <Card.Title>{props.content.title}</Card.Title>
                    <Card.Text>
                        {props.content.text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">{props.content.footerText}</small>
                </Card.Footer>
            </Card>

}
export default FooterTile;