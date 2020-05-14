import React from "react";
import TopNavigation from "../builders/TopNavigation";
import SideNavigation from "../builders/SideNavigation";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import MaterialTable from 'material-table';
import InvestmentModal from "../builders/InvestmentModal";
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
                                    title="Loans"
                                    columns={[
                                        { title: 'Amount', field: 'amount' },
                                        { title: 'Bank account', defaultSort: "asc", field: 'accountNumber' },
                                        { title: 'Currency', field: 'currency' },
                                        { title: 'Interest', field: 'interest' },
                                        { title: 'Duration in months', field: 'totalMonths' },
                                        { title: 'Monthly fraction', field: "monthlyFraction", type: "numeric" },
                                        { title: 'Start date', field: 'startDate', type: "date" },
                                        { title: 'End date', field: 'endDate', type: "date" },
                                    ]}
                                    options={{
                                        sorting: true
                                    }}
                                    data={this.state.investmentData}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <InvestmentModal toggleModal={this.state.toggleLoanModal} investmentType="loan" />
                </main>
            </div>
        );
    }
}
export default Loans;