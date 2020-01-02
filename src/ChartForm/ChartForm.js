import React from 'react';
import Chart from '../Chart/Chart';
import ChartLegend from '../ChartLegend/ChartLegend';
import ChartBtns from '../ChartBtns/ChartBtns';
import RangeForm from '../RangeForm/RangeForm';

export default function ChartForm(props) {
  function handleChartNameChange(e) {
    props.updateFormName(e.target.value);
  }
  
  return (
    <div className="chart-view">
      <Chart 
        ranges={props.ranges}
      />
      <form className="chart-name-form">
        <input 
          type="text"
          id="chart-name-input"
          placeholder='Chart Name'
          value={props.chartName}
          onChange={props.handleChartNameChange}
        />
      </form>
      <div className="chart-toolbar">
        <RangeForm
          ranges={props.ranges}
          newRangeName={props.newRangeName}
          handleRangeNameChange={props.handleRangeNameChange}
          createRange={props.createRange}
          updateRange={props.updateRange}
        />
        {/* <ChartBtns
          chartId={props.currentChart.id}
        /> */}
      </div>
    </div>
  );
}