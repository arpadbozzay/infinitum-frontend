import React, { Component } from "react";
import { MDBNavbar, MDBNavbarNav } from "mdbreact";

class TopNavigation extends Component {
    render() {
        return (
            <div>
                <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                    <MDBNavbarNav center="true">
                        <a href="/">
                            <h1>Infinitum Admin</h1>
                        </a>
                    </MDBNavbarNav>
                    <div className="navbarUsername">
                        <h3>{localStorage.getItem("username")}</h3>
                    </div>
                </MDBNavbar>
            </div>
        );
    }
}

export default TopNavigation;