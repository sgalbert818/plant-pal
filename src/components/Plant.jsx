import React from "react";
import { useMyContext } from '../MyContext';

export default function Plant({children}) {
    const { setFocus } = useMyContext();

    const handleClick = (children) => {
        setFocus(children) // show single plant details
    }

    return (
        <div className="plant" onClick={() => handleClick(children)}>
            <div className="plant-img-container">
                <img src={`/images/plant${children.img}.png`} alt="plant" className="plant-rb-img"></img>
            </div>
            <h4>{children.nickname}</h4>
            <p>{children.type}</p>
        </div>
    )
}