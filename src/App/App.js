import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import config from '../config';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import ChartView from '../ChartView/ChartView';
import ChartForm from '../ChartForm/ChartForm';

class App extends Component {
  state = {
    charts: [],
    ranges: [],
    currentChart: {id: ''},
    editing: false
  };

  componentDidMount() {
    fetch(`${config.baseURL}/charts`)
      .then(res => res.json())
      .then(charts => {
        this.setState({
          charts: charts,
          currentChart: charts[0]
        })
      });
      
    fetch(`${config.baseURL}/ranges`)
      .then(res => res.json())
      .then(ranges => {
        this.setState({ranges: ranges})
      });
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

  deleteChart = (id) => {
    const filteredCharts = this.state.charts.filter(chart => chart.id !== id);
    const chartIndex = this.state.charts.findIndex(chart => chart.id === id);
    this.setState({charts: filteredCharts, currentChart: this.state.charts[chartIndex-1]});

  }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing});
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
          {/* <Route path="/charts/new"
            render={(props) => 
              <ChartForm 
                currentChart={{id: null}}
                selectChart={this.selectChart}
                addChart={this.addChartToCharts}
                addRanges={this.addRanges}
              />
            }
          />
          <Route path="/charts/:chart_id/edit"
            render={(props) => 
              <ChartForm 
                currentChart={this.state.currentChart}
                selectChart={this.selectChart}
                addChart={this.addChartToCharts}
                addRanges={this.addRanges}
                ranges={currentRanges}
              />
            }
          /> */}
        </BrowserRouter>
      </main>
    );
  }
}

export default App;