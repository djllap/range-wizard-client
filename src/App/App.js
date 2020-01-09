import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import config from '../config';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import ChartView from '../ChartView/ChartView';
import ChartForm from '../ChartForm/ChartForm';
import './App.css';

class App extends Component {
  state = {
    charts: [],
    ranges: [],
    currentChart: {id: ''},
    editing: false,
    error: undefined
  };

  componentDidMount() {
    fetch(`${config.baseURL}/charts`)
      .then(res => res.json())
      .then(charts => {
        if (charts.length > 0) {
          this.setState({
            charts: charts,
            currentChart: charts[0]
          })
        }
      })
      .then(() => {
        fetch(`${config.baseURL}/ranges`)
          .then(res => res.json())
          .then(ranges => {
            this.setState({ranges: ranges})
          })
      })
      .catch(e => {
        const error = Object.entries(e).length ? e : 'Failed to load charts';
        this.setState({error: error});
      })
  }

  selectChart = (chart) => {
    this.setState({currentChart: chart});
  }

  addChartToCharts = (chart) => {
    this.setState({charts: [...this.state.charts, chart]})
  }

  editChart = (chart) => {
    const charts = [...this.state.charts].map(c => {
      return (c.id === chart.id) ? chart : c;
    })
    this.setState({charts: charts})
  }

  deleteChart = (id) => {
    const filteredCharts = this.state.charts.filter(chart => chart.id !== id);
    const chartIndex = this.state.charts.findIndex(chart => chart.id === id);
    const index = (chartIndex === 0) ? 1 : chartIndex - 1;
    this.setState({charts: filteredCharts, currentChart: this.state.charts[index]});

  }

  addRanges = (newRanges) => {
    this.setState({ranges: [...this.state.ranges, ...newRanges]});
  }

  editRanges = (rangesToEdit) => {
    console.log(rangesToEdit);
    const rangesToEditIds = rangesToEdit.map(range => range.id);
    const ranges = this.state.ranges.map(range => {
      return rangesToEditIds.includes(range.id) ?
        rangesToEdit.find(r => r.id === range.id )
        :
        range;
    });

    this.setState({ranges: ranges})
  }

  deleteRange = (id) => {
    const filteredRanges = this.state.ranges.filter(range => range.id !== id);
    this.setState({ranges: filteredRanges});
  }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing});
    if (!this.state.currentChart.id && this.state.charts.length > 0) {
      this.setState({currentChart: this.state.charts[0]})
    }
  }

  setError = (error) => {
    this.setState({error: error});
  }

  render() {
    const ranges = this.state.ranges || [];
    const currentRanges = ranges.filter(range => {
        return range.chart_id === this.state.currentChart.id;
    });

    const chartComponent = (this.state.editing) ?
      <ChartForm 
        chart={this.state.currentChart}
        selectChart={this.selectChart}
        addChart={this.addChartToCharts}
        editChart={this.editChart}
        addRanges={this.addRanges}
        editRanges={this.editRanges}
        deleteRange={this.deleteRange}
        ranges={currentRanges}
        toggleEditing={this.toggleEditing}
      />
      :
      <ChartView 
        charts={this.state.charts}
        currentChart={this.state.currentChart}
        ranges={currentRanges}
        selectChart={this.selectChart}
        deleteChart={this.deleteChart}
        toggleEditing={this.toggleEditing}
        error={this.state.error}
        setError={this.setError}
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
          {/* <div className="big-container"> */}
            <Route path="/charts" exact
              render={(props) => chartComponent}
            />
          {/* </div> */}
          
        </BrowserRouter>
      </main>
    );
  }
}

export default App;