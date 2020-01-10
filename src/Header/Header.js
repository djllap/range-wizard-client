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
      <div>
        <a className="nav" href="https://github.com/djllap/range-wizard-client" target="blank">
          Code
        </a>
        <Link className="nav nav-charts" to="/charts">
          Charts
        </Link>
        <Link className="nav nav-tutorial" to="/">
          Tutorial
        </Link>
      </div>
    </header>
  );
}