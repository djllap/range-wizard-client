import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(props) {
  return (
    <p>
      click <Link to='/charts'>here</Link> to get started!
    </p>
  );
}