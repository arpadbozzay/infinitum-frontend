import React, { Component } from "react";
import { MDBNotification } from "mdbreact";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        notification: state,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setNotificationMsg: () => {
            dispatch({
                type: "CHANGE_NOTIF_MSG",
                payload: ""
            });
        },
        hideNotifcationMsg: () => {
            dispatch({
                type: "SHOW_NOTIF",
                payload: false
            });
        }
    };
};

class ConnectedNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            showToast: false
        }
    }

    render() {
        let geci = <div></div>;
        const element = <MDBNotification
            show
            fade
            icon="envelope"
            className="notificationMsg"
            iconClassName="green-text"
            title="New Message"
            message={this.props.notification.notificationMsg}
            text="just now"
            autohide={5000}
        />;
        if (this.props.notification.showNotification) {
            console.log("dsfsf");
            //geci = element;
        }
        return (
            geci
        );
    }
}

const Notifications = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNotification);

export default Notifications;

