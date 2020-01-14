import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import RangeForm from '../RangeForm/RangeForm';
import ErrorBox from '../ErrorBox/ErrorBox';
import config from '../config';
import './ChartForm.css'

function ChartForm(props) {
  const [chart, setChart] = useState(props.chart);
  const [ranges, setRanges] = useState(props.ranges);
  const [currentRangeIndex, setCurrentRangeIndex] = useState((props.ranges.length > 0) ? 0 : undefined);
  const [mouseDown, setMouseDown] = useState(false);
  const [addingToRange, setAddingToRange] = useState(true);
  const [error, setError] = useState(undefined);
  const [idsToDelete, setIdsToDelete] = useState([]);

  // useEffect(() => {
  //   if (props.chart) setChart(props.chart);
  //   if (props.ranges) setRanges(props.ranges);
  //   setCurrentRangeIndex((props.ranges.length > 0) ? 0 : undefined)
  // }, [props.chart, props.ranges])

  const handleChartNameChange = (e) => {
    setChart({
        chart_name: e.target.value,
        id: chart.id
      });
  }

  const handleNewChartSubmit = (e) => {
    if (!chart.chart_name) {
      setError('Chart must have a name');
      return;
    }
    let error = false;
    ranges.forEach(range => {
      if (!range.range_name) {
        setError('All ranges must have a name');
        error = true;
      }
    })
    if (error) return;
    
    let method;
    let idURL;
    let chartMethod;
    const fields = { chart_name: chart.chart_name };

    if (chart.id) {
      method = 'PATCH';
      idURL = `/${chart.id}`;
      chartMethod = props.editChart;
    } else {
      method = 'POST';
      idURL = '';
      chartMethod = props.addChart;
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
      props.selectChart(chart);
      chartMethod(chart);
      const rangesToPatch = ranges.filter(range => range.id)
      const rangesToPost = ranges.filter(range => !range.id)
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
          props.addRanges(ranges);
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
          props.editRanges(ranges);
        });
      }

      if (idsToDelete.length > 0) {
        idsToDelete.forEach(id => {
          fetch(`${config.baseURL}/ranges/${id}`, {
            method: 'DELETE'
          })
          .then(res => {
            props.deleteRange(id);
          })
        })
      }
    })
    .then(() => {
      props.toggleEditing();
    })
    .catch(e => {
      setError(e.statusText);
    })
  }

  const createRange = (e) => {
    e.preventDefault();

    const newRange = {
      chart_id: chart.id,
      color: 'rgb(255, 51, 51)',
      coords: [],
      range_name: 'Range name'
    };

    setRanges([...ranges, newRange])
  }

  const updateRange = (range, index) => {
    const newRanges = [...ranges];
    newRanges[index] = range;
    setRanges(newRanges);
  }

  const deleteRange = (index) => {
    const idToDelete = ranges[index].id;
    if (idToDelete) {
      setRanges(ranges.filter((range, i) => index !== i));
      setIdsToDelete([...idsToDelete, idToDelete]);
    } else {
      setRanges(ranges.filter((range, i) => index !== i));
    }
  }

  const handleChartMouseDown = (e) => {
    setMouseDown(true);
  }

  const handleChartMouseUp = (e) => {
    setMouseDown(false);
  }
  
  let title = 'New Chart'
  if (props.chart.id) {
    title = `Editing ${chart.chart_name}`
  }
  const errorBox = (error) ? 
    <ErrorBox error={error} setError={(e) => setError({error: e})} />
    :
    '';

  return (
    <div className="big-container">
      <div className="chart-view">
        <h2>{title}</h2>
        <Chart 
          ranges={ranges}
          updateRanges={setRanges}
          currentRange={currentRangeIndex}
          handleChartMouseDown={handleChartMouseDown}
          handleChartMouseUp={handleChartMouseUp}
          mouseDown={mouseDown}
          setAddingToRange={setAddingToRange}
          addingToRange={addingToRange}
        />
        {errorBox}
        <form className="chart-name-form">
          <input
            className="chart-name-input"
            type="text"
            size="0"
            id="chart-name-input"
            placeholder='Chart Name'
            value={chart.chart_name}
            onChange={handleChartNameChange}
          />
        </form>
        <div className="chart-toolbar">
          <RangeForm
            ranges={ranges}
            createRange={createRange}
            updateRange={updateRange}
            deleteRange={deleteRange}
            setRange={setCurrentRangeIndex}
            currentRange={currentRangeIndex}
          />
          <div className="button-col">
            <button 
              className="chart-btn"
              onClick={createRange}
            >
              Add Range
            </button>
            <button
              className="cancel-form-btn chart-btn"
              onClick={props.toggleEditing}
            > 
              Cancel
            </button>
            <button
              className="submit-chart-btn chart-btn"
              onClick={handleNewChartSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartForm;