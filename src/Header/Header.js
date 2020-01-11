import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(props) {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const isHidden = menuIsOpen ? '' : 'hidden';
  const icon = menuIsOpen ? 'close' : 'menu'

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <header>
      <span className="app-icon">
        <img 
          className="logo-img"
          src={require("./RangeWizardLogo.png")} 
          alt="Range Wizard Logo"
          onClick={() => props.history.push('/')}
        />
      </span>
      <i 
        className="material-icons menu-icon"
        onClick={toggleMenu}
      >
        {icon}
      </i>
      <ul className={`nav-list ${isHidden}`}>
        <li className={"nav-item"}>
          <a className="nav" href="https://github.com/djllap/range-wizard-client" target="blank">
            Code
          </a>
        </li>
        <li className={"nav-item"}>
          <Link className="nav nav-charts" to="/charts">
            Charts
          </Link>
        </li>
        <li className={"nav-item"}>
          <Link className="nav nav-tutorial" to="/">
            Tutorial
          </Link>
        </li>
      </ul>
    </header>
  );
}