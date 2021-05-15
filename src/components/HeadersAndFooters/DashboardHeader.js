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
    if(user && user.userType == "Admin"){
      return [
        // /user-management
        // /settings
        // /dashboard
        <Nav.Link className="ml-4" key="nav-link-1" href="/admin/events">Dashboard</Nav.Link>,
        <Nav.Link className="ml-4" key="nav-link-2" href="/admin/events">Users</Nav.Link>,
        <Nav.Link className="ml-4" key="nav-link-3" href="/admin/events">Events</Nav.Link>,
        <Nav.Link className="ml-4" key="nav-link-4" href="/admin/events">Settings</Nav.Link>
      ]
    }else{
      return[
        <Nav.Link className="ml-4" key="nav-link-1" href="/user-dashboard">Dashboard</Nav.Link>,
        <Nav.Link className="ml-4" key="nav-link-2" href="/settings">Profile</Nav.Link>,
        <Nav.Link className="ml-4" key="nav-link-3" href="/events">Events</Nav.Link>,
        <Nav.Link className="ml-4" key="nav-link-4" href="/organize-events">Organize Events</Nav.Link>
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