import React, { useEffect }  from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Home from './BasicStructure/Home';
import Services from './BasicStructure/Services';
import AboutUs from './BasicStructure/AboutUs';
import ContactUs from './BasicStructure/ContactUs';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import Dashboard from './Dashboard';
import DashboardUser from './DashboardUser';
import UserManagement from './UserManagement';
import Events from './Events';
import MainLobby from './MainLobby';
import Catwalk from './CatWalk';
import AddVideos from './AddVideos';
import Exhibitors from './Exhibitors';
import ExhibitorStall from './ExhibitorStall';
import Webinar from './Webinar';
import HelpDesk from './HelpDesk';
import Setting from './Setting';
import NavbarHeader from '../components/HeadersAndFooters/NavbarHeader';
import DashboardHeader from '../components/HeadersAndFooters/DashboardHeader';

import { useHeaderContext, useUserContext } from './MyContext';
import NavbarFooter from './HeadersAndFooters/NavbarFooter';

import AddUser from './AddUser';
import OrganizeEvents from './OrganizingEvent';

// import { RefreshToken } from './components/API/Auth';

function Main(){

    const [isBaseHeader, toggleHeader] = useHeaderContext();
    // const isBaseHeader = localStorage.getItem("isBaseHeader");
    
    const history = useHistory();
    const [user, setUser] = useUserContext();

    // useEffect(() => {
  
    //   if(user){
    //     setInterval(  
    //       () => {
    //           console.log(user.tokenExpiry)
    //         let expiry = new Date(user.tokenExpiry);
    //         let current = new Date();
    //         current.setSeconds(current.getSeconds())
    //         console.log(expiry , " : " , current);  
    //         if(current > expiry){
    //             console.log("Refresh Token");
    //         }
    //         else{
    //             console.log("Same")
    //         }
    //       },  
    //       1000  
    //     );  
    //   }
    // }, []) 

    useEffect(()=>{
        const paths = ["/home", "/services", "/aboutUs", "/contactUs"]
        if(!user &&  !paths.includes(window.location.pathname)){
            toggleHeader(true);
            history.push('/');
        }
    },[]);

    return <> 
            {isBaseHeader ? <NavbarHeader/> : <DashboardHeader/> }

                <Switch>
                    <Route path='/home'><Home /></Route>
                    <Route path='/aboutUs'><AboutUs /></Route>
                    <Route path='/services'> <Services /> </Route>
                    <Route path='/contactUs'> <ContactUs /> </Route>
                    <Route path='/register'> <Register /> </Route>
                    <Route path='/forget-password'> <ForgetPassword /> </Route>
                    <Route path='/dashboard'> <Dashboard /> </Route>
                    <Route path='/main-lobby/:ID/user-management'> <UserManagement /> </Route>
                    <Route path='/events'> <Events /> </Route>
                    <Route exact path='/main-lobby/:ID'> 
                        <MainLobby /> 
                    </Route>
                    <Route exact path='/main-lobby/:ID/catwalk'> <Catwalk /> </Route>
                    <Route path='/main-lobby/:ID/catwalk/add-videos'> <AddVideos /> </Route>

                    <Route exact path='/main-lobby/:ID/exhibitors'> <Exhibitors /> </Route>
                    <Route exact path='/main-lobby/:ID/webinar'> <Webinar /> </Route>
                    <Route exact path='/main-lobby/:ID/help-desk'> <HelpDesk /> </Route>
                    <Route exact path='/main-lobby/:ID/exhibitors/exhibitor-stall'> <ExhibitorStall /> </Route>
                    <Route path='/settings'> <Setting /> </Route>
                    <Route path='/user-dashboard'><DashboardUser /></Route>
                    <Route path='/organize-events'><OrganizeEvents /></Route>
                    
                    <Redirect to="/home" />
                </Switch>
            </>
}
export default Main;