 import React, { useEffect } from 'react'
 import { useHistory } from 'react-router-dom';
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button';

 function FloatActionButton() {
     const history = useHistory();

    
     const lobbyPath = () => {
        var arr = history.location.pathname.split("/");
        var path = "";
        for(let i of arr){
            let ID = parseInt(i)
            if(!Number.isNaN(ID))
                path = "/main-lobby/" +  ID;
            }
         return path
     }

    return (
        <Container>
            {/* <Link href="#"
                tooltip="Back"
                icon="far fa-sticky-note" /> */}
            <Link href= {lobbyPath()}
                tooltip="Main Lobby"
                icon="fas fa-user-plus"
                styles={{backgroundColor: darkColors.grey, color: lightColors.white}}
                 >
                <i className="material-icons">account_balance</i>
                </Link>
            <Button
                tooltip="Back"
                rotate={true}
                onClick={() => history.goBack()}
                styles={{backgroundColor: darkColors.grey, color: lightColors.white}}
                >
                   <i className="material-icons">arrow_back</i>
                </Button>
        </Container>
    )
}
export default FloatActionButton;