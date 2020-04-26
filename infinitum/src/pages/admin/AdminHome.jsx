import React from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">

                </main>
            </div>
        );
    }
}
export default AdminHome;