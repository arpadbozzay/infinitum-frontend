import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import MaterialTable from 'material-table';
import BankAccountDropdown from "../builders/BankAccountDropdown";
import TransactionModal from "../builders/TransactionModal";
import { getTransferHistory, searchTransferHistory } from "../../api/apiCalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function mapStateToProps(state) {
    return {
        user: state,
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
        console.log(this.props.notifications);
        this.state = {
            minimum: "",
            maximum: "",
            source: "",
            destination: "",
            transactionData: [],
            startDate: "",
            endDate: "",
            toggleTransactionModal: false
        }
    }

    async componentDidMount() {
        const transactions = await getTransferHistory();
        this.setState({
            transactionData: transactions
        });
    }

    search = async () => {
        const searchRequest = {
            username: localStorage.getItem("username"),
            source: this.state.source,
            destination: this.state.destination,
            minimum: this.state.minimum,
            maximum: this.state.maximum,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        const response = await searchTransferHistory(searchRequest);
        this.setState({
            transactionData: response
        });
    }

    clearFilters = () => {
        this.setState({
            source: "",
            destination: "",
            minimum: "",
            maximum: "",
            startDate: "",
            endDate: ""
        });
    }

    setAccountNumber = (value) => {
        this.setState({ source: value });
    };

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    };

    toggleTransaction = () => {
        this.setState({
            toggleTransactionModal: true
        });
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h1>Transactions</h1>
                    <h2>{this.props.user.username}</h2>
                    <MDBBtn onClick={this.toggleTransaction}> New transaction</MDBBtn>
                    <MDBContainer>
                        <MDBRow className="text-center">
                            <MDBCol size="12">
                                {/* <MDBRow >
                                    <MDBCol size="12">
                                        <BankAccountDropdown setAccountNumber={this.setAccountNumber} />
                                    </MDBCol>
                                </MDBRow> */}
                                <MDBRow >
                                    <MDBCol size="6">
                                        <MDBInput label="Source account" group type="text" validate error="wrong"
                                            success="right" value={this.state.source} onChange={(e) => this.handleChange("source", e)} />

                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBInput label="Destination account" group type="text" validate error="wrong"
                                            success="right" value={this.state.destination} onChange={(e) => this.handleChange("destination", e)} />
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
                                <MDBRow>
                                    <MDBCol><h4>Start date</h4></MDBCol>
                                    <MDBCol>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleStartDateChange}
                                        />
                                    </MDBCol>
                                    <MDBCol><h4>End date</h4></MDBCol>
                                    <MDBCol>
                                        <DatePicker
                                            selected={this.state.endDate}
                                            onChange={this.handleEndDateChange}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBBtn onClick={this.search}>Search</MDBBtn>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBBtn onClick={this.clearFilters}>Clear filters</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size="12">
                                <MaterialTable
                                    title="Transactions"
                                    columns={[
                                        { title: 'Source', field: 'source' },
                                        { title: 'Destination', field: 'destination' },
                                        { title: 'Amount', field: "amount", type: "numeric" },
                                        { title: 'Updated at', field: 'updatedAt', type: "datetime" },
                                        { title: 'Created at', field: 'createdAt', type: "datetime" },
                                    ]}
                                    data={this.state.transactionData}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <TransactionModal toggleTransactionModal={this.state.toggleTransactionModal} />
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