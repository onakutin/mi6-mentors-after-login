import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './people-of-interest/App';

export default function PeopleOfInterestApp() {
    
    return (
        <App />
    );
}

const container = document.getElementById('people-of-interest-app');
const root = createRoot(container);
root.render(<PeopleOfInterestApp />);