import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chart from '../Chart/Chart';
import RangeForm from '../RangeForm/RangeForm';
import config from '../config';


class ChartForm extends Component {
  state = {
    chart: {id: undefined, chart_name: ''},
    ranges: [],
    newRangeName: '',
    currentRange: undefined
  }

  componentDidMount() {
    if (this.props.chart.id) {
      this.setState({
        chart: this.props.chart,
        ranges: this.props.ranges,
        currentRange: this.props.ranges[0]
      })
    }
  }

  handleChartNameChange = (e) => {
    this.setState({ chart: 
      {
        chart_name: e.target.value,
        id: this.state.chart.id
      } 
    });
  }

  handleRangeNameChange = (e) => {
    this.setState({newRangeName: e.target.value});
  }

  handleNewChartSubmit = (e) => {
    const method = this.state.chart.id ? 'PATCH' : 'POST';
    const idURL = this.state.chart.id ? `/${this.state.chart.id}` : '';
    const fields = { chart_name: this.state.chart.chart_name }

    fetch(`${config.baseURL}/charts${idURL}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(res => res.json())
    .then(chart => {
      this.props.selectChart(chart);
      this.props.addChart(chart);
      const rangesToPatch = this.state.ranges.filter(range => range.id)
      const rangesToPost = this.state.ranges.filter(range => !range.id)
      .map(range => {
        range.chart_id = chart.id;
        return range;
      });
      
      if (rangesToPost.length > 0) {
        fetch(`${config.baseURL}/ranges`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rangesToPost)
        })
        .then(res => res.json())
        .then(ranges => {
          this.props.addRanges(ranges);
        });
      }

      if (rangesToPatch.length > 0) {
        Promise.all(
          rangesToPatch.map(range => {
            const { range_name, color, coords, chart_id } = range;
            const fields = {range_name, color, coords, chart_id};

            return fetch(`${config.baseURL}/ranges/${range.id}`, {
              method: 'PATCH',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(fields)
            })
            .then(res => res.json())
          })
        )
        .then(res => {
          const ranges = res.map(e => e[0])
          this.props.editRanges(ranges);
        });
      }
    }) 
    this.props.toggleEditing();
  }


  clearForm = () => {
    this.setState({
      chart: {chart_name: ''},
      ranges: [],
      newRangeName: '',
      currentRange: undefined
    })
  }

  createRange = (e) => {
    e.preventDefault();

    this.setState(
      {
        ranges: [
          ...this.state.ranges, 
          {
            chart_id: this.state.chartId,
            color: '',
            coords: [],
            range_name: this.state.newRangeName
          }
        ],
        newRangeName: ''
      }
    )
  }

  updateRange = (range, index) => {
    const ranges = [...this.state.ranges];
    ranges[index] = range;
    this.setState({ranges: ranges});
  }

  updateRanges = (ranges) => {
    this.setState({ranges: ranges});
  }

  deleteRange = (index) => {
    this.setState({
      ranges: this.state.ranges.filter((range, i) => index !== i)
    });
  }

  setRange = (index) => {
    this.setState({currentRange: index});
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  
  render() {
    let title = 'New Chart'
    if (this.props.chart.id) {
      title = 'Edit Chart'
    }

    return (
      <div className="chart-view">
        <h2>{title}</h2>
        <Chart 
          ranges={this.state.ranges}
          updateRanges={this.updateRanges}
          currentRange={this.state.currentRange}
        />
        <form className="chart-name-form">
          <input 
            type="text"
            id="chart-name-input"
            placeholder='Chart Name'
            value={this.state.chart.chart_name}
            onChange={this.handleChartNameChange}
          />
        </form>
        <div className="chart-toolbar">
          <RangeForm
            ranges={this.state.ranges}
            newRangeName={this.state.newRangeName}
            handleRangeNameChange={this.handleRangeNameChange}
            createRange={this.createRange}
            updateRange={this.updateRange}
            deleteRange={this.deleteRange}
            setRange={this.setRange}
            currentRange={this.state.currentRange}
          />
        </div>
        <button
          className="submit-chart-btn"
          onClick={this.handleNewChartSubmit}
        >
          Submit Chart
        </button>
        <button
          className="cancel-edit-btn"
          onClick={this.props.toggleEditing}
        >
          Cancel Edit
        </button>
      </div>
    );
  }
}

export default withRouter(ChartForm);