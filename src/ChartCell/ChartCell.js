import React from 'react';

export default function ChartCell(props) {

  return (
    <span 
      className="chart-cell"
      style={{backgroundColor: props.color}}
    >
      {props.hand}
    </span>
  );
}