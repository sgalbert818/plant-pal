import React from "react";
import { useMyContext } from '../MyContext';

export default function JournalEntry({ entry, plant }) {
    const { setMyPlants, setFocus } = useMyContext();
    const invokeURL = 'https://6wux2wozxc.execute-api.us-east-2.amazonaws.com/v1';

    function convertDate(string) { // convert date object to readable string
        const date = new Date(string);
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const datePart = date.toLocaleDateString('en-US', optionsDate);
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timePart = date.toLocaleTimeString('en-US', optionsTime);
        const readableDate = `${datePart}, ${timePart}`;
        return readableDate
    }

    function journalDelete(e) {
        e.preventDefault();
        const deleteObject = { // create object to send in delete request
            plantId: plant.plantId,
            userId: plant.userId,
            entryId: entry.entryId
        }

        fetch(`${invokeURL}/plant/delete-journal`, { // call api to patch plant
            method: 'PATCH', // PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteObject)
        })
            .then(response => response.json())
            //.then(data => console.log(data.message))
            .catch(error => console.error('Error:', error));

        setMyPlants((prev) => { // update plants in state so UI is updated
            return prev.map((each) => {
                if (each.plantId === plant.plantId) {
                    return {
                        ...each,
                        journalEntries: each.journalEntries.filter((eachentry) => eachentry.entryId !== entry.entryId)
                    }
                } else {
                    return each
                }
            })
        })

        setFocus((prev) => { // update plants in state so UI is updated
            return {
                ...prev,
                journalEntries: prev.journalEntries.filter((eachentry) => eachentry.entryId !== entry.entryId)
            }
        })
    }

    return (
        <div className="journal-entry">
            <div className="top">
                {convertDate(entry.dateCreated)}
                <br></br>
                {entry.content}
            </div>
            <div className="top">
                <button className="body-btn jebb" onClick={journalDelete}>Delete Entry</button>
            </div>
        </div>
    )
}