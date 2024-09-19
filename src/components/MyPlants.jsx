//import react from "react";
import { useMyContext } from '../MyContext';
import Plant from "./Plant"

export default function MyPlants() {
    const { myPlants, setCreating } = useMyContext();

    const clickHandler = () => { // enter 'create plant' UI
        setCreating(prev => !prev)
    }

    return (
        <div className="plants-body">
            {myPlants && <div className="add-plant" onClick={clickHandler}><button className="body-btn">
                {myPlants.length === 0 ? `Click here to add your first plant!` : `Grow new plant!`}</button></div>}
            {!myPlants && <div className="add-plant">Searching for plants...</div>}
            <div className="my-plants">
                {myPlants && myPlants.length > 0 && myPlants.map((plant) => {
                    return <Plant key={plant.plantId}>{plant}</Plant>
                })}
            </div>
        </div>
    )
}