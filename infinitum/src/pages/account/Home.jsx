import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
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
            </div>
        );
    }
}
export default Home;