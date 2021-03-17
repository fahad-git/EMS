import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

// CSS imports

//User Defined Components imports
import DynamicModal from '../DynamicModal';
//Styles
import { useHeaderContext, useUserContext } from '../MyContext';
import { Logout } from '../API/Auth';

const styles = {
  align:{
    textAlign:"left"
  }
}

function DashboardHeader(){

  const history = useHistory();
  const [content, setContent] = useState();
  const [isBaseHeader, toggleHeader] = useHeaderContext();
  const [user, setUser] = useUserContext();

  const logoutHandler = () => {
    console.log("Logout")
      localStorage.clear();
      toggleHeader(true);
      window.location.reload();
      history.push("/");
    // Logout()
    // .then(res => {
    //   localStorage.clear();
    //   toggleHeader(true);
    //   history.push("/");
    // })
    // .catch(err => {
    //   localStorage.clear();
    //   console.log(err);
    //   toggleHeader(true);s
    //   history.push("/");
    // })
   
  }


  const renderHeaderOptions = () => {
    console.log(user)
    if(user && user.role == "admin"){
      return [
        <Nav.Link className="ml-4" key="link-1" href="/main-lobby">Main Lobby</Nav.Link>,
        <Nav.Link className="ml-4" key="link-2" href="/user-management">Users</Nav.Link>,
        <Nav.Link className="ml-4" key="link-3" href="/events">Events</Nav.Link>,
        <Nav.Link className="ml-4" key="link-4" href="/settings">Settings</Nav.Link>
      ]
    }else{
      return[
        <Nav.Link className="ml-4" key="link-1" href="/user-dashboard">Dashboard</Nav.Link>,
        <Nav.Link className="ml-4" key="link-2" href="/settings">Profile</Nav.Link>,
        <Nav.Link className="ml-4" key="link-3" href="/events">Events</Nav.Link>,
        <Nav.Link className="ml-4" key="link-3" href="/organize-events">Organize Events</Nav.Link>
      ]
    }
  }

return  <Navbar collapseOnSelect expand="md" bg="transparent" variant="dark" sticky='top' className="App-header">
          <Navbar.Brand ><img src={logo} alt="EMS"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" style={styles.align}>
              {renderHeaderOptions()}
              <Nav.Link className="mx-4" href="#logout" onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
}

export default DashboardHeader;