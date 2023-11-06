import React, { useEffect, useState } from "react"

export default function PersonDetail({personId, setPersonId}) {
    const [person, setPerson] = useState(null)

    const fetchPerson = async () => {
        try {
            const response = await fetch('api/people/'+personId);
            const data = await response.json();
            setPerson(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPerson()
    }, [])

    return <>
        <div className="people-list__top">
            <h1>Details of person #{personId}</h1>
            <button onClick={()=>setPersonId(null)}>Back to list</button>
        </div>
        {
            person ? 
            <div className="people-list__person-details">
                <img src={'images/' + person.image.path} alt="person image" /><br/>
                <h2>Main details:</h2>
                <div>Name: {person.name ?? 'Unknown'}</div><br/>
                <div>Occupation: {person.occupation ?? 'Unknown'}</div><br/>
                <div>Status details: {person.status_text ?? 'Unknown'}</div><br />
                <div>Aliases: 
                    { 
                        person.aliases.length > 0 ?
                            <ul>
                                {
                                    person.aliases.map(alias => {
                                        return <li key={alias.id}>{alias.alias}</li>
                                    })
                                }
                            </ul>
                        : ' --'
                    }
                </div><br/>
                <div>Nationality: {person.nationality ?? 'Unknown'}</div><br/>

                <h2>Looks:</h2>
                <div>Hair colour: {person.hair_color ?? 'Unknown'}</div><br/>
                <div>Eye colour: {person.eye_color ?? 'Unknown'}</div><br/>
                <div>Height: {person.height ?? 'Unknown'}</div><br/>
                <div>Weight: {person.weight ?? 'Unknown'}</div><br/>
            </div>
            : 'Loading...'
        }
    </>
}