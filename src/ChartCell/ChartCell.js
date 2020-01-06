import React from 'react';

export default function ChartCell(props) {
  const { ranges, currentRange, coords, updateRanges} = props;

  const addCellToRange = (e) => {
    //delete cell from all ranges
    const newRanges = [...ranges].map(r => {
      return {
        chart_id: r.chart_id,
        color: r.color,
        coords: [...r.coords],
        id: r.id,
        range_name: r.range_name
      };
    });
    
    newRanges.forEach((range, i) => {
      const updatedCoords = range.coords.filter(xy => xy !== coords);
      newRanges[i].coords = updatedCoords;
    })

    //add cell to current range if not present
    if (currentRange !== undefined && !ranges[currentRange].coords.includes(coords)) { 
      newRanges[currentRange].coords = [...newRanges[currentRange].coords, coords];
    }

    updateRanges(newRanges);
  }

  let hoverEvent = null;
  let mouseDownEvent = null;
  if (props.updateRanges && props.currentRange !== undefined) {
    mouseDownEvent = addCellToRange;
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