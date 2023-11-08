import React from "react"
import People from "./People"
import Missions from "./Missions";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

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
        <Routes>
            <Route path="/" element={ <div className="home"><h1>Welcome to MI6</h1></div> } />
            <Route path="/people-of-interest" element={ <People /> } />
            <Route path="/missions" element={ <Missions /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/login" element={ <Login /> } />
        </Routes>
    </main>
}