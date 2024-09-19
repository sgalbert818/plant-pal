import React from "react";
import MyPlants from "../components/MyPlants"
import { useMyContext } from '../MyContext';
import CreatePlant from "./CreatePlant"
import PlantFocus from "./PlantFocus"

export default function Body() {
    const { creating, focus } = useMyContext();

    return (
        <main>
            {!creating && !focus && <MyPlants></MyPlants>}
            {creating && <CreatePlant></CreatePlant>}
            {focus && <PlantFocus></PlantFocus>}
        </main>
    )
}
