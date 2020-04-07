import React, { Component } from "react";
import { MDBNavbar, MDBNavbarNav } from "mdbreact";

class TopNavigation extends Component {
    render() {
        return (
            <div>
                <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                    <MDBNavbarNav>
                        <h1>Infinitum</h1>
                    </MDBNavbarNav>
                </MDBNavbar>
            </div>
        );
    }
}

export default TopNavigation;