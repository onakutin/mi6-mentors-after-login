import React from "react"
import People from "./People"
import Missions from "./Missions";

export default function MainContent({content}) {
    let chosenContent;
    switch (content) {
        case '':
            chosenContent = <div className="home"><h1>Welcome to MI6</h1></div>
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