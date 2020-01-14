import React from 'react';
import './RangeForm.css';

export default function RangeForm(props) {
  const colors = {
    red: '#ff3333', 
    orange: '#ff9933', 
    yellow: '#ffff33', 
    'light green': '#99ff33',
    green: '#33ff33',
    aqua: '#33ff99',
    'light blue': '#33ffff',
    'sky blue': '#3399ff',
    'dark blue': '#3333ff',
    purple: '#9933ff',
    pink: '#ff33ff',
    fusica: '#ff3399', 
    grey: '#a0a0a0'
  };

  const updateRangeColor = (range, e) => {
    const updatedRange = Object.assign(range);
    updatedRange.color = e.target.value;
    props.updateRange(updatedRange);
  }

  const updateRangeName = (range, e) => {
    const updatedRange = Object.assign(range);
    updatedRange.range_name = e.target.value;
    props.updateRange(updatedRange);
  }

  const deleteRange = (index, e) => {
    props.deleteRange(index);
  }

  const colorSelect = (range) => (
    <select 
      className="color-select"
      id={`color-select-${range.id}`}
      key={range.id}
      value={range.color}
      onChange={(e) => updateRangeColor(range, e)}
      style={{
        color: range.color,
        backgroundColor: range.color
      }}
    >
      {/*
      <option 
        value={undefined}
        style={{backgroundColor: 'inherit'}}
      >
        {' '}
      </option> */}
      {Object.entries(colors).map(entry => {
        const name = entry[0];
        const color = entry[1];

        return <option 
          value={color}
          style={{
            color: color,
            backgroundColor: color,
          }}
          key={name}
        >
          {name}
        </option>
      }
      )}
    </select>
  )

  return (
    <div className="range-form">
      <h3 className="range-form-title">Ranges</h3>
      {props.ranges.map((range, i) => (
        <div 
          className={`range-row ${props.currentRange === i ? 'selected' : ''}`}
          key={i}
          onClick={(e) => props.setRange(i, e)}
        >
          {colorSelect(range)}
          <input
            className="range-name-row-input"
            type="text"
            size="5"
            value={range.range_name}
            onChange={(e) => updateRangeName(range, e)}
          />
          <i 
            className="del-range-btn material-icons"
            onClick={(e) => deleteRange(i, e)}
          >
            {/* <i className="material-icons delete-icon"> */}
              delete
            {/* </i> */}
          </i>
        </div>
      ))}
    </div>

    
  );
};