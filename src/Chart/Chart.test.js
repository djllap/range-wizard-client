import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import { ranges } from '../test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chart ranges={ranges}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
