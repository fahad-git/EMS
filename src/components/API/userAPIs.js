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
        
        return axios.get(Base_URL + '/events/details/' + ID, { headers:AuthorizationHeader })
  
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
    console.log(data)
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

// Stalls
// Event Webinar APIs

export function EventStallsById(ID){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/stalls/event/' + ID, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}
export function AddStallInEvent(data){
    console.log(data)
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

export function ExplicitlyAddStallInEvent(data){
    console.log(data)
    return CheckTokenExpiry()
    .then(res => {  
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.post(Base_URL + '/stalls/event/add', data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

// Categories

export function StallCategories(){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/stalls/categories', { headers:AuthorizationHeader})
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}


export function EventCategories(){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/events/categories', { headers:AuthorizationHeader})
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}


export function ChangeNames(id, data){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.put(Base_URL + '/events/user/options/' + id, data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}
export function CheckUserAvailable(id){
    const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/stalls/users/' + id, { headers:AuthorizationHeader })
}

export function BlockStallFromEvent(stallId){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.put(Base_URL + '/stalls/block/' + stallId, {}, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

export function GetStallByStallId(stallId){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.get(Base_URL + '/stalls/stall/' + stallId, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}


export function SendEmailToStallOwner(data){
    return CheckTokenExpiry()
    .then(res => {
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        
        return axios.post(Base_URL + '/stalls/email', data, { headers:AuthorizationHeader })
  
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );

}

export default null;
