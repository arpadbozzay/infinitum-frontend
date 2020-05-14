import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
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
import AdminBankAccounts from "./admin/AdminBankAccounts";
import AdminUsers from "./admin/AdminUsers";
import PrivateRoute from "./PrivateRoute";
import { getCookie, deleteAllCookies } from "../common";

class Routes extends Component {
    handleLogout() {
        deleteAllCookies();
    }

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    {getCookie("jwtToken") ? <BankAccounts /> : <Home />}
                </Route>
                <Route path="/registration" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/registrationconfirm" component={ConfirmRegistration} />
                <PrivateRoute pageType="customer" userType={getCookie("userType")} path="/accounts" component={BankAccounts} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={getCookie("userType")} path="/transactions" component={Transactions} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={getCookie("userType")} path="/loans" component={Loans} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={getCookie("userType")} path="/debits" component={Debits} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="customer" userType={getCookie("userType")} path="/settings" component={Settings} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="admin" userType={getCookie("userType")} path="/admin/accounts" component={AdminBankAccounts} handleLogout={this.handleLogout} />
                <PrivateRoute pageType="admin" userType={getCookie("userType")} path="/admin/users" component={AdminUsers} handleLogout={this.handleLogout} />
                <Route path="/admin" component={AdminLogin} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
export default Routes;