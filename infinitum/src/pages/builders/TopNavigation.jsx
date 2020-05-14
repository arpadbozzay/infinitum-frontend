import React, { Component } from "react";
import { MDBNavbar, MDBNavbarNav } from "mdbreact";
import { getCookie } from "../../common";

class TopNavigation extends Component {
    render() {
        return (
            <div>
                <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                    <MDBNavbarNav center="true">
                        <a href="/">
                            <h1>Infinitum</h1>
                        </a>
                    </MDBNavbarNav>
                    <div className="navbarUsername">
                        <h3>{getCookie("username")}</h3>
                    </div>
                </MDBNavbar>
            </div>
        );
    }
}

export default TopNavigation;