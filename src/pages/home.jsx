import React from "react"
import { useMyContext } from '../MyContext';
import Body from "./body"

export default function Home({ signOut }) {
    const { user } = useMyContext();

    return (
        <div>
            <header>
                <h1>Hello {user?.signInDetails.loginId}</h1>
                <button onClick={signOut}>Sign out</button>
            </header>
            <Body></Body>
        </div>
    )
}