import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { confirmRegistration } from "../../api/apiCalls";

class ConfirmRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            QRCode: "",
            username: ""
        }
    }

    async componentDidMount() {
        const regQRCode = await confirmRegistration();
        this.setState({
            QRCode: regQRCode
        });
    }

    render() {
        return (
            <div className="homeContainer">
                <MDBContainer>
                    <MDBRow center>
                        <MDBCol className="textAlignCenter" size="4">
                            <h6>Your QR code</h6>
                            <img src={this.state.QRCode} alt="QR code should be here.." />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol className="textAlignCenter" size="4">
                            <h6>Your username</h6>
                            <h5>{localStorage.getItem("username")}</h5>
                            <MDBBtn href="/login" color="primary">Okay, I got it</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>


            </div>
        );
    }
}
export default ConfirmRegistration;