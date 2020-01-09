import React from 'react';
import './ChartCell.css';

export default function ChartCell(props) {
  const { ranges, currentRange, coords, updateRanges} = props;

  const addCellToRange = (e, adding = props.addingToRange) => {
    // copies ranges
    const newRanges = [...ranges].map(r => {
      return {
        chart_id: r.chart_id,
        color: r.color,
        coords: [...r.coords],
        id: r.id,
        range_name: r.range_name
      };
    });
    
    // Deletes coords from all ranges (except current range when adding)
    newRanges.forEach((range, i) => {
      const updatedCoords = 
        (
          (!adding &&
            i === currentRange &&
            ranges[currentRange].coords.includes(coords))
          ||
          (adding &&
            i !== currentRange
          )
        ) ?
        range.coords.filter(xy => xy !== coords)
        :
        range.coords;
      newRanges[i].coords = updatedCoords;
    })

    // add cell to current range if not present (unless !adding)
    if (adding && !ranges[currentRange].coords.includes(coords)) { 
      newRanges[currentRange].coords = [...newRanges[currentRange].coords, coords];
    }

    updateRanges(newRanges);
  }

  const mouseDown = (e) => {
    // sets adding to true if clicking on a coord not in the current range, 
    // and false if it is included.
    const adding = ranges[currentRange].coords.includes(coords) ? false : true;
    props.setAddingToRange(adding);
    addCellToRange(e, adding);
  }

  let hoverEvent = null;
  let mouseDownEvent = null;
  if (updateRanges && currentRange !== undefined) {
    mouseDownEvent = mouseDown;
    if (props.mouseDown) {
      hoverEvent = addCellToRange;
    }
  }

  return (
    <span 
      className="chart-cell"
      style={{backgroundColor: props.color}}
      onMouseOver={hoverEvent}
      onMouseDown={mouseDownEvent}
    >
      {props.hand}
    </span>
  );
}