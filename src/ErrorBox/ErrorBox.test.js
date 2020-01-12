import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBox from './ErrorBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});