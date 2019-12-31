import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(props) {

  return (
    <header>
      <span className="app-icon">
        <Link to="/charts">Range Wizard</Link>
      </span>
    </header>
  );
}