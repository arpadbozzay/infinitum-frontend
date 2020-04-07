import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Registration from '../Registration';
import Login from '../Login';
import ConfirmRegistration from '../ConfirmRegistration';
import Home from '../Home';
import NotFound from '../NotFound';
import Welcome from "../Welcome";
import Accounts from "../Accounts";
import Transactions from "../Transactions";
import Settings from "../Settings";
import Credits from "../Credits";
import Debits from "../Debits";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    {localStorage.getItem("jwtToken") ? <Welcome /> : <Home />}
                </Route>
                <Route path="/registration" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/registrationconfirm" component={ConfirmRegistration} />
                <Route path="/home" component={Home} />
                <Route path="/accounts" component={Accounts} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/credits" component={Credits} />
                <Route path="/debits" component={Debits} />
                <Route path="/settings" component={Settings} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
export default Routes;