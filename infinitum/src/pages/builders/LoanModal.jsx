import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import BankAccountDropdown from "./BankAccountDropdown";
import { calculateLoan, takeLoan } from "../../api/apiCalls";


class LoanModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            accountNumber: "",
            amount: "",
            duration: "",
            interest: "",
            calculatedAmount: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.amount !== prevState.amount || this.state.duration !== prevState.duration) {
            this.calculate();
        }
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
        this.calculate();
    }

    calculate = async () => {
        if (this.state.amount !== "" && this.state.duration !== "") {
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
        await takeLoan(loanRequest);
        this.toggle();
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Bank Account Details</MDBModalHeader>
                    <MDBModalBody>
                        <div >
                            <h4>Select source account</h4>
                            <BankAccountDropdown setAccountNumber={this.setAccountNumber} />
                        </div>
                        <MDBInput label="Amount" icon="dollar-sign" group type="number" validate error="wrong"
                            success="right" value={this.state.amount} onChange={(e) => this.handleChange("amount", e)} />
                        <MDBInput label="Duration" icon="clock" group type="number" validate
                            value={this.state.duration} onChange={(e) => this.handleChange("duration", e)} />
                        <div>
                            <label>interest</label>
                            <h2>{this.state.interest}</h2>
                            <label>calculated amount</label>
                            <h2>{this.state.calculatedAmount}</h2>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.takeLoan}>Get loan</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default LoanModal;