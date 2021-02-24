import React, { useState, useContext, useEffect } from 'react';

localStorage.setItem("modalOpen", null);

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
    const [modalOpen, toggleModelOpenHandler] = useState(false);
    const [user, setUserHandler] = useState({});
    const [isBaseHeader, toggleHeaderHandler] = useState(true);


    // useEffect(() => {
    //     localStorage.setItem("isBaseHeader", isBaseHeader);
    //     console.log("Updated")
    //     console.log(isBaseHeader)
    //   }, [toggleHeader]);
    
    function setUser(value) {
        localStorage.setItem("user", user);
        setUserHandler(value);
    }

    function toggleModelOpen(value){
        localStorage.setItem("modalOpen", value);
        toggleModelOpenHandler(value);
    }

    function toggleHeader(value){
        localStorage.setItem("isBaseHeader", value);
        // toggleHeaderHandler(prevIsBaseHeader => !prevIsBaseHeader);
        toggleHeaderHandler(value);
    }

    return(
        <UserContext.Provider value={[localStorage.getItem("user"), setUser]}>
            <ModalContext.Provider value={[localStorage.getItem("modalOpen") == String(true), toggleModelOpen]}>
                <HeaderContext.Provider value={[localStorage.getItem("isBaseHeader") == String(true), toggleHeader]}>
                    { children }
                </HeaderContext.Provider>
            </ModalContext.Provider>
        </UserContext.Provider>
    );
}


export default MyContext;