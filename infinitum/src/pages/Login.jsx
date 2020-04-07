import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { login } from "../api/apiCalls";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            verificationCode: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler() {
        login(this.state);
    }

    handleChange(targetState, event) {
        this.setState({ [targetState]: event.target.value });
    }
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                                <MDBInput label="Type your name" icon="user" group type="text" validate error="wrong"
                                    success="right" value={this.state.userName} onChange={(e) => this.handleChange("userName", e)} />
                                <MDBInput label="Type your password" icon="lock" group type="password" validate
                                    value={this.state.password} onChange={(e) => this.handleChange("password", e)} />
                                <MDBInput label="Type your code" icon="code" group type="text" validate
                                    value={this.state.verificationCode} onChange={(e) => this.handleChange("verificationCode", e)} />
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.loginHandler}>Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
export default Login;