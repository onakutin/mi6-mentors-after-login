import React, { useEffect, useState } from "react"
import Navigation from "./Navigation"
import MainContent from "./MainContent"
import { BrowserRouter } from "react-router-dom"
import UserContext from './UserContext'

export default function App() {
    const [content, setContent] = useState('')

    const [user, setUser] = useState(null); // null - user status unknown
                                            // false - user not logged in (but we know that)

    const loadUserStatus = async () => {
        const response = await fetch('/api/user', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            setUser(data);
        } else if (response.status === 401) {
            setUser(false); // false - user not logged in
        }
    }

    useEffect(() => {
        if (user === null) {    // load user status anytime user is null, i.e. we don't know his status
            loadUserStatus();
        }
    }, [user])

    return (
        <UserContext.Provider value={ { user, setUser } }>
            <BrowserRouter>
                <div>
                    <Navigation content={content} setContent={setContent}/>
                    <MainContent content={content}/>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    )
}