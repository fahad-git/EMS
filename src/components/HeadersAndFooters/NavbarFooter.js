import React from 'react';
import {CardGroup, Row} from 'react-bootstrap';

// CSS imports

//User Defined Components imports
import FooterTile from './FooterTile';
import footerContent from '../../assets/content/FooterContent';
//Styles

//constants goes here
import { useUserContext } from '../MyContext';


function NavbarFooter(){

    const [user, setUser] = useUserContext();

    return  <>
    {/* <Row style={{minHeight:"10vh"}}></Row> */}
    <div className="App-footer">
                <CardGroup >
                {footerContent.map((content,index) => {
                    return <FooterTile key={index} content={content} />
                })} 
                </CardGroup>
            </div>
            </>
}
export default NavbarFooter;