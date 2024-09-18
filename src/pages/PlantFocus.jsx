import React from "react"
import { useMyContext } from '../MyContext';

export default function PlantFocus() {
    const { focus, setFocus, user, setMyPlants } = useMyContext();
    const invokeURL = 'https://6wux2wozxc.execute-api.us-east-2.amazonaws.com/v1';

    function handleClick() {
        setFocus(null)
    }

    function handleDelete() {
        const deletePlant = {
            userId: user.userId,
            plantId: focus.plantId
        }
        fetch(`${invokeURL}/plant`, { // call api to post new plant to DB
            method: 'DELETE', // POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletePlant)
        })
            .then(response => response.json())
            //.then(data => console.log(data.message))
            .catch(error => console.error('Error:', error));

        setMyPlants((prev) => { // remove plant from my plants
            return prev.filter((plant) => plant.plantId !== focus.plantId)
        })
        setFocus(null) // back to all plants screen
    }

    return (
        <div>
            <button onClick={handleClick}>Go Back</button>
            {focus.nickname}
            <button>Edit Plant</button>
            <button onClick={handleDelete}>Delete Plant</button>
        </div>
    )
}