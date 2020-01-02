import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import ChartView from '../ChartView/ChartView';
import ChartForm from '../ChartForm/ChartForm';

class App extends Component {
  state = {
    charts: [],
    ranges: [],
    currentChart: {id: 0},
    formChart: {chart_name: ''},
    formRanges: [],
    formNewRangeName: ''
  };

  componentDidMount() {
    fetch('https://range-wizard.herokuapp.com/api/charts')
      .then(res => res.json())
      .then(charts => {
        this.setState({
          charts: charts,
          currentChart: charts[0]
        })
      });
      
    fetch(`http://range-wizard.herokuapp.com/api/ranges`)
      .then(res => res.json())
      .then(ranges => {
        this.setState({ranges: ranges})
      });
  }

  handleSelectChart = (chart) => {
    this.setState({currentChart: chart});
  }

  handleFormChartChange = (e) => {
    this.setState({ formChart: {chart_name: e.target.value} });
  }

  handleFormNewRangeNameChange = (e) => {
    this.setState({formNewRangeName: e.target.value});
  }

  createFormRange = (e) => {
    e.preventDefault();
    this.setState(
      {
        formRanges: [
          ...this.state.formRanges, 
          {
            chart_id: this.state.currentChart.id,
            color: '',
            coords: [],
            range_name: this.state.formNewRangeName
          }
        ],
        formNewRangeName: ''
      }
    );
  }

  updateFormRange = (range, index) => {
    let ranges = Object.assign(this.state.formRanges);
    ranges[index] = range;
    this.setState({ranges});
  }
  
  render() {
    const ranges = this.state.ranges || [];
    let currentRanges = [];
    if (this.state.currentChart) {
      currentRanges = ranges.filter(range => {
        return range.chart_id === this.state.currentChart.id;
      })
    }

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
            render={(props) => 
              <ChartView 
                charts={this.state.charts}
                currentChart={this.state.currentChart}
                ranges={currentRanges}
                handleSelectChart={this.handleSelectChart}
              />
            }
          />
          <Route path="/charts/new"
            render={(props) => 
              <ChartForm 
                ranges={this.state.formRanges}
                chartName={this.state.formChart.chart_name}
                handleChartNameChange={this.handleFormChartChange}
                newNameRange={this.state.formNewRangeName}
                handleRangeNameChange={this.handleFormNewRangeNameChange}
                createRange={this.createFormRange}
                updateRange={this.updateFormRange}
              />
            }
          />
        </BrowserRouter>
      </main>
    );
  }
}

export default App;