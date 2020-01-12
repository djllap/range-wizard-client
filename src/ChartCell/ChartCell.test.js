import React from 'react';
import ReactDOM from 'react-dom';
import ChartCell from './ChartCell';
import { ranges } from '../test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartCell 
      ranges={ranges}
      coords='0,0'
      hand='AA'
    />, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});