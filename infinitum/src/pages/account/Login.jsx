import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { login, baseUserCall } from "../../api/apiCalls";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            errorUsername: false,
            password: "",
            errorPassword: false,
            verificationCode: "",
            errorVerificationCode: false
        }
    }

    async componentDidMount() {
        await baseUserCall();
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }

    validateFields = () => {
        const errorOnUsername = this.state.username.length === 0 ? true : false;
        const errorOnPassword = this.state.password.length === 0 ? true : false;
        const errorOnVerificationCode = this.state.verificationCode.length === 0 ? true : false;
        this.setState({
            errorUsername: errorOnUsername,
            errorPassword: errorOnPassword,
            errorVerificationCode: errorOnVerificationCode
        });
        if (!errorOnUsername && !errorOnPassword && !errorOnVerificationCode) {
            this.loginHandler();
        }
    }

    loginHandler = () => {
        const loginRequest = {
            username: this.state.username,
            password: this.state.password,
            verificationCode: this.state.verificationCode
        }
        login(loginRequest);
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    handleKeyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            const loginRequest = {
                username: this.state.username,
                password: this.state.password,
                verificationCode: this.state.verificationCode
            }
            login(loginRequest);
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
                                <MDBInput label="Type your name" icon="user" className={this.state.errorUsername ? "invalid" : ""} group type="text"
                                    value={this.state.username} onChange={(e) => this.handleChange("username", e)} />
                                <MDBInput label="Type your password" className={this.state.errorPassword ? "invalid" : ""} icon="lock" group type="password" validate
                                    value={this.state.password} onChange={(e) => this.handleChange("password", e)} />
                                <MDBInput label="Type your code" icon="code" className={this.state.errorVerificationCode ? "invalid" : ""} group type="text" validate
                                    value={this.state.verificationCode} onChange={(e) => this.handleChange("verificationCode", e)} />
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.validateFields} >Login</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        );
    }
}
export default Login;