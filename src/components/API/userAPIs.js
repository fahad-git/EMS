import axios from 'axios';
import CheckTokenExpiry, {Base_URL} from './Config';


export function UserDashboardData (){

    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        return axios.get(Base_URL + '/dashboards/user/' + user.user_Id, { headers:AuthorizationHeader })
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}

export function UpcomingEventsData(){
    // const user = JSON.parse(localStorage.getItem("user"));
    // var token = "";
    // if(user)
    //     token = user.token;
    // const AuthorizationHeader = { "Authorization": "Bearer " + token }
    return axios.get(Base_URL + '/events/user');
}

export function AllEventsData(){
    const user = JSON.parse(localStorage.getItem("user"));
    var token = "";
    if(user)
        token = user.token;
    const AuthorizationHeader = { "Authorization": "Bearer " + token }
    return axios.get(Base_URL + '/events/user/' + user.user_Id, { headers:AuthorizationHeader });
}

export function OrganizingEventsData(){
    return CheckTokenExpiry()
    .then(res => {

        const user = JSON.parse(localStorage.getItem("user"));
        var token = ""
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }

        return axios.get(Base_URL + '/events/user/organizing/' + user.user_Id, { headers:AuthorizationHeader })


    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}


export function EventDetailsByID(ID){

    return CheckTokenExpiry()
    .then(res => {

        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/events/user/' + ID, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}

// API for requesting stall
export function RequestForStall(data){
    return CheckTokenExpiry()
    .then(res => {

        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        data["user_Id"] = user.user_Id;
        return axios.post(Base_URL + '/stalls/request', data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}

// API for requesting event
export function RequestForEvent(data){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        data["user_Id"] = user.user_Id;
        return axios.post(Base_URL + '/events/user/request', data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}

export function EventOptions(ID){
    return CheckTokenExpiry()
    .then(res => {

        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/events/user/options/' + ID, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

// Event Video APIS

export function EventVideoById(ID){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/videos/event/' + ID, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}
export function AddVideoInEvent(data){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.post(Base_URL + '/videos/event/add', data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

export function RemoveVideoFromEvent(dataa){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.delete(Base_URL + '/videos/event/remove', { headers:AuthorizationHeader,  data: dataa})
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}


// Event Webinar APIs

export function EventWebinarById(ID){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/webinars/event/' + ID, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}
export function AddWebinarInEvent(data){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.post(Base_URL + '/webinars/event/add', data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

export function RemoveWebinarFromEvent(dataa){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.delete(Base_URL + '/webinars/event/remove', { headers:AuthorizationHeader,  data: dataa})
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

export default null;
