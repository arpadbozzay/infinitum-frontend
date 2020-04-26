import React from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';


class Home extends React.Component {
    render() {
        return (
            <div className="homeContainer">
                <MDBContainer>
                    <MDBRow center middle>
                        <MDBCol className="textAlignCenter" size="3">
                            <MDBBtn href="/login">Login
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center middle>
                        <MDBCol className="textAlignCenter" size="3">
                            <MDBBtn href="/registration">Registration
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                {/* ProtectedRoutes */}
            </div>
        );
    }
}
export default Home;