import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MissionEditForm({missionId, setMissionId}) {
    const [mission, setMission] = useState(null)

    const fetchMission = async () => {
        try {
            const response = await axios('api/missions/'+ missionId);
            setMission(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const sendData = async (e) => {
        e.preventDefault();
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
                <form action="" onSubmit={sendData}>
                    <label>Name:</label>
                    <input type="text" name="name" value={mission.name} className="missions-list__form-input"/>
                    <label>Year:</label>
                    <input type="number" name="year" value={mission.year} className="missions-list__form-input"/>
                    <label>Outcome:</label>
                    <select name="outcome" className="missions-list__form-input">
                        <option value={null} selected={mission.outcome === null}>Unknown</option>
                        <option value={true} selected={mission.outcome == true}>Successful</option>
                        <option value={false} selected={mission.outcome == false}>Failure</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </div>
            : 'Loading...'
        }
    </>
}