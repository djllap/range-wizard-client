import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import { BrowserRouter, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/"
            component={Landing}
          />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});