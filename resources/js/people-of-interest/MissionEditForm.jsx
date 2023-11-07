import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MissionEditForm({missionId, setMissionId}) {
    const [mission, setMission] = useState(null)
    const [message, setMessage] = useState(null)

    const fetchMission = async () => {
        try {
            const response = await axios.get('api/missions/'+ missionId);
            setMission(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const sendData = async (e) => {
        e.preventDefault();

        // with axios:
        // try {
        //     const response = await axios.post('api/missions/'+ missionId+'/store', mission);
        //     setMessage(response.data['message'])
        // } catch (error) {
        //     console.log(error)
        // }

        // with fetch
        try {
            const response = await fetch('api/missions/'+ missionId+'/store', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(mission)
            });
            const data = await response.json();
            setMessage(data['message'])
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setMission(previousValues => {
            return ({...previousValues, 
                [e.target.name]: e.target.value
            });
        });
    }

    useEffect(() => {
        fetchMission()
    }, [])

    return <>
        <div className="missions-list__top">
            <h1>Mission edit form #{missionId}</h1>
            <button onClick={()=>setMissionId(null)}>Back to list</button>
        </div>
        {
            mission ? 
            <div className="missions-list__form-container">
                {
                    message ? 
                        <span>{message}</span>
                    : ''
                }
                <form action="" onSubmit={sendData}>
                    <label>Name:</label>
                    <input type="text" name="name" value={mission.name} onChange={handleChange} className="missions-list__form-input"/>
                    <label>Year:</label>
                    <input type="number" name="year" value={mission.year} onChange={handleChange} className="missions-list__form-input"/>
                    <label>Outcome:</label>
                    <select name="outcome" className="missions-list__form-input" value={mission.outcome} onChange={handleChange}>
                        <option value="">Unknown</option>
                        <option value={1}>Successful</option>
                        <option value={0}>Failure</option>
                    </select>
                    <button type="submit" >Update</button>
                </form>
            </div>
            : 'Loading...'
        }
    </>
}