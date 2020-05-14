import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBBtn } from "mdbreact";
import { NavLink } from "react-router-dom";
import { deleteAllCookies, getCookie } from "../../common";


class SideNavigation extends Component {
    logout = () => {
        deleteAllCookies();
        (getCookie("userType") === "ROLE_WORKER" || getCookie("userType") === "ROLE_ADMIN") ?
            window.location.replace("http://localhost:3000/admin") :
            window.location.replace("http://localhost:3000");
    }

    render() {
        return (
            <div className="sidebar-fixed position-fixed">
                {(getCookie("userType") === "ROLE_CUSTOMER") &&

                    <MDBListGroup className="list-group-flush">
                        <NavLink
                            exact={true}
                            to="/accounts"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="wallet" className="mr-3" />
                            Accounts
                        </MDBListGroupItem>
                        </NavLink>
                        <NavLink
                            to="/transactions"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="exchange-alt" className="mr-3" />
                            Transactions
                        </MDBListGroupItem>
                        </NavLink>
                        <NavLink
                            to="/loans"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="credit-card" className="mr-3" />
                            Loans
                        </MDBListGroupItem>
                        </NavLink>
                        <NavLink
                            to="/debits"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="chart-bar" className="mr-3" />
                            Debits
                        </MDBListGroupItem>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="user-cog" className="mr-3" />
                            Settings
                        </MDBListGroupItem>
                        </NavLink>
                    </MDBListGroup>
                }
                {(getCookie("userType") === "ROLE_ADMIN" || getCookie("userType") === "ROLE_WORKER") &&
                    <MDBListGroup className="list-group-flush">
                        <NavLink
                            exact={true}
                            to="/admin/users"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="users-cog" className="mr-3" />
                                    Users
                                </MDBListGroupItem>
                        </NavLink>
                        <NavLink
                            to="/admin/accounts"
                            activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="coins" className="mr-3" />
                                    Bank accounts
                                </MDBListGroupItem>
                        </NavLink>
                    </MDBListGroup>
                }
                <MDBBtn onClick={this.logout}>Logout</MDBBtn>
            </div >
        );
    }
}
export default SideNavigation;