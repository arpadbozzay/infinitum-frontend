import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCollapse } from "mdbreact";
import MaterialTable from 'material-table';
import TransactionModal from "../builders/TransactionModal";
import BankAccountDropdown from "../builders/BankAccountDropdown";
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
            toggleTransactionModal: false,
            collapseID: "",
            currency: ""
        }
    }

    async componentDidMount() {
        const transactions = await getTransferHistory();
        this.setState({
            transactionData: transactions
        });
    }

    setAccountNumber = (value) => {
        this.setState({ source: value });
    };

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
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

    setCurrency = (value) => {
        this.setState({ currency: value });
    }

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
            toggleTransactionModal: !this.state.toggleTransactionModal
        });
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h2>{this.props.user.username}</h2>
                    <MDBContainer fluid>
                        <MDBRow center>
                            <MDBCol size="6">
                                <MDBBtn onClick={this.toggleTransaction}> New transaction</MDBBtn>
                            </MDBCol>
                            <MDBCol size="6">
                                <MDBBtn
                                    color="primary"
                                    onClick={this.toggleCollapse("filterTransaction")}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    Filter Transactions
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        <MDBCollapse id="filterTransaction" isOpen={this.state.collapseID}>
                            <MDBRow>
                                <MDBCol size="12">
                                    <MDBRow >
                                        <MDBCol size="6">
                                            <h6>Source account</h6>
                                            <BankAccountDropdown init={false} source={this.state.source} setCurrency={this.setCurrency} setAccountNumber={this.setAccountNumber} />
                                            <h6>Currency</h6>
                                            <h6>{this.state.currency}</h6>
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
                                    <MDBRow end>
                                        <MDBCol>
                                            <h6>Start date</h6>
                                        </MDBCol>
                                        <MDBCol>
                                            <DatePicker
                                                className="transactionDatePicker"
                                                selected={this.state.startDate}
                                                onChange={this.handleStartDateChange}
                                            />
                                        </MDBCol>
                                        <MDBCol>
                                            <h6>End date</h6>
                                        </MDBCol>
                                        <MDBCol>
                                            <DatePicker
                                                className="transactionDatePicker"
                                                selected={this.state.endDate}
                                                onChange={this.handleEndDateChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow center className="transactionFilterButtons">
                                        <MDBCol size="2">
                                            <MDBBtn onClick={this.search}>Search</MDBBtn>
                                        </MDBCol>
                                        <MDBCol size="3">
                                            <MDBBtn onClick={this.clearFilters}>Clear filters</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        </MDBCollapse>
                        <MDBRow>
                            <MDBCol size="12">
                                <MaterialTable
                                    title="Transactions"
                                    columns={[
                                        { title: 'Source', defaultSort: "asc", field: 'source' },
                                        { title: 'Destination', field: 'destination' },
                                        { title: 'Amount', field: "amount", type: "numeric" },
                                        { title: 'Message', field: "message" },
                                        { title: 'Updated at', field: 'updatedAt', type: "datetime" },
                                        { title: 'Created at', field: 'createdAt', type: "datetime" },
                                    ]}
                                    options={{
                                        sorting: true
                                    }}
                                    data={this.state.transactionData}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <TransactionModal toggleModal={this.toggleTransaction} toggleTransactionModalState={this.state.toggleTransactionModal} />
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