// import history, { useHistory } from 'react-router-dom';
// import { useHeaderContext, useUserContext } from '../MyContext';

// export const Base_URL = "http://localhost:8000";

export const Base_URL = "http://3.10.211.165:8000";

function CheckTokenExpiry () {
    // const history = useHistory()
    // const [isBaseHeader, toggleHeader] = useHeaderContext();

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){

        return new Promise((resolve, reject) => {
            reject("INVALID")
        })
    }

    let expiry = new Date(user.tokenExpiry);
    let current = new Date();
    if(current > expiry){
        return new Promise((resolve, reject) => {
            reject("EXPIRED")
        })
                
    }else if(current.setSeconds(current.getSeconds() + 600) > expiry){
        console.log("Refresh")
        return new Promise((resolve, reject) => {
            reject("REFRESH")
        })
    }else return new Promise((resolve, reject) => {
        resolve("OK");
    });
}



export default CheckTokenExpiry;