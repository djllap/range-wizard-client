import React from 'react';
import './ChartLegend.css';

export default function ChartLegend(props) {

  return (
    <div className="chart-legend">
    <h3 className="legend-title">Ranges</h3>
      {props.ranges.map((range, i) => 
        <div className="legend-row" key={i}>
          <span 
            className="legend-color"
            style={{backgroundColor: range.color}}
          />
          <span className="legend-label">
            {`${range.range_name}`}
          </span>
        </div>
      )}
    </div>
  );
}