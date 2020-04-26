import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Registration from './account/Registration';
import Login from './account/Login';
import ConfirmRegistration from './account/ConfirmRegistration';
import Home from './account/Home';
import NotFound from './NotFound';
import AdminLogin from "./admin/AdminLogin";
import BankAccounts from "./business/BankAccounts";
import Transactions from "./business/Transactions";
import Settings from "./business/Settings";
import Loans from "./business/Loans";
import Debits from "./business/Debits";
import AdminHome from "./admin/AdminHome";
import AdminBankAccounts from "./admin/AdminBankAccounts";
import AdminUsers from "./admin/AdminUsers";
import PrivateRoute from "./PrivateRoute";

class Routes extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout() {
        console.log("dfdsf");
        localStorage.removeItem("userType");
        localStorage.removeItem("username");
        localStorage.removeItem("jwtToken");
        //this.props.history.push("/");
    }

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    {localStorage.getItem("jwtToken") ? <BankAccounts /> : <Home />}
                </Route>
                <Route path="/registration" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/registrationconfirm" component={ConfirmRegistration} />
                <PrivateRoute pageType="customer" userType={localStorage.getItem("userType")} path="/accounts" component={BankAccounts} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={localStorage.getItem("userType")} path="/transactions" component={Transactions} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={localStorage.getItem("userType")} path="/loans" component={Loans} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={localStorage.getItem("userType")} path="/debits" component={Debits} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={localStorage.getItem("userType")} path="/settings" component={Settings} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="admin" userType={localStorage.getItem("userType")} path="/admin/accounts" component={AdminBankAccounts} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="admin" userType={localStorage.getItem("userType")} path="/admin/users" component={AdminUsers} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="admin" userType={localStorage.getItem("userType")} path="/admin/home" component={AdminHome} handleLogout={this.handleLogout} />
                <Route path="/admin" component={AdminLogin} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
export default Routes;