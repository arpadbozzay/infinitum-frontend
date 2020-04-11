import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import MaterialTable from 'material-table';
import BankAccountDropdown from "../builders/BankAccountDropdown";


function mapStateToProps(state) {
    return {
        user: state
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

class ConnectedTransactions extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.user);
        this.state = {
            minimum: "",
            maximum: "",
            accountNumber: ""
        }
    }

    search = () => {

    }

    setAccountNumber = (value) => {
        this.setState({ accountNumber: value });
    };

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h1>Transactions</h1>
                    <h2>{this.props.user.username}</h2>
                    <MDBContainer>
                        <MDBRow className="text-center">
                            <MDBCol size="12">
                                <MDBRow >
                                    <MDBCol size="12">
                                        <BankAccountDropdown setAccountNumber={this.setAccountNumber} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow >
                                    <MDBCol size="6">
                                        <MDBInput label="Minimum amount" group type="number" validate error="wrong"
                                            success="right" value={this.state.minimum} onChange={(e) => this.handleChange("minimum", e)} />

                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBInput label="Maximum amount" group type="number" validate error="wrong"
                                            success="right" value={this.state.maximum} onChange={(e) => this.handleChange("maximum", e)} />

                                    </MDBCol>
                                </MDBRow>
                                <MDBRow >
                                    <MDBCol size="12">
                                        <MDBBtn onClick={this.search}>Search</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size="12">
                                <MaterialTable
                                    columns={[
                                        { title: 'Adı', field: 'name' },
                                        { title: 'Soyadı', field: 'surname' },
                                        { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                                        { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                                    ]}
                                    data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
                                    title="Demo Title"
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </main>
            </div>
        );
    }
}

const Transactions = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedTransactions);

export default Transactions;