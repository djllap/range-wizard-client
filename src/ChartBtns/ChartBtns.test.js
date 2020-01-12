import React from 'react';
import ReactDOM from 'react-dom';
import ChartBtns from './ChartBtns';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ChartBtns 
      setChart={() => ''}
      deleteChart={() => ''}
    />, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});