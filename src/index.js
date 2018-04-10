import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import AppRouter from './appRouter/appRouter';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(<BrowserRouter><AppRouter /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
