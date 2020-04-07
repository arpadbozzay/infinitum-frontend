import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        user: state
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setUserName: (name) => {
            dispatch({
                type: "CHANGE_USER_NAME",
                payload: name
            });
        }
    };
};

class ConnectedTransactions extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.user);
    }
    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h1>Transactions</h1>
                    <h2>{this.props.user.username}</h2>
                </main>
            </div>
        );
    }
}

const Transactions = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedTransactions);

export default Transactions;