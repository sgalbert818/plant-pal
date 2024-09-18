//import react from "react";
import { useMyContext } from '../MyContext';
import Plant from "./Plant"

export default function MyPlants() {
    const { myPlants, setCreating } = useMyContext();

    const clickHandler = () => { // enter 'create plant' UI
        setCreating(prev => !prev)
    }

    return (
        <div className="my-plants">
            <div className="plant" onClick={clickHandler}>Add new plant!</div>
            {!myPlants && <div className="plant">Loading plants...</div>}
            {myPlants && myPlants.map((plant) => {
                return <Plant key={plant.plantId}>{plant}</Plant>
            })}
        </div>
    )
}