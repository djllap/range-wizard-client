import React from 'react';
import './ChartSelect.css';

export default function ChartSelect(props) {
  const selectChart = (e) => {
    const chart = props.charts.find(c => c.id === Number(e.target.value));
    props.setChart(chart);
  };

  return (
    <select 
      className="chart-select"
      name="chart-select" 
      id="chart-select"
      onChange={selectChart}
      value={props.currentChartId}
    >
      {props.charts.map((chart, i) =>
        <option 
          value={chart.id} 
          key={i}
        >
          {chart.chart_name}
        </option>
      )}
    </select>
  );
}