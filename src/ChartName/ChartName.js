import React from 'react';
import './ChartSelect.css';

export default function ChartName(props) {
  
  // Returns a text input if editing, else returns a select
  if (props.editing) { 
    return (
      <form className="chart-name-form">
        <input
          className="chart-name-input"
          type="text"
          size="0"
          id="chart-name-input"
          placeholder='Chart Name'
          value={props.currentChart.chart_name}
          onChange={props.handleChartNameChange}
        />
      </form>
    )
  } else {
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
}
