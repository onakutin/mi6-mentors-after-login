import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

export default function Navigation({content, setContent}) {
    const [navClosed, setNavClosed] = useState(false);


    const { user, setUser } = useContext(UserContext);

    const location = useLocation();

    const handleLogout = async ev => {
      ev.preventDefault();

      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      });

      setUser(null);
    }

    return <nav className={"sidenav" + (navClosed ? " sidenav_closed" : "")}>
    <div className="sidenav__content">
      <img src="/images/mi6-seal.png" alt="seal" className="sidenav__image" />
      <ul className="sidenav__links">
        {/* Will be replaced by links from react router: */}
        <li className={"sidenav__link" + (location.pathname === '/' ? ' sidenav__link_active' : '')}>
          <Link to="/">Home</Link>
        </li>
        <li className={"sidenav__link" + (location.pathname === '/people-of-interest' ? ' sidenav__link_active' : '')}>
          <Link to="/people-of-interest">People of interest</Link>
        </li>
        <li className={"sidenav__link" + (location.pathname === '/missions' ? ' sidenav__link_active' : '')}>
          <Link to="/missions">Missions</Link>
        </li>
        {
          (user === false)
             ? <>
                <li className={"sidenav__link" + (location.pathname === '/register' ? ' sidenav__link_active' : '')}>
                  <Link to="/register">Register</Link>
                </li>
                <li className={"sidenav__link" + (location.pathname === '/login' ? ' sidenav__link_active' : '')}>
                  <Link to="/login">Log in</Link>
                </li>
              </>
             : <li>
              <button onClick={ handleLogout }>Logout</button>
             </li>
        }
        {/* <li className={"sidenav__link" + (content === '' ? ' sidenav__link_active' : '')}  onClick={()=>setContent('')}>Home</li>
        <li className={"sidenav__link" + (content === 'people-of-interest' ? ' sidenav__link_active' : '')} onClick={()=>setContent('people-of-interest')}>People of interest</li>
        <li className={"sidenav__link" + (content === 'missions' ? ' sidenav__link_active' : '')} onClick={()=>setContent('missions')}>Missions</li> */}
      </ul>
    </div>
    <span className={"sidenav__arrow" + (navClosed ? " sidenav__arrow_closed" : "")} onClick={()=>setNavClosed(!navClosed)}></span>
  </nav>
}