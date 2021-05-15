import axios from 'axios';
import CheckTokenExpiry, {Base_URL} from './Config';

export function AllEventRequestForAdmin(){
    return CheckTokenExpiry()
    .then(res => {        
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        return axios.get(Base_URL + '/events/admin', { headers:AuthorizationHeader });
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}

export function UpdateEventRequestForAdmin(data, roleId){
    return CheckTokenExpiry()
    .then(res => {        
        const user = JSON.parse(localStorage.getItem("user"));
        var token = "";
        if(user)
            token = user.token;
        const AuthorizationHeader = { "Authorization": "Bearer " + token }
        return axios.put(Base_URL + '/events/admin/' + roleId, data, { headers:AuthorizationHeader });
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(new Error(err));
        })
    } );
}
