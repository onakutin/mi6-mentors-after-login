import React, { useEffect, useState } from "react"
import PersonDetail from "./PersonDetail";

export default function People() {
    const [people, setPeople] = useState([]);
    const [personId, setPersonId] = useState(null);

    const fetchPeople = async () => {
        try {
            const response = await fetch('api/people');
            const data = await response.json();
            setPeople(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPeople()
    }, [])

    return <div className="people-list">
        {
        
        !personId ? <>
            <div className="people-list__top">
                <h1>People of interest</h1>
            </div>
            {
                people.length > 0 ?
                    <ol className="people-list__list">
                        {
                            people.map((person) => {
                                return <li key={person.id} className="people-list__person" onClick={() => {setPersonId(person.id)}}>
                                    <p>{person.name}</p>
                                </li>
                            }) 
                        }
                    </ol>
                : 'Loading...'
            }
        </> : <PersonDetail personId={personId} setPersonId={setPersonId}/>
        }
    </div>
}