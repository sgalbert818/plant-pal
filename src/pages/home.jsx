import React from "react"
import { useMyContext } from '../MyContext';
import Body from "./Body"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function Home({ signOut }) {
    const { user, setMyPlants } = useMyContext();

    const reset = () => {
        signOut();
        setTimeout(function() { // delay clearing plant memory because signout takes a second
            setMyPlants(null);
        }, 1000);    
    }

    return (
        <div>
            <header>
                <div className="flex">
                    <FontAwesomeIcon icon={faLeaf} className="fa-logo"/>
                    <h1 className="header-text">PlantPal</h1>
                </div>
                <div className="flex">
                    <p className="header-p">{user?.signInDetails.loginId}</p>
                    <button onClick={reset} className="btn sign-out-btn"><p>Log Out</p></button>
                </div>
            </header>
            <Body></Body>
        </div>
    )
}