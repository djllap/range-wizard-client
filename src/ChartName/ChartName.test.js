import React from 'react';
import ReactDOM from 'react-dom';
import ChartSelect from './ChartSelect';
import { charts } from '../test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChartSelect charts={charts}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});