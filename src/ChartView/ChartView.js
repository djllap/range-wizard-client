import React from 'react';
import Chart from '../Chart/Chart';
import ChartSelect from '../ChartSelect/ChartSelect';
import ChartLegend from '../ChartLegend/ChartLegend';
import ChartBtns from '../ChartBtns/ChartBtns';
import './ChartView.css';

export default function ChartView(props) {

  return (
    <div className="chart-view">
      <h2>Your Charts</h2>
      <Chart 
        ranges={props.ranges}
      />
      <ChartSelect 
        charts={props.charts} 
        setChart={props.selectChart}
        currentChartId={props.currentChart.id}
        currentChartName={props.currentChart.name}
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
  );
}