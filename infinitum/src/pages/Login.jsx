import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            verificationCode: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        console.log(this.state);
        fetch('http://localhost:8080/user/login', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                localStorage.setItem("jwtToken", json.jwtToken);
            })
            .catch(e => console.log(e));
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
                                <MDBBtn onClick={this.login}>Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
export default Login;