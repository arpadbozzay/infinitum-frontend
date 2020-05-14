import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { adminLogin, baseAdminCall } from "../../api/apiCalls";
import { checkBasicField, errorBasicFieldMessage } from "../../common";

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            errorUsername: false,
            password: "",
            errorPassword: false,

        }
    }

    async componentDidMount() {
        await baseAdminCall();
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }


    validateFields = () => {
        const errorOnUsername = checkBasicField(this.state.username, 3, 40);
        const errorOnPassword = checkBasicField(this.state.password, 3, 40);
        this.setState({
            errorUsername: errorOnUsername,
            errorPassword: errorOnPassword,
        });
        if (!errorOnUsername && !errorOnPassword) {
            this.adminLogin();
        }
    }

    loginHandler = () => {
        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        }
        adminLogin(loginRequest);
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    handleKeyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            const loginRequest = {
                username: this.state.username,
                password: this.state.password
            }
            adminLogin(loginRequest);
        }
    }


    render() {
        return (
            <div className="homeContainer">
                <MDBContainer>
                    <MDBRow center>
                        <MDBCol md="6">
                            <p className="h5 text-center mb-4 accountColor">Sign in</p>
                            <div>
                                <MDBInput label="Type your name" icon="user" group type="text" className={this.state.errorUsername ? "invalid" : ""}
                                    value={this.state.username} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("username", e)} />
                                <MDBInput label="Type your password" icon="lock" group type="password" className={this.state.errorPassword ? "invalid" : ""}
                                    value={this.state.password} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("password", e)} />
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.loginHandler} >Login</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}
export default AdminLogin;