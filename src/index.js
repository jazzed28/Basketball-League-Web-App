import React from 'react';
import ReactDOM from 'react-dom';
import App from './conponents/App';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
);