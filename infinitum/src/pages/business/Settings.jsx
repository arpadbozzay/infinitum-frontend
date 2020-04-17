import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCollapse } from 'mdbreact';
import { changePassword, getPersonalData, updatePersonalData } from "../../api/apiCalls";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            personalId: "",
            birthday: "",
            phoneNumber: "",
            address: "",
            collapseID: "",
            oldPassword: "",
            newPassword: "",
            confirmedPassword: ""
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

    update = async () => {
        const updateRequest = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            personalId: this.state.personalId,
            address: this.state.address,
            birthday: this.state.birthday,
            username: localStorage.getItem("username")
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

    requestPasswordChange = () => {
        const passwordRequest = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmedPassword: this.state.confirmedPassword,
            username: localStorage.getItem("username")
        }
        changePassword(passwordRequest);
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h1>Settings</h1>
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
                                        <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                            success="right" value={this.state.name} onChange={(e) => this.handleChange("name", e)} />
                                        <MDBInput label="Your email" icon="envelope" group type="text" validate error="wrong"
                                            success="right" value={this.state.email} onChange={(e) => this.handleChange("email", e)} />
                                        <MDBInput label="Your personal id" icon="address-card" group type="text" validate error="wrong"
                                            success="right" value={this.state.personalId} onChange={(e) => this.handleChange("personalId", e)} />
                                        <MDBInput label="Your birthday" icon="birthday-cake" group type="date" validate error="wrong"
                                            success="right" value={this.state.birthday} onChange={(e) => this.handleChange("birthday", e)} />
                                        <MDBInput label="Your phoneNumber" icon="mobile-alt" group type="text" validate error="wrong"
                                            success="right" value={this.state.phoneNumber} onChange={(e) => this.handleChange("phoneNumber", e)} />
                                        <MDBInput label="Your address" icon="location-arrow" group type="text" validate
                                            error="wrong" success="right" value={this.state.address} onChange={(e) => this.handleChange("address", e)} />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick={this.update} color="primary">Change</MDBBtn>
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
                                        <MDBInput label="Your old password" icon="lock" group type="password" validate
                                            value={this.state.oldPassword} onChange={(e) => this.handleChange("oldPassword", e)} />
                                        <MDBInput label="Your new password" icon="lock" group type="password" validate
                                            value={this.state.newPassword} onChange={(e) => this.handleChange("newPassword", e)} />
                                        <MDBInput label="Your confirmed password" icon="lock" group type="password" validate
                                            value={this.state.confirmedPassword} onChange={(e) => this.handleChange("confirmedPassword", e)} />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick={this.requestPasswordChange} color="primary">Change</MDBBtn>
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