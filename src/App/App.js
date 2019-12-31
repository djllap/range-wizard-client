import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import ChartView from '../ChartView/ChartView';

class App extends Component {
  
  render() {
    return (
      <main className='App'>
        <BrowserRouter>
          <Route path="/"
            component={Header}
          />
          <Route path="/" exact
            component={Landing}
          />
          <Route path="/charts"
            component={ChartView}
          />
        </BrowserRouter>
      </main>
    );
  }
}

export default App;