import React from "react"
import People from "./People"

export default function MainContent({content}) {
    let chosenContent;
    switch (content) {
        case '':
            chosenContent = <h1>Welcome to home</h1>
            break;
        case 'people-of-interest':
            chosenContent = <People />
            break;

        case 'missions':
            chosenContent = <Missions />
            break;
        default:
            break;
    }
    return <main>
        {chosenContent}
    </main>
}