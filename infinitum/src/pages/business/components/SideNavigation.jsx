import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBBtn } from "mdbreact";
import { NavLink } from "react-router-dom";

class SideNavigation extends Component {
    logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userType");
        window.location.replace("http://localhost:3000/");
    }

    render() {
        return (
            <div className="sidebar-fixed position-fixed">
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
                    <MDBBtn onClick={this.logout}>Logout</MDBBtn>
                </MDBListGroup>
            </div>
        );
    }
}
export default SideNavigation;