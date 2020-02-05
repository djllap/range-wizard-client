import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import ChartName from '../ChartName';
import RangeForm from '../RangeForm/RangeForm';
import ChartLegend from '../ChartLegend';
import ErrorBox from '../ErrorBox/ErrorBox';
import config from '../config';
import './ChartForm.css'

function ChartForm(props) {
  const [allCharts, setAllCharts] = useState([]);
  const [allRanges, setAllRanges] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentChart, setCurrentChart] = useState({id: ''});
  const [currentRanges, setCurrentRanges] = useState([]);
  const [currentRangeIndex, setCurrentRangeIndex] = useState((props.ranges.length > 0) ? 0 : undefined);
  const [mouseDown, setMouseDown] = useState(false);
  const [addingToRange, setAddingToRange] = useState(true);
  const [error, setError] = useState(undefined);
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => { // Get charts and ranges from api on mount   
    fetch(`${config.baseURL}/charts`)
      .then(res => res.json())
      .then(charts => {
        if (charts.length > 0) {
          setAllCharts(charts);
          setCurrentChart(charts[0])
        }
      })
      .catch(e => {
        const error = Object.entries(e).length ? e : 'Failed to load charts';
        setError(error)
      });

      fetch(`${config.baseURL}/ranges`)
        .then(res => res.json())
        .then(ranges => {
          setAllRanges(ranges)
        })
        .catch(e => {
          const error = Object.entries(e).length ? e : 'Failed to load ranges';
          setError(error)
        });
      
  }, []);

//    _____ _        _         ______                _   _                 
//   / ____| |      | |       |  ____|              | | (_)                
//  | (___ | |_ __ _| |_ ___  | |__ _   _ _ __   ___| |_ _  ___  _ __  ___ 
//   \___ \| __/ _` | __/ _ \ |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//   ____) | || (_| | ||  __/ | |  | |_| | | | | (__| |_| | (_) | | | \__ \
//  |_____/ \__\__,_|\__\___| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

  const addChart = (chart) => {
    setAllCharts([...allCharts, chart]);
  }

  const editChart = (chart) => {
    setAllCharts(
      [...allCharts].map(c => {
        return (c.id === chart.id) ? chart : c;
      })
    );
  }

  const deleteChart = (id) => {
    const filteredCharts = allCharts.filter(chart => chart.id !== id);
    const chartIndex = allCharts.findIndex(chart => chart.id === id);
    const index = (chartIndex === 0) ? 1 : chartIndex - 1;
    setCurrentChart(allCharts[index]);
    setAllCharts(filteredCharts);
  }

  const addRanges = (newRanges) => {
    setAllRanges([...allRanges, ...newRanges]);
  }

  const editRanges = (rangesToEdit) => {
    const rangesToEditIds = rangesToEdit.map(range => range.id);
    const editedRanges = allRanges.map(range => {
      return rangesToEditIds.includes(range.id) ?
        rangesToEdit.find(r => r.id === range.id )
        :
        range;
    });

    setAllRanges(editedRanges);
  }

  const deleteRange = (id) => {
    const filteredRanges = allRanges.filter(range => range.id !== id);
    setAllRanges(filteredRanges);
  }

  const toggleEditing = () => {
    setEditing(!editing);
    if (!currentChart.id && allCharts.length > 0) {
      setCurrentChart(allCharts[0]);
    }
  }

//   _____                      _____                 _   _                 
//  |  ______  _ __ _ __ ___   |  ____   _ _ __   ___| |_(_) ___  _ __  ___ 
//  | |_ / _ \| '__| '_ ` _ \  | |_ | | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//  |  _| (_) | |  | | | | | | |  _|| |_| | | | | (__| |_| | (_) | | | \__ \
//  |_|  \___/|_|  |_| |_| |_| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

  const handleChartNameChange = (e) => { // Controls chart name input
    setCurrentChart({
        chart_name: e.target.value,
        id: currentChart.id
      });
  }

  const handleFormSubmit = (e) => {
    if (!currentChart.chart_name) {
      setError('Chart must have a name');
      return;
    }
    let error = false;
    currentRanges.forEach(range => {
      if (!range.range_name) {
        setError('All ranges must have a name');
        error = true;
      }
    })
    if (error) return;
    
    let method;
    let idURL;
    let chartMethod;
    const fields = { chart_name: currentChart.chart_name };

    if (currentChart.id) {
      method = 'PATCH';
      idURL = `/${currentChart.id}`;
      chartMethod = editChart;
    } else {
      method = 'POST';
      idURL = '';
      chartMethod = addChart;
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
      setCurrentChart(chart);
      chartMethod(chart);
      const rangesToPatch = currentRanges.filter(range => range.id)
      const rangesToPost = currentRanges.filter(range => !range.id)
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
          addRanges(ranges);
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
          editRanges(ranges);
        });
      }

      if (idsToDelete.length > 0) {
        idsToDelete.forEach(id => {
          fetch(`${config.baseURL}/ranges/${id}`, {
            method: 'DELETE'
          })
          .then(res => {
            deleteRange(id);
          })
        })
      }
    })
    .then(() => {
      toggleEditing();
    })
    .catch(e => {
      setError(e.statusText);
    })
  }

  const createFormRange = (e) => {
    e.preventDefault();

    const newRange = {
      chart_id: currentChart.id,
      color: 'rgb(255, 51, 51)',
      coords: [],
      range_name: 'Range name'
    };

    setCurrentRanges([...currentRanges, newRange])
  }

  const updateFormRange = (range, index) => {
    const newRanges = [...currentRanges];
    newRanges[index] = range;
    setCurrentRanges(newRanges);
  }

  const deleteFormRange = (index) => {
    const idToDelete = currentRanges[index].id;
    if (idToDelete) {
      setCurrentRanges(currentRanges.filter((range, i) => index !== i));
      setIdsToDelete([...idsToDelete, idToDelete]);
    } else {
      setCurrentRanges(currentRanges.filter((range, i) => index !== i));
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
    title = `Editing ${currentChart.chart_name}`
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
          editing={editing}
          ranges={currentRanges}
          updateRanges={setCurrentRanges}
          currentRange={currentRangeIndex}
          handleChartMouseDown={handleChartMouseDown}
          handleChartMouseUp={handleChartMouseUp}
          mouseDown={mouseDown}
          setAddingToRange={setAddingToRange}
          addingToRange={addingToRange}
        />
        {errorBox}
        <ChartName
          charts={allCharts}
          setChart={setCurrentChart}
          currentChart={currentChart}
          handleChartNameChange={handleChartNameChange}
        />
        
        <div className="chart-toolbar">
          <ChartLegend
            editing={editing}
            ranges={currentRanges}
            createRange={createFormRange}
            updateRange={updateFormRange}
            deleteRange={deleteFormRange}
            setRange={setCurrentRangeIndex}
            currentRange={currentRangeIndex}
          />
          <div className="button-col">
            <button 
              className="chart-btn"
              onClick={createFormRange}
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
              onClick={handleFormSubmit}
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