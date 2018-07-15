import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import ReactRouter from './router/router'

ReactDOM.render(
    <Router>
        <ReactRouter/>
    </Router>
    , document.getElementById('root'));




//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
