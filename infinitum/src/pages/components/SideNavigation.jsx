import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";

class SideNavigation extends Component {
    render() {
        return (
            <div className="sidebar-fixed position-fixed">
                <a>logo</a>
                <MDBListGroup className="list-group-flush">
                    <NavLink
                        exact={true}
                        to="/accounts"
                        activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="tachometer-alt" className="mr-3" />
                            Accounts
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink
                        to="/transactions"
                        activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="tachometer-alt" className="mr-3" />
                            Transactions
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink
                        to="/credits"
                        activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="tachometer-alt" className="mr-3" />
                            Credits
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink
                        to="/debits"
                        activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="tachometer-alt" className="mr-3" />
                            Debits
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink
                        to="/settings"
                        activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="tachometer-alt" className="mr-3" />
                            Settings
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>
            </div>
        );
    }
}
export default SideNavigation;