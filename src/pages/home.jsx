import React from "react"
import { useMyContext } from '../MyContext';
import Body from "./Body"

export default function Home({ signOut }) {
    const { user, setMyPlants } = useMyContext();

    const reset = async () => {
        await signOut();
        setMyPlants(null); // clear plant memory?
    }

    return (
        <div>
            <header>
                <h1>Hello {user?.signInDetails.loginId}</h1>
                <button onClick={reset}>Sign out</button>
            </header>
            <Body></Body>
        </div>
    )
}