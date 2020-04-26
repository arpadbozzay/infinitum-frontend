import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { connect } from "react-redux";
import { registrate } from "../../api/apiCalls";

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
            errorName: false,
            email: "",
            errorEmail: false,
            personalId: "",
            errorPersonalId: false,
            birthday: "",
            errorBirthday: false,
            password: "",
            errorPassword: false,
            confirmPassword: "",
            errorConfirmPassword: false,
            phoneNumber: "",
            errorPhoneNumber: false,
            address: "",
            errorAddress: false
        }
    }

    validateFields = () => {
        const errorOnName = this.state.name.length === 0 ? true : false;
        const errorOnEmail = this.state.email.length === 0 ? true : false;
        const errorOnPhoneNumber = this.state.phoneNumber.length === 0 ? true : false;
        const errorOnPersonalId = this.state.personalId.length === 0 ? true : false;
        const errorOnAddress = this.state.address.length === 0 ? true : false;
        const errorOnBirthday = this.state.birthday.length === 0 ? true : false;
        const errorOnPassword = this.state.password.length === 0 ? true : false;
        const errorOnConfirmedPassword = this.state.confirmPassword.length === 0 || this.state.password !== this.state.confirmPassword ? true : false
        this.setState({
            errorName: errorOnName,
            errorEmail: errorOnEmail,
            errorPersonalId: errorOnPersonalId,
            errorBirthday: errorOnBirthday,
            errorPassword: errorOnPassword,
            errorConfirmPassword: errorOnConfirmedPassword,
            errorPhoneNumber: errorOnPhoneNumber,
            errorAddress: errorOnAddress
        });
        if (!errorOnName && !errorOnEmail && !errorOnPhoneNumber &&
            !errorOnPersonalId && !errorOnAddress && !errorOnBirthday &&
            !errorOnPassword && !errorOnConfirmedPassword) {
            this.registrate();
        }
    }

    registrate = async () => {
        const registrationRequest = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            personalId: this.state.personalId,
            address: this.state.address,
            birthday: this.state.birthday,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        await registrate(registrationRequest);
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    render() {
        return (
            <div className="homeContainer">
                <MDBContainer>
                    <MDBRow center>
                        <MDBCol md="6">
                            <p className="h5 text-center accountColor mb-4">Sign up</p>
                            <div>
                                <MDBInput label="Your name" icon="user" group type="text" className={this.state.errorName ? "invalid" : ""}
                                    value={this.state.name} onChange={(e) => this.handleChange("name", e)} />
                                <MDBInput label="Your email" icon="envelope" group type="text" className={this.state.errorEmail ? "invalid" : ""}
                                    value={this.state.email} onChange={(e) => this.handleChange("email", e)} />
                                <MDBInput label="Your personal id" icon="address-card" group type="text" className={this.state.errorPersonalId ? "invalid" : ""}
                                    value={this.state.personalId} onChange={(e) => this.handleChange("personalId", e)} />
                                <MDBInput label="Your birthday" icon="birthday-cake" group type="date" className={this.state.errorBirthday ? "invalid" : ""}
                                    value={this.state.birthday} onChange={(e) => this.handleChange("birthday", e)} />
                                <MDBInput label="Your password" icon="lock" type="password" className={this.state.errorPassword ? "invalid" : ""}
                                    value={this.state.password} onChange={(e) => this.handleChange("password", e)} />
                                <MDBInput label="Your confirm password" icon="lock" type="password" className={this.state.errorConfirmPassword ? "invalid" : ""}
                                    value={this.state.confirmPassword} onChange={(e) => this.handleChange("confirmPassword", e)} />
                                <MDBInput label="Your phoneNumber" icon="mobile-alt" group type="text" className={this.state.errorPhoneNumber ? "invalid" : ""}
                                    value={this.state.phoneNumber} onChange={(e) => this.handleChange("phoneNumber", e)} />
                                <MDBInput label="Your address" icon="location-arrow" group type="text" className={this.state.errorAddress ? "invalid" : ""}
                                    value={this.state.address} onChange={(e) => this.handleChange("address", e)} />
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.validateFields} color="primary">Register</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        );
    }
}

const Registration = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedRegistration);

export default Registration;