import React from 'react';

export default function ChartSelect(props) {
  const selectChart = (e) => {
    const chartToSet = props.charts.find(chart => {
      return chart.chart_name === e.currentTarget.value;
    })
    props.setChart(chartToSet);
  };

  return (
    <select 
      name="chart-select" 
      id="chart-select"
      onChange={selectChart}
    >
      {props.charts.map((chart, i) =>
        <option 
          value={chart.chart_name} 
          key={i}
          chart={chart}
        >
          {chart.chart_name}
        </option>
      )}
    </select>
  );
}