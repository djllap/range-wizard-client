import React, { Component } from 'react';
import Chart from '../Chart/Chart';
import ChartSelect from '../ChartSelect/ChartSelect';
import ChartLegend from '../ChartLegend/ChartLegend';
import ChartBtns from '../ChartBtns/ChartBtns';
import './ChartView.css';

export default function ChartView(props) {

  return (
    <div className="chart-view">
      <Chart 
        ranges={props.ranges}
      />
      <ChartSelect 
        charts={props.charts} 
        setChart={props.handleSelectChart}
      />
      <div className="chart-toolbar">
        <ChartLegend
          ranges={props.ranges}
        />
        <ChartBtns
          chartId={props.currentChart.id}
        />
      </div>
    </div>
  );
}