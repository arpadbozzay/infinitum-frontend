import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Registration from './account/Registration';
import Login from './account/Login';
import ConfirmRegistration from './account/ConfirmRegistration';
import Home from './account/Home';
import NotFound from './NotFound';
import Welcome from "./business/Welcome";
import BankAccounts from "./business/BankAccounts";
import Transactions from "./business/Transactions";
import Settings from "./business/Settings";
import Credits from "./business/Credits";
import Debits from "./business/Debits";

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
                <Route path="/accounts" component={BankAccounts} />
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