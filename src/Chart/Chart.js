import React from 'react';
import ChartCell from '../ChartCell/ChartCell';
import './Chart.css';

export default function Chart(props) {
  

  return (
    <div className="chart-container">
      {props.matrix.map((row, x) => 
        <div className="chart-row" key={x}>
          {row.map((hand, y) => {
            let color = 'inherit';
            props.ranges.forEach(range => {
              if (range.coords.includes(`${x},${y}`)) {
                color = range.color;
              }
            })
            
            return <ChartCell 
              key={y}
              hand={hand}
              color={color}
            />
          }
          )}
        </div>
      )}
    </div>
  );
}