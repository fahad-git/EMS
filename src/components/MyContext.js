import React, { useState, useContext, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';


// localStorage.setItem("modalOpen", null);

const MyContext = React.createContext();
const ModalContext = React.createContext();
const HeaderContext = React.createContext();
const UserContext = React.createContext({
    user:{},
    setUser: () => {}
});

export function useUserContext(){
    return useContext(UserContext);
}

//creating custome HOOK
export function useModalContext(){
    return useContext(ModalContext);
}

export function useHeaderContext(){
    return useContext(HeaderContext);
}
// export function useMyContextUpdate(){
//     return useContext(MyContextUpdate);
// }

export function MyProvider({ children }){

    const [state, dispatch] = useReducer(reducer, initialState);

    const [modalOpen, toggleModelOpenHandler] = useState(false);
    const [user, setUserHandler] = useState({});
    const [isBaseHeader, toggleHeaderHandler] = useState();


    // useEffect(() => {
    //     localStorage.setItem("isBaseHeader", isBaseHeader);
    //     console.log("Updated")
    //     console.log(isBaseHeader)
    //   }, [toggleHeader]);
    

    function setUser(user) {
        localStorage.setItem("user", JSON.stringify(user) );
        setUserHandler(user);
    }

    function toggleModelOpen(value){
        toggleModelOpenHandler(value);
        // localStorage.setItem("modalOpen", value);
    }

    function toggleHeader(value){

        toggleHeaderHandler(value);
        localStorage.setItem("isBaseHeader", value);
        // toggleHeaderHandler(prevIsBaseHeader => !prevIsBaseHeader);
    }

    return(
        <UserContext.Provider value={[JSON.parse(localStorage.getItem("user")), setUser]}>
            <ModalContext.Provider value={[modalOpen, toggleModelOpen]}>
                 <HeaderContext.Provider value={[localStorage.getItem("isBaseHeader") === String(true), toggleHeader]}>
                    <MyContext.Provider value={{state, dispatch}}>
                    { children }
                    </MyContext.Provider>
                </HeaderContext.Provider>
            </ModalContext.Provider>
        </UserContext.Provider>
    );
}


export default MyContext;