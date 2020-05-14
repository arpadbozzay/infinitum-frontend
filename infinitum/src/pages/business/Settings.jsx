import React from "react";
import TopNavigation from "../builders/TopNavigation";
import SideNavigation from "../builders/SideNavigation";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCollapse } from 'mdbreact';
import { changePassword, getPersonalData, updatePersonalData } from "../../api/apiCalls";
import { errorBasicFieldMessage, checkBasicField, errorPasswordMatchMessage, validateEmail, errorEmailFieldMessage } from "../../common";

class Settings extends React.Component {
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
            phoneNumber: "",
            errorPhoneNumber: false,
            address: "",
            errorAddress: false,
            collapseID: "",
            oldPassword: "",
            errorOldPassword: false,
            newPassword: "",
            errorNewPassword: false,
            confirmedPassword: "",
            errorConfirmedPassword: "",
            initValidation: true
        }
    }

    async componentDidMount() {
        const personalData = await getPersonalData();
        this.setState({
            name: personalData.name,
            email: personalData.email,
            personalId: personalData.personalId,
            phoneNumber: personalData.phoneNumber,
            address: personalData.address,
            birthday: personalData.birthday.split("T")[0]
        });
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    validateUpdateFields = () => {
        const errorOnName = checkBasicField(this.state.name, 3, 40);
        const errorOnEmail = validateEmail(this.state.email);
        const errorOnPhoneNumber = checkBasicField(this.state.phoneNumber, 3, 40);
        const errorOnPersonalId = checkBasicField(this.state.personalId, 3, 40);
        const errorOnAddress = checkBasicField(this.state.address, 3, 40);
        const errorOnBirthday = this.state.birthday.length === 0 ? true : false;
        this.setState({
            errorName: errorOnName,
            errorEmail: errorOnEmail,
            errorPhoneNumber: errorOnPhoneNumber,
            errorPersonalId: errorOnPersonalId,
            errorAddress: errorOnAddress,
            errorBirthday: errorOnBirthday
        });
        if (!errorOnName && !errorOnEmail && !errorOnPhoneNumber &&
            !errorOnPersonalId && !errorOnAddress && !errorOnBirthday) {
            this.update();
        }
    }

    update = async () => {
        const updateRequest = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            personalId: this.state.personalId,
            address: this.state.address,
            birthday: this.state.birthday,
        }
        const response = await updatePersonalData(updateRequest);
        this.setState({
            name: response.name,
            email: response.email,
            personalId: response.personalId,
            phoneNumber: response.phoneNumber,
            address: response.address,
            birthday: response.birthday.split("T")[0]
        });
    }

    validatePasswordFields = () => {
        const errorOnOldPassword = checkBasicField(this.state.oldPassword, 3, 40);
        const errorOnNewPassword = checkBasicField(this.state.newPassword, 3, 40);
        const errorOnConfirmedPassword = checkBasicField(this.state.confirmedPassword, 3, 40) || this.state.newPassword !== this.state.confirmedPassword ? true : false
        this.setState({
            errorOldPassword: errorOnOldPassword,
            errorNewPassword: errorOnNewPassword,
            errorConfirmedPassword: errorOnConfirmedPassword,
            initValidation: false
        });
        if (!errorOnOldPassword && !errorOnNewPassword && !errorOnConfirmedPassword) {
            this.requestPasswordChange();
        }
    }

    requestPasswordChange = async () => {
        const passwordRequest = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmedPassword: this.state.confirmedPassword,
        }
        await changePassword(passwordRequest);
        this.setState({
            oldPassword: "",
            newPassword: "",
            confirmedPassword: ""
        })
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <MDBBtn
                        color="primary"
                        onClick={this.toggleCollapse("personalCollapse")}
                        style={{ marginBottom: "1rem" }}
                    >
                        Personal settings
                    </MDBBtn>
                    <MDBBtn
                        color="primary"
                        onClick={this.toggleCollapse("changePswCollapse")}
                        style={{ marginBottom: "1rem" }}
                    >
                        Change password
                    </MDBBtn>
                    <MDBCollapse id="personalCollapse" isOpen={this.state.collapseID}>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6">
                                    <div className="grey-text">
                                        <MDBInput label="Your name" icon="user" group type="text" className={this.state.errorName ? "invalid" : ""}
                                            value={this.state.name} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("name", e)} />
                                        <MDBInput label="Your email" icon="envelope" group type="text" className={this.state.errorEmail ? "invalid" : ""}
                                            value={this.state.email} error={errorEmailFieldMessage} onChange={(e) => this.handleChange("email", e)} />
                                        <MDBInput label="Your personal id" icon="address-card" group type="text" className={this.state.errorPersonalId ? "invalid" : ""}
                                            value={this.state.personalId} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("personalId", e)} />
                                        <MDBInput label="Your birthday" icon="birthday-cake" group type="date" className={this.state.errorBirthday ? "invalid" : ""}
                                            value={this.state.birthday} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("birthday", e)} />
                                        <MDBInput label="Your phoneNumber" icon="mobile-alt" group type="text" className={this.state.errorPhoneNumber ? "invalid" : ""}
                                            value={this.state.phoneNumber} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("phoneNumber", e)} />
                                        <MDBInput label="Your address" icon="location-arrow" group type="text" className={this.state.errorAddress ? "invalid" : ""}
                                            error={errorBasicFieldMessage} value={this.state.address} onChange={(e) => this.handleChange("address", e)} />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick={this.validateUpdateFields} color="primary">Change</MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCollapse>
                    <MDBCollapse id="changePswCollapse" isOpen={this.state.collapseID}>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6">
                                    <div className="grey-text">
                                        <MDBInput label="Your old password" icon="lock" group type="password" className={this.state.errorOldPassword ? "invalid" : ""}
                                            value={this.state.oldPassword} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("oldPassword", e)} />
                                        <MDBInput label="Your new password" icon="lock" group type="password" className={this.state.errorNewPassword ? "invalid" : ""}
                                            value={this.state.newPassword} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("newPassword", e)} />
                                        <MDBInput label="Your confirmed password" icon="lock" group type="password" className={this.state.errorConfirmedPassword ? "invalid" : ""}
                                            value={this.state.confirmedPassword} error={errorPasswordMatchMessage} onChange={(e) => this.handleChange("confirmedPassword", e)} />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick={this.validatePasswordFields} color="primary">Change</MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCollapse>
                </main>
            </div>

        );
    }
}
export default Settings;