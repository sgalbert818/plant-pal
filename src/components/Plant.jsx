import React from "react";
import { useMyContext } from '../MyContext';

export default function Plant({children}) {
    const { setFocus } = useMyContext();

    const handleClick = (children) => {
        setFocus(children)
    }

    return (
        <div className="plant" onClick={() => handleClick(children)}>
            <div className="plant-img-container">
                <img src={`/images/plant${children.img}.png`} alt="plant" className="plant-rb-img"></img>
            </div>
            <p>{children.nickname}</p>
        </div>
    )
}