import React from 'react';
import ReactDOM from 'react-dom';
import ChartForm from './ChartForm';
import { charts, ranges } from '../test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartForm 
      chart={charts[0]}
      ranges={ranges}
    />, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});