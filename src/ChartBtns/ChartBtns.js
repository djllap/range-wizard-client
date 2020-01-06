import React from 'react';
import config from '../config';

export default function ChartBtns(props) {
  const handleNewClick = () => {
    props.setChart({id: undefined});
    props.toggleEditing();
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();

    fetch(`${config.baseURL}/charts/${props.chartId}`, {method: 'DELETE'})
    .then(() => {
      props.deleteChart(props.chartId);
    })
  }

  const handleEditClick = (e) => {
    props.toggleEditing();
  }

  return (
    <div className="button-col">
      <button
        className="new-btn"
        onClick={handleNewClick}
      >
        New Chart
      </button>
      <button
        className="edit-btn"
        onClick={handleEditClick}
      >
        Edit Chart
      </button>
      <button
        className='del-btn'
        onClick={handleDeleteClick}
      >
        Delete Chart
      </button>

    </div>
  );
}