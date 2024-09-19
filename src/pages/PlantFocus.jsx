import React from "react"
import { useMyContext } from '../MyContext';
import EditPlant from "./EditPlant"
import JournalEntry from "../components/JournalEntry"
import { nanoid } from "nanoid";

export default function PlantFocus() {
    const { focus, setFocus, user, setMyPlants, isEditing, setIsEditing } = useMyContext();
    const invokeURL = 'https://6wux2wozxc.execute-api.us-east-2.amazonaws.com/v1';
    const [journal, setJournal] = React.useState('')
    const sunlightLabels = ["Dense Shade", "Full Shade", "Partial Sun", "Full Sun"]

    function handleClick() { // go back to all plants view
        setFocus(null)
        setIsEditing(false)
    }

    function handleDelete() {
        const deletePlant = { // create request object for delete api
            userId: user.userId,
            plantId: focus.plantId
        }
        fetch(`${invokeURL}/plant`, { // call api to delete plant from db
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

    function handleEdit() { // show "is editing" UI
        setIsEditing(true)
    }

    function handleJournalChange(e) { // form in state updates
        setJournal(e.target.value)
    }

    function journalSubmit(e) { // submitting new journal entry
        e.preventDefault();
        if (!journal) { // if any fields are left empty
            alert('Please enter text in the entry box')
        }
        const journalEntry = { // create journal entry object
            entryId: nanoid(),
            content: journal,
            dateCreated: new Date()
        }
        const entry = { // create new entry to push to DB
            plantId: focus.plantId,
            userId: focus.userId,
            journalEntry,
        }

        fetch(`${invokeURL}/plant/add-journal`, { // call api to patch plant
            method: 'PATCH', // PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry)
        })
            .then(response => response.json())
            //.then(data => console.log(data.message))
            .catch(error => console.error('Error:', error));

        setMyPlants((prev) => { // add journal entry to plants to update UI
            return prev.map((plant) => {
                if (plant.plantId === focus.plantId) {
                    return {
                        ...plant,
                        journalEntries: [journalEntry, ...plant.journalEntries]
                    }
                } else {
                    return plant
                }
            })
        })

        setFocus((prev) => { // update focus state to update UI
            return {
                ...prev,
                journalEntries: [journalEntry, ...prev.journalEntries]
            }
        })

        setJournal('') // reset form
    }

    return (
        <div className="plants-body">
            <div className="add-plant">
                <button className="body-btn" onClick={handleClick}>Back To All Plants</button>
            </div>
            {!isEditing && <div className="outer-plant-focus-card">
                <div className="plant-focus-card">
                    <div className="focus-img-cont">
                        <img src={`/images/plant${focus.img}.png`} alt="plant"></img>
                    </div>
                    <div className="plant-focus-text">
                        <div className="pft">
                            <h4>{focus.nickname}</h4>
                            <p>{focus.type}</p>
                            <p>Please water {focus.wpw} time{Number(focus.wpw) === 0 ? '' : 's'} per week</p>
                            <p>Store plant in {sunlightLabels[focus.sunlight]}</p>
                        </div>
                        <div className="plant-focus-btns">
                            <button className="body-btn" onClick={handleEdit}>Edit Plant</button>
                            <button className="body-btn" onClick={handleDelete}>Delete Plant</button>
                        </div>
                    </div>
                </div>
                <form className="add-entry-form">
                    <textarea
                        placeholder="New Journal Entry"
                        id="journal"
                        name="journal"
                        value={journal}
                        onChange={handleJournalChange}
                    />
                    <button onClick={journalSubmit} className="jsbb body-btn">Add Entry</button>
                </form>
            </div>}
            {isEditing && <EditPlant></EditPlant>}
            <div className="journals">
                {focus.journalEntries && focus.journalEntries.map((each) => {
                    return <JournalEntry key={each.entryId} entry={each} plant={focus}></JournalEntry>
                })}
            </div>
        </div>
    )
}