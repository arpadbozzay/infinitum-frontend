import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import MaterialTable from 'material-table';
import LoanModal from "../builders/LoanModal";
import { getLoans } from "../../api/apiCalls";

class Loans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleLoanModal: false,
            investmentData: []
        }
    }

    async componentDidMount() {
        const response = await getLoans();
        console.log(response);
        this.setState({
            investmentData: response
        });
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    toggleLoan = () => {
        this.setState({
            toggleLoanModal: true
        });
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <MDBBtn onClick={this.toggleLoan}> New loan</MDBBtn>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol size="12">
                                <MaterialTable
                                    title="Transactions"
                                    columns={[
                                        { title: 'Amount', field: 'amount' },
                                        { title: 'Bank account', field: 'accountNumber' },
                                        { title: 'Currency', field: 'currency' },
                                        { title: 'Monthly percentage', field: 'interest' },
                                        { title: 'Monthly fraction', field: "monthlyFraction", type: "numeric" },
                                        { title: 'Start date', field: 'startDate', type: "date" },
                                        { title: 'End date', field: 'endDate', type: "date" },
                                    ]}
                                    data={this.state.investmentData}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <LoanModal toggleModal={this.state.toggleLoanModal} />
                </main>
            </div>
        );
    }
}
export default Loans;