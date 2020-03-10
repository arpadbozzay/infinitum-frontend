import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App'
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/registration">Registration</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            {/* ProtectedRoutes */}
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/registration" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
