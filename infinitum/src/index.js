import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./pages/Routes";
import Notification from "./pages/Notification";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { Provider } from 'react-redux'
import store from './store';

toast.configure();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes />
            <Notification />
        </Router>
    </Provider>
    , document.getElementById('root'));
