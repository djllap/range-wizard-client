import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chart from '../Chart/Chart';
import ChartSelect from '../ChartSelect/ChartSelect';
import ChartLegend from '../ChartLegend/ChartLegend';

export default class ChartView extends Component {
  matrix =  [
    ['AA ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
    ['AKo', 'KK ', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
    ['AQo', 'KQo', 'QQ ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
    ['AJo', 'KJo', 'QJo', 'JJ ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
    ['ATo', 'KTo', 'QTo', 'JTo', 'TT ', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
    ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99 ', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
    ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88 ', '87s', '86s', '85s', '84s', '83s', '82s'],
    ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77 ', '76s', '75s', '74s', '73s', '72s'],
    ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66 ', '65s', '64s', '63s', '62s'],
    ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55 ', '54s', '53s', '52s'],
    ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44 ', '43s', '42s'],
    ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33 ', '32s'],
    ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22 ']
  ];

  state = {
    charts: [],
    ranges: [],
    currentChart: undefined
  };

  componentDidMount() {
    fetch('http://localhost:8000/api/charts')
      .then(res => res.json())
      .then(charts => {
        this.setState({
          charts: charts,
          currentChart: charts[0]
        })
      });
      
    fetch(`http://localhost:8000/api/ranges`)
      .then(res => res.json())
      .then(ranges => {
        this.setState({ranges: ranges})
      });
  }

  handleSelectChart = (chart) => {
    this.setState({currentChart: chart})
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
      <div className="chart-view">
        <ChartSelect 
          charts={this.state.charts} 
          setChart={this.handleSelectChart}
        />
        <Chart 
          matrix={this.matrix}
          ranges={currentRanges}
        />
        <ChartLegend
          currentChart={this.state.currentChart}
          ranges={currentRanges}
        />
      </div>
    );
  } 
}