import React, { Component } from 'react';
import Chart from '../Chart/Chart';
import RangeForm from '../RangeForm/RangeForm';
import ErrorBox from '../ErrorBox/ErrorBox';
import config from '../config';
import './ChartForm.css'

class ChartForm extends Component {
  state = {
    chart: {id: undefined, chart_name: ''},
    ranges: [],
    newRangeName: '',
    currentRange: undefined,
    mouseDown: false,
    addingToRange: true,
    error: undefined
  }

  componentDidMount() {
    const currentRangeIndex = (this.props.ranges.length > 0) ? 0 : undefined;

    if (this.props.chart.id) {
      this.setState({
        chart: this.props.chart,
        ranges: this.props.ranges,
        currentRange: currentRangeIndex
      });
    }
  }

  setAddingToRange = (bool) => {
    this.setState({addingToRange: bool});
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
    let method;
    let idURL;
    let chartMethod;
    const fields = { chart_name: this.state.chart.chart_name };

    if (this.state.chart.id) {
      method = 'PATCH';
      idURL = `/${this.state.chart.id}`;
      chartMethod = this.props.editChart;
    } else {
      method = 'POST';
      idURL = '';
      chartMethod = this.props.addChart;
    }

    fetch(`${config.baseURL}/charts${idURL}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(res => {
      return (res.ok ? res : Promise.reject(res))
    })
    .then(res => {
      return res.json();
    })
    .then(chart => {
      this.props.selectChart(chart);
      chartMethod(chart);
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
        // .then(res => (res.ok ? res : Promise.reject(res)))
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
            // .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json())
          })
        )
        .then(res => {
          const ranges = res.map(e => e[0])
          this.props.editRanges(ranges);
        });
      }
    })
    .then(() => {
      this.props.toggleEditing();
    })
    .catch(e => {
      this.setState({error: e.statusText});
    })
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

  handleChartMouseDown = (e) => {
    this.setState({mouseDown: true})
  }

  handleChartMouseUp = (e) => {
    this.setState({mouseDown: false})
  }
  
  render() {
    let title = 'New Chart'
    if (this.props.chart.id) {
      title = `Editing ${this.state.chart.chart_name}`
    }
    const errorBox = (this.state.error) ? 
      <ErrorBox error={this.state.error} setError={(e) => this.setState({error: e})} />
      :
      '';

    return (
      <div className="chart-view">
        <h2>{title}</h2>
        <Chart 
          ranges={this.state.ranges}
          updateRanges={this.updateRanges}
          currentRange={this.state.currentRange}
          handleChartMouseDown={this.handleChartMouseDown}
          handleChartMouseUp={this.handleChartMouseUp}
          mouseDown={this.state.mouseDown}
          setAddingToRange={this.setAddingToRange}
          addingToRange={this.state.addingToRange}
        />
        {errorBox}
        <form className="chart-name-form">
          <label 
            className="chart-name-label"
            htmlFor="chart-name-input"
          >
            Chart Name: 
          </label>
          <input
            className="chart-name-input"
            type="text"
            size="0"
            id="chart-name-input"
            placeholder='Chart Name'
            value={this.state.chart.chart_name}
            onChange={this.handleChartNameChange}
          />
        </form>
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
        <div className="chart-btns-container">
          <button
            className="cancel-form-btn chart-btn"
            onClick={this.props.toggleEditing}
          > 
            Cancel
          </button>
          <button
            className="submit-chart-btn chart-btn"
            onClick={this.handleNewChartSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default ChartForm;