import React from "react"
import { useMyContext } from '../MyContext';

export default function EditPlant() {
    const { focus, setIsEditing, setMyPlants, setFocus } = useMyContext();
    const sunlightLabels = ["Dense Shade", "Full Shade", "Partial Sun", "Full Sun"]
    const radioButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
    const invokeURL = 'https://6wux2wozxc.execute-api.us-east-2.amazonaws.com/v1';

    const discardChanges = (e) => { // go back to focus UI
        e.preventDefault()
        setIsEditing(false)
    }

    const saveChanges = (e) => {
        e.preventDefault()

        if (!formData.nickname || !formData.type || !formData.wpw) { // if any fields are left empty
            alert('Please ensure all fields have a value')
        }
        const updates = { // create new plant object to push to DB
            ...formData,
            plantId: focus.plantId,
            userId: focus.userId,
            journalEntries: focus.journalEntries,
            dateCreated: new Date()
        }

        fetch(`${invokeURL}/plant`, { // call api to patch plant
            method: 'PATCH', // PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates)
        })
            .then(response => response.json())
            //.then(data => console.log(data.message))
            .catch(error => console.error('Error:', error));

        setMyPlants((prev) => { // update plants array in state
            return prev.map((each) => {
                return each.plantId === focus.plantId ? updates : each
            })
        })

        setFocus(updates)
        setIsEditing(false); // exit "edit plant" UI
    }

    const [formData, setFormData] = React.useState({ // form data for creating new plant
        nickname: focus.nickname,
        type: focus.type,
        wpw: focus.wpw,
        sunlight: focus.sunlight,
        img: focus.img
    });

    const handleChange = (event) => { // handler for updating form
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = (target) => { // handler for updating custom radio button selection
        setFormData({
            ...formData,
            img: target
        });
    }

    return (
        <div>
            <div className="new-plant-form">
                <form>
                    <div className="four">
                        <div className="two first-two">
                            <div className="add-new-plant-input">
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    placeholder="Plant nickname"
                                />
                            </div>
                            <div className="add-new-plant-input">
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    placeholder="Type of plant"
                                />
                            </div>
                        </div>
                        <div className="two">
                            <div className="add-new-plant-input">
                                <input
                                    type="number"
                                    id="wpw"
                                    name="wpw"
                                    value={formData.wpw}
                                    onChange={handleChange}
                                    placeholder="Waters needed per week"
                                />
                            </div>
                            <div className="add-new-plant-input slider-input">
                                <label htmlFor="sunlight">{sunlightLabels[formData.sunlight]}</label>
                                <input
                                    type="range"
                                    id="sunlight"
                                    name="sunlight"
                                    min="0"
                                    max="3"
                                    step="1"
                                    value={formData.sunlight}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="add-new-plant-input anpi-rb">
                        {radioButtons.map((button) => (
                            <div
                                key={button}
                                className={`plant-rb ${formData.img === button ? 'selected-rb' : ''}`}
                                onClick={() => handleClick(button)}>
                                <img src={`/images/plant${button}.png`} alt="plant" className="plant-rb-img"></img>
                            </div>
                        ))}
                    </div>
                    <div className="add-new-plant-input anpi-check">
                        <input
                            type="checkbox"
                            id="reminders"
                            disabled={true}
                        />
                        <label htmlFor="reminders"><p>Text me reminders to water this plant? (Disabled in demo version)</p></label>
                    </div>
                    <div className="split-btns">
                        <div className="add-plant apbb">
                            <button className="body-btn" onClick={saveChanges}>Save Changes</button>
                        </div>
                        <div className="add-plant apbb">
                            <button className="body-btn" onClick={discardChanges}>Discard Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}