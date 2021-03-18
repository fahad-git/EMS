import axios from 'axios';
import CheckTokenExpiry, {Base_URL} from './Config';


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

export function OrganizingEventsData(){
    // const user = JSON.parse(localStorage.getItem("user"));
    // var token = "";
    // if(user)
    //     token = user.token;
    // const AuthorizationHeader = { "Authorization": "Bearer " + token }
    
    return CheckTokenExpiry()
    .then(res => {

        const user = JSON.parse(localStorage.getItem("user"));
        var token = ""
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }

        return axios.get(Base_URL + '/events/user/organizing', { headers:AuthorizationHeader })


    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}


export default null;
