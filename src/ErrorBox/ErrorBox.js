import React from 'react';
import './ErrorBox.css';

export default function ErrorBox(props) {
  const clearError = () => {
    props.setError(undefined);
  }

  return (
    <p className="error-box">
      <span className="error-message">
        {props.error}
      </span>
      <span 
        className="material-icons error-close"
        onClick={clearError}
      >
        close
      </span>
    </p>
  )
}