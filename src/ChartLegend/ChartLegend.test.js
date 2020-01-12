import React from 'react';
import ReactDOM from 'react-dom';
import ChartLegend from './ChartLegend';
import { ranges } from '../test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChartLegend ranges={ranges}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});