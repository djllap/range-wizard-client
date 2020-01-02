import React from 'react';
import { Link } from 'react-router-dom';

export default function ChartBtns(props) {
  return (
    <div className="button-col">
      <Link
        to='/charts/new'
      >
        New Chart
      </Link>
      <Link
        to={`/charts/${props.chartId}/edit`}
      >
        Edit Chart
      </Link>
      <button>
        Delete Chart
      </button>

    </div>
  );
}