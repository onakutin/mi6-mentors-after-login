import React, { useState, useEffect } from "react";
import axios from "axios";
import MissionEditForm from "./MissionEditForm";

export default function Missions() {
    const [missions, setMissions] = useState([])
    const [missionId, setMissionId] = useState(null)

    const fetchMissions = async () => {
        try {
            const response = await axios('api/missions');
            setMissions(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMissions()
    }, [])

    return <div className="missions-list">
        {
        !missionId ? <>
            <div className="missions-list__top">
                <h1>Missions</h1>
            </div>
            {
                missions.length > 0 ?
                    <ol className="missions-list__list">
                        {
                            missions.map((mission) => {
                                return <li key={mission.id} className="missions-list__mission" onClick={() => {setMissionId(mission.id)}}>
                                    <p>{mission.name}</p>
                                </li>
                            }) 
                        }
                    </ol>
                : 'Loading...'
            }
        </> : <MissionEditForm missionId={missionId} setMissionId={setMissionId}/>
        }
    </div>
}