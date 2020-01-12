import React from 'react';
import ReactDOM from 'react-dom';
import ChartView from './ChartView';
import { charts, ranges } from '../test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartView
      charts={charts}
      currentChart={charts[0]}
      ranges={ranges}
    />
  , div);
  ReactDOM.unmountComponentAtNode(div);
});