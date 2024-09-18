import React from "react"
import { useMyContext } from '../MyContext';
import { nanoid } from "nanoid";

export default function CreatePlant() {
    const { setCreating, user, setMyPlants } = useMyContext();
    const sunlightLabels = ["Dense Shade", "Full Shade", "Partial Sun", "Full Sun"]
    const radioButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
    const invokeURL = 'https://6wux2wozxc.execute-api.us-east-2.amazonaws.com/v1';

    const clickHandler = () => { // exit out of 'create plant' UI
        setCreating(prev => !prev)
    }

    const [formData, setFormData] = React.useState({ // form data for creating new plant
        nickname: '',
        type: '',
        wpw: '',
        sunlight: 0,
        img: '1'
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

    const submitForm = (e) => {
        e.preventDefault()

        if (!formData.nickname || !formData.type || !formData.wpw) { // if any fields are left empty
            alert('Please ensure all fields are filled')
        }
        const newPlant = { // create new plant object to push to DB
            ...formData,
            plantId: nanoid(),
            userId: user.userId,
            dateCreated: new Date()
        }

        fetch(`${invokeURL}/plant`, { // call api to post new plant to DB
            method: 'POST', // POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlant)
        })
            .then(response => response.json())
            //.then(data => console.log(data.message))
            .catch(error => console.error('Error:', error));

        setMyPlants((prev) => {
            return [newPlant, ...prev]
        })

        setFormData({ // reset form
            nickname: '',
            type: '',
            wpw: '',
            sunlight: 0,
            img: '1'
        })
        setCreating(prev => !prev); // exit "create plant" UI
    }

    return (
        <div className="create-plant">
            <button onClick={clickHandler}>back to my plants</button>
            <div>
                <form>
                    <div className="add-new-plant-input">
                        <label htmlFor="nickname">Nickname:</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-new-plant-input">
                        <label htmlFor="type">Type:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-new-plant-input">
                        <label htmlFor="wpw">Waters per week:</label>
                        <input
                            type="number"
                            id="wpw"
                            name="wpw"
                            value={formData.wpw}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-new-plant-input">
                        <label htmlFor="sunlight">Sunlight: {sunlightLabels[formData.sunlight]}</label>
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
                    <button onClick={submitForm}>Add Plant!</button>
                </form>
            </div>
        </div >
    )
}