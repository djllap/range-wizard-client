import React from 'react';
import Chart from '../Chart/Chart';
import ChartSelect from '../ChartSelect/ChartSelect';
import ChartLegend from '../ChartLegend/ChartLegend';
import ChartBtns from '../ChartBtns/ChartBtns';
import ErrorBox from '../ErrorBox/ErrorBox';
import './ChartView.css';

export default function ChartView(props) {
  const chartName = props.currentChart.chart_name ? 
    props.currentChart.chart_name.toUpperCase() :
    props.currentChart.chart_name;
  const errorBox = (props.error) ? <ErrorBox error={props.error} setError={props.setError}/> : '';

  return (
    <div className="big-container">
      <div className="chart-view">
        <h2>CHARTS: {chartName}</h2>
        {errorBox}
        <Chart 
          ranges={props.ranges}
        />
        <ChartSelect 
          charts={props.charts} 
          setChart={props.selectChart}
          currentChartId={props.currentChart.id}
        />
        <div className="chart-toolbar">
          <ChartLegend
            ranges={props.ranges}
          />
          <ChartBtns
            chartId={props.currentChart.id}
            setChart={props.selectChart}
            deleteChart={props.deleteChart}
            charts={props.charts}
            toggleEditing={props.toggleEditing}
          />
        </div>
      </div>
    </div>
  );
}