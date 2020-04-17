import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        user: state.rootReducer
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

class ConnectedRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            personalId: "",
            birthday: "",
            password: "",
            phoneNumber: "",
            address: "",
            QRCode: ""
        }
    }

    registrate = () => {
        console.log(this.state);
        fetch('http://localhost:8080/user/registration', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.text())
            .then(text => {
                console.log(text);
                localStorage.setItem("username", text);
                this.props.setUserName(text);
                window.location.replace("http://localhost:3000/registrationconfirm");
            })
            .catch(e => console.log(e));
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                                <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                    success="right" value={this.state.name} onChange={(e) => this.handleChange("name", e)} />
                                <MDBInput label="Your email" icon="envelope" group type="text" validate error="wrong"
                                    success="right" value={this.state.email} onChange={(e) => this.handleChange("email", e)} />
                                <MDBInput label="Your personal id" icon="address-card" group type="text" validate error="wrong"
                                    success="right" value={this.state.personalId} onChange={(e) => this.handleChange("personalId", e)} />
                                <MDBInput label="Your birthday" icon="birthday-cake" group type="date" validate error="wrong"
                                    success="right" value={this.state.birthday} onChange={(e) => this.handleChange("birthday", e)} />
                                <MDBInput label="Your password" icon="lock" group type="password" validate
                                    value={this.state.password} onChange={(e) => this.handleChange("password", e)} />
                                <MDBInput label="Your phoneNumber" icon="mobile-alt" group type="text" validate error="wrong"
                                    success="right" value={this.state.phoneNumber} onChange={(e) => this.handleChange("phoneNumber", e)} />
                                <MDBInput label="Your address" icon="location-arrow" group type="text" validate
                                    error="wrong" success="right" value={this.state.address} onChange={(e) => this.handleChange("address", e)} />
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.registrate} color="primary">Register</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

const Registration = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedRegistration);

export default Registration;