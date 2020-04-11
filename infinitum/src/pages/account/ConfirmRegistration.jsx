import React from "react";
import { MDBBtn } from 'mdbreact';
const fetch = require('node-fetch');

class ConfirmRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            QRCode: "",
            username: ""
        }
        fetch('http://localhost:8080/user/registration/confirm',
            { method: "POST", body: localStorage.getItem("username") }
        )
            .then(res => res.text())
            .then(text => {
                console.log(text);
                this.setState({
                    QRCode: text
                });
            })
            .catch(e => console.log(e));
    }

    confirm() {
        window.location.replace("http://localhost:3000/login");

    }
    render() {
        return (
            <div>
                <h1>Your QR code</h1>
                <img src={this.state.QRCode} alt="QR code should be here.." />
                <h1>Your username</h1>
                <h3>{localStorage.getItem("username")}</h3>
                <MDBBtn onClick={this.confirm} color="primary">Okay, I got it</MDBBtn>
            </div>
        );
    }
}
export default ConfirmRegistration;