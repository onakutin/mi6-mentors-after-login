import React, { useState } from "react"
import Navigation from "./Navigation"
import MainContent from "./MainContent"

export default function App() {
    const [content, setContent] = useState('')

    return <div>
        <Navigation content={content} setContent={setContent}/>
        <MainContent content={content}/>
    </div>
}