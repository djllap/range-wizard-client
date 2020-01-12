import React from 'react';
import ReactDOM from 'react-dom';
import RangeForm from './RangeForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RangeForm ranges={[]}/>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});