import axios from 'axios';
import {Base_URL} from './Config';


export function Authenticate (credentials){

    // let buff = new Buffer.from(username + ":" +password);
    // let base64data = buff.toString('base64');
    // let header = {
    //     'authorization':"Basic " + base64data
    // }
    // console.log(header);
    return axios.post(Base_URL + '/users/login', credentials)
}

export function RegisterUser(user){
    return axios.post(Base_URL + '/users/signup', user);
}

export function RefreshToken (){
    const user = JSON.parse(localStorage.getItem("user"));
    var token = ""
    if(user)
        token = user.token;
    const AuthorizationHeader = { "Authorization": "Bearer " + token }
     
    return axios.get(Base_URL + '/users/token',  { headers:AuthorizationHeader } )
}

export function CheckUsernameAvailability(value){
    return axios.post(Base_URL + '/users/check-username', {"username" : value} );
}

export function Logout (){
    const user = JSON.parse(localStorage.getItem("user"));
    var token = ""
    if(user)
        token = user.token;
    const AuthorizationHeader = { "Authorization": "Bearer " + token }
    
    return axios.get(Base_URL + '/users/logout', { headers:AuthorizationHeader })
}


export default null;
