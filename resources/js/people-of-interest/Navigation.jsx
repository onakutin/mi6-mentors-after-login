import React, { useState } from "react"

export default function Navigation({content, setContent}) {
    const [navClosed, setNavClosed] = useState(false);

    return <nav className={"sidenav" + (navClosed ? " sidenav_closed" : "")}>
    <div className="sidenav__content">
      <img src="/images/mi6-seal.png" alt="seal" className="sidenav__image" />
      <ul className="sidenav__links">
        {/* Will be replaced by links from react router: */}
        <li className={"sidenav__link" + (content === '' ? ' sidenav__link_active' : '')}  onClick={()=>setContent('')}><a href="#">Home</a></li>
        <li className={"sidenav__link" + (content === 'people-of-interest' ? ' sidenav__link_active' : '')} onClick={()=>setContent('people-of-interest')}><a href="#">People of interest</a></li>
        <li className={"sidenav__link" + (content === 'missions' ? ' sidenav__link_active' : '')} onClick={()=>setContent('missions')}><a href="#">Missions</a></li>
      </ul>
    </div>
    <span className={"sidenav__arrow" + (navClosed ? " sidenav__arrow_closed" : "")} onClick={()=>setNavClosed(!navClosed)}></span>
  </nav>
}