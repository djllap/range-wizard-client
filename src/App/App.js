import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import config from '../config';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import ChartView from '../ChartView/ChartView';
import ChartForm from '../ChartForm/ChartForm';
import './App.css';

function App(props) {
  // const [charts, setCharts] = useState([]);
  // const [ranges, setRanges] = useState([]);
  // const [currentChart, setCurrentChart] = useState({id: ''});
  // const [editing, setEditing] = useState(false);
  // const [error, setError] = useState(undefined);

  // useEffect(() => {
  //   fetch(`${config.baseURL}/charts`)
  //     .then(res => res.json())
  //     .then(charts => {
  //       if (charts.length > 0) {
  //         setCharts(charts);
  //         setCurrentChart(charts[0])
  //       }
  //     })
  //     .then(() => {
  //       fetch(`${config.baseURL}/ranges`)
  //         .then(res => res.json())
  //         .then(ranges => {
  //           setRanges(ranges)
  //         })
  //     })
  //     .catch(e => {
  //       const error = Object.entries(e).length ? e : 'Failed to load charts';
  //       setError(error)
  //     })
  // }, []);

  // const addChartToCharts = (chart) => {
  //   setCharts([...charts, chart]);
  // }

  // const editChart = (chart) => {
  //   setCharts(
  //     [...charts].map(c => {
  //       return (c.id === chart.id) ? chart : c;
  //     })
  //   );
  // }

  // const deleteChart = (id) => {
  //   const filteredCharts = charts.filter(chart => chart.id !== id);
  //   const chartIndex = charts.findIndex(chart => chart.id === id);
  //   const index = (chartIndex === 0) ? 1 : chartIndex - 1;
  //   setCurrentChart(charts[index]);
  //   setCharts(filteredCharts);
  // }

  // const addRanges = (newRanges) => {
  //   setRanges([...ranges, ...newRanges]);
  // }

  // const editRanges = (rangesToEdit) => {
  //   const rangesToEditIds = rangesToEdit.map(range => range.id);
  //   const editedRanges = ranges.map(range => {
  //     return rangesToEditIds.includes(range.id) ?
  //       rangesToEdit.find(r => r.id === range.id )
  //       :
  //       range;
  //   });

  //   setRanges(editedRanges);
  // }

  // const deleteRange = (id) => {
  //   const filteredRanges = ranges.filter(range => range.id !== id);
  //   setRanges(filteredRanges);
  // }

  // const toggleEditing = () => {
  //   setEditing(!editing);
  //   if (!currentChart.id && charts.length > 0) {
  //     setCurrentChart(charts[0]);
  //   }
  // }

 
  // const ranges = this.state.ranges || [];
  const currentRanges = ranges.filter(range => {
      return range.chart_id === currentChart.id;
  });

  const chartComponent = (editing) ?
    <ChartForm 
      chart={currentChart}
      selectChart={setCurrentChart}
      addChart={addChartToCharts}
      editChart={editChart}
      addRanges={addRanges}
      editRanges={editRanges}
      deleteRange={deleteRange}
      ranges={currentRanges}
      toggleEditing={toggleEditing}
    />
    :
    <ChartView 
      charts={charts}
      currentChart={currentChart}
      ranges={currentRanges}
      selectChart={setCurrentChart}
      deleteChart={deleteChart}
      toggleEditing={toggleEditing}
      error={error}
      setError={setError}
    />;

  return (
    <main className='App'>
      <BrowserRouter>
        <Route path="/"
          component={Header}
        />
        <Route path="/" exact
          component={Landing}
        />
        <Route path="/charts" exact
          render={(props) => chartComponent}
        />
        
      </BrowserRouter>
    </main>
  );
  
}

export default App;