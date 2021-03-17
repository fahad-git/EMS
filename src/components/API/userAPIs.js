import axios from 'axios';
import Base_URL from './Config';


export function UserDashboardData (){
    const user = JSON.parse(localStorage.getItem("user"));
    var token = "";
    if(user)
        token = user.token;
    const AuthorizationHeader = { "Authorization": "Bearer " + token }
    
    return axios.get(Base_URL + '/dashboards/user', { headers:AuthorizationHeader })
}

export function UpcomingEventsData(){
    // const user = JSON.parse(localStorage.getItem("user"));
    // var token = "";
    // if(user)
    //     token = user.token;
    // const AuthorizationHeader = { "Authorization": "Bearer " + token }
    
    return axios.get(Base_URL + '/events/user')
}

export default null;
