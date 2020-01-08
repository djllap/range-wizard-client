import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(props) {

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
      <Link className="nav-tutorial" to="/">
        Tutorial
      </Link>
    </header>
  );
}