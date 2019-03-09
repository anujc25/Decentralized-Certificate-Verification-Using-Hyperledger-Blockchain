import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import BrowserRouters from './components/BrowserRouters';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
    <BrowserRouters />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
