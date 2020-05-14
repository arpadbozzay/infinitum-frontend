import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { registrate, baseUserCall } from "../../api/apiCalls";
import { errorBasicFieldMessage, errorPasswordMatchMessage, checkBasicField, validateEmail, errorEmailFieldMessage } from "../../common";

class Registration extends React.Component {
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

    async componentDidMount() {
        await baseUserCall();
    }

    validateFields = () => {
        const errorOnName = checkBasicField(this.state.name, 3, 40);
        const errorOnEmail = validateEmail(this.state.email);
        const errorOnPhoneNumber = checkBasicField(this.state.phoneNumber, 3, 40);
        const errorOnPersonalId = checkBasicField(this.state.personalId, 3, 40);
        const errorOnAddress = checkBasicField(this.state.address, 3, 40);
        const errorOnBirthday = this.state.birthday.length === 0;
        const errorOnPassword = checkBasicField(this.state.password, 3, 40);
        const errorOnConfirmedPassword = checkBasicField(this.state.confirmPassword, 3, 40) || this.state.password !== this.state.confirmPassword ? true : false;
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
                                    value={this.state.name} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("name", e)} />
                                <MDBInput label="Your email" icon="envelope" group type="text" className={this.state.errorEmail ? "invalid" : ""}
                                    value={this.state.email} error={errorEmailFieldMessage} onChange={(e) => this.handleChange("email", e)} />
                                <MDBInput label="Your personal id" icon="address-card" group type="text" className={this.state.errorPersonalId ? "invalid" : ""}
                                    value={this.state.personalId} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("personalId", e)} />
                                <MDBInput label="Your birthday" icon="birthday-cake" group type="date" className={this.state.errorBirthday ? "invalid" : ""}
                                    value={this.state.birthday} error="Birthday field is required!" onChange={(e) => this.handleChange("birthday", e)} />
                                <MDBInput label="Your password" icon="lock" type="password" className={this.state.errorPassword ? "invalid" : ""}
                                    value={this.state.password} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("password", e)} />
                                <MDBInput label="Your confirm password" icon="lock" type="password" className={this.state.errorConfirmPassword ? "invalid" : ""}
                                    value={this.state.confirmPassword} error={errorPasswordMatchMessage} onChange={(e) => this.handleChange("confirmPassword", e)} />
                                <MDBInput label="Your phoneNumber" icon="mobile-alt" group type="text" className={this.state.errorPhoneNumber ? "invalid" : ""}
                                    value={this.state.phoneNumber} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("phoneNumber", e)} />
                                <MDBInput label="Your address" icon="location-arrow" group type="text" className={this.state.errorAddress ? "invalid" : ""}
                                    value={this.state.address} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("address", e)} />
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

export default Registration;