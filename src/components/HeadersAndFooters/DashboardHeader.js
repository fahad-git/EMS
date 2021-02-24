import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

// CSS imports

//User Defined Components imports
import DynamicModal from '../DynamicModal';
//Styles
import { useHeaderContext } from '../MyContext';

const styles = {
  align:{
    textAlign:"left"
  }
}

function DashboardHeader(){

  const history = useHistory();
  const [content, setContent] = useState();
  const [isBaseHeader, toggleHeader] = useHeaderContext();

  const logoutHandler = () => {
    toggleHeader(true);
    history.push("/home");
  }

return  <Navbar collapseOnSelect expand="md" bg="transparent" variant="dark" sticky='top' className="App-header">
          <Navbar.Brand ><img src={logo} alt="EMS"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" style={styles.align}>
              <Nav.Link className="ml-4" href="/main-lobby">Main Lobby</Nav.Link>
              <Nav.Link className="ml-4" href="/user-management">Users</Nav.Link>
              <Nav.Link className="ml-4" href="/events">Events</Nav.Link>
              <Nav.Link className="ml-4" href="/settings">Settings</Nav.Link>
              <Nav.Link className="mx-4" href="#logout" onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
}

export default DashboardHeader;