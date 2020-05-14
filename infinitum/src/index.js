import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./pages/Routes";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

toast.configure();

ReactDOM.render(
    <Router>
        <Routes />
    </Router>
    , document.getElementById('root'));
