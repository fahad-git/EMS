import React, { useState } from 'react';
import logo from './../../assets/images/logo.png';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

// CSS imports

//User Defined Components imports
import DynamicModal from '../DynamicModal';
import Login from '../Login';
//Styles
import { useModalContext } from '../MyContext';


function NavbarHeader(){

  const [content, setContent] = useState();

  const [modalOpen, toggleModelOpen] = useModalContext();

  const loginHandler = () => {
    let cont = {
      header:"Login",
      component:<Login/>,
      footer:""
    }
    setContent(cont);
    toggleModelOpen(true);
  }

return  <Navbar collapseOnSelect expand="md" bg="transparent" variant="dark" sticky='top' className="App-header">
          <Navbar.Brand ><img src={logo} alt="EMS"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link  href="/home">Home</Nav.Link>
              <Nav.Link className="ml-4" href="#events">Events</Nav.Link>

              <NavDropdown className="ml-4" title="Services" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/services" className="item-color">Services</NavDropdown.Item>
                <NavDropdown.Item href="/services#action1" className="item-color">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/services#action2" className="item-color">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/services#action3" className="item-color">Separated link</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="ml-4" href="/aboutUs">About Us</Nav.Link>
              <Nav.Link className="ml-4" href="/contactUs">Contact Us</Nav.Link>
              <Nav.Link className="mx-4" href="#login" onClick={loginHandler}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {modalOpen?  <DynamicModal content={content} />: ''}

        </Navbar>
}

export default NavbarHeader;