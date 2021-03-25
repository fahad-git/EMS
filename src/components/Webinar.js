import React from 'react';
import FloatActionButton from './FloatActionButton';
import './../assets/css/MainLobby.css';

function Webinar(){

    return  <>                
                <div className="webinar">
                    <h1>Webinar</h1>
                    <br/><hr/>
                    <a href="#webinar1"> Webinar 1</a>
                    <a href="#webinar2"> Webinar 2</a>
                    <a href="#webinar3"> Webinar 3</a>
                    <a href="#webinar4"> Webinar 4</a>
                    <a href="#webinar5"> Webinar 5</a>
                </div>
                <FloatActionButton />
            </>
}
export default Webinar;