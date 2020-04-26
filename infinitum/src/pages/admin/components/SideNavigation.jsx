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
                    <MDBBtn onClick={this.logout}>Logout</MDBBtn>
                </MDBListGroup>
            </div>
        );
    }
}
export default SideNavigation;