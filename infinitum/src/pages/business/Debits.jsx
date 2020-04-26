import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import MaterialTable from 'material-table';
import InvestmentModal from "../builders/InvestmentModal";
import { getDebits } from "../../api/apiCalls";

class Debits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleLoanModal: false,
            investmentData: []
        }
    }

    async componentDidMount() {
        const response = await getDebits();
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
                    <MDBBtn onClick={this.toggleLoan}> New debit</MDBBtn>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol size="12">
                                <MaterialTable
                                    title="Debits"
                                    columns={[
                                        { title: 'Amount', defaultSort: "asc", field: 'amount' },
                                        { title: 'Bank account', field: 'accountNumber' },
                                        { title: 'Currency', field: 'currency' },
                                        { title: 'Expected amount', field: "totalAmount", type: "numeric" },
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
                    <InvestmentModal toggleModal={this.state.toggleLoanModal} investmentType="debit" />
                </main>
            </div>
        );
    }
}
export default Debits;