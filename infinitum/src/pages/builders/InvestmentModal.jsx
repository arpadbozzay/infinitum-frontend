import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import BankAccountDropdown from "./BankAccountDropdown";
import { calculateLoan, takeLoan, takeDebit } from "../../api/apiCalls";
import { validateNumber } from "../../common";

class InvestmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            accountNumber: "",
            amount: "",
            errorAmount: false,
            duration: "",
            errorDuration: false,
            interest: "",
            calculatedAmount: "",
            currency: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                modal: this.props.toggleModal
            });
        }
    }

    setAccountNumber = (value) => {
        this.setState({ accountNumber: value });
    };

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    setCurrency = (value) => {
        this.setState({ currency: value });
    }

    validateForCalculation = () => {
        this.validateFields("calculate");
    }

    validateForInvestment = () => {
        this.validateFields("invest");
    }

    validateFields = (type) => {
        const errorOnAmount = validateNumber(this.state.amount, 1, 10000000);
        const errorOnDuration = validateNumber(this.state.duration, 1, 10);
        this.setState({
            errorAmount: errorOnAmount,
            errorDuration: errorOnDuration,

        });
        if (!errorOnAmount && !errorOnDuration && type === "invest") {
            this.takeLoan();
        } else if (!errorOnAmount && !errorOnDuration && type === "calculate") {
            this.calculate();
        }
    }

    calculate = async () => {
        if (this.state.amount > 0 && this.state.duration > 0) {
            const calculateLoanRequest = {
                amount: this.state.amount,
                duration: this.state.duration
            }
            const result = await calculateLoan(calculateLoanRequest);
            this.setState({
                calculatedAmount: result.calculatedAmount,
                interest: result.interest
            });
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    takeLoan = async () => {
        const loanRequest = {
            accountNumber: this.state.accountNumber,
            amount: this.state.amount,
            duration: this.state.duration,
            interest: this.state.interest
        }
        if (this.props.investmentType === "loan" && this.state.accountNumber) {
            await takeLoan(loanRequest);
        } else if (this.props.investmentType === "debit" && this.state.accountNumber) {
            await takeDebit(loanRequest);
        }
        this.toggle();
    }

    render() {
        const getInvestmentButtonText = this.props.investmentType === "loan" ? "Get loan" : "Get debit";
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Investment Details</MDBModalHeader>
                    <MDBModalBody>
                        <div >
                            <h6>Select source account</h6>
                            <BankAccountDropdown init={true} setCurrency={this.setCurrency} setAccountNumber={this.setAccountNumber} />
                            <h6>Currency</h6>
                            <h6>{this.state.currency}</h6>
                        </div>
                        <MDBInput label="Amount" icon="dollar-sign" group type="number" className={this.state.errorAmount ? "invalid" : ""}
                            value={this.state.amount} error="Field must be a valid number between 0 and 10.000.000!" onChange={(e) => this.handleChange("amount", e)} />
                        <MDBInput label="Duration" icon="clock" group type="number" className={this.state.errorDuration ? "invalid" : ""}
                            value={this.state.duration} error="Field must be a valid number between 0 and 10!" onChange={(e) => this.handleChange("duration", e)} />
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard className="w-96 mb-4">
                                        <MDBCardBody>
                                            <MDBCardTitle>Calculated interest</MDBCardTitle>
                                            <MDBCardText>
                                                {this.state.interest}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard className="w-96 mb-4">
                                        <MDBCardBody>
                                            <MDBCardTitle>Calculated amount</MDBCardTitle>
                                            <MDBCardText>
                                                {this.state.calculatedAmount}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.validateForCalculation}>Calculate</MDBBtn>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" disabled={!this.state.calculatedAmount} onClick={this.validateForInvestment}>{getInvestmentButtonText}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default InvestmentModal;