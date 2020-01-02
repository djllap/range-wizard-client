import React from 'react';

export default function RangeBtns(props) {
  const colors = [
    'FF3333', 'ff9933', 'ffff33', '99ff33', '33ff33', '33ff99', '33ffff', '3399ff', '3333ff', '9933ff', 'ff33ff', 'ff33ff', 'ff3399', 'a0a0a0'
  ]

  

  const colorSelect = (range) => (
    <select 
      id={`${range.range_name}-color-select`}
      key={range.id}
      value={range.color}
    >
      {colors.map((color, i) => (
        <option 
          value="color"
          style={{
            color: color,
            backgroundColor: color,
          }}
          key={i}
        >
          color
        </option>
      ))}
    </select>
  )

  return (
    <div className="chart-legend">
      <h3>Ranges</h3>
      <div className="range-btns">
        <form
          onSubmit={props.createRange}
        >  
        <input 
          type="text"
          id="range-name-input"
          placeholder='New Range Name'
          value={props.newRangeName}
          onChange={props.handleRangeNameChange}
        />
          <button 
            className="new-range-btn"
          >
            Create
          </button>
        </form>
      </div>
      {props.ranges.map((range, i) => 
        <div className="legend-row" key={i}>
          {colorSelect(range)}
          <span className="legend-label">
            {range.range_name}
          </span>
        </div>
      )}
    </div>

    
  );
};