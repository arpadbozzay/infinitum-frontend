import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";

class Settings extends React.Component {
    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h1>Settings</h1>
                </main>
            </div>
        );
    }
}
export default Settings;