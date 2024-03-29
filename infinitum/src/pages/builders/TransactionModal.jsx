import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import BankAccountDropdown from "./BankAccountDropdown";
import { makeTransaction } from "../../api/apiCalls";
import { errorBasicFieldMessage, checkBasicField, validateNumber, errorValidNumber } from "../../common";

class ModalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            destination: "",
            errorDestination: false,
            amount: "",
            errorAmount: false,
            message: "",
            errorMessage: false,
            currency: "",
            accountNumber: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modal: this.props.toggleTransactionModalState
            });
        }
    }

    handleChange = (targetState, event) => {
        this.setState({ [targetState]: event.target.value });
    }

    setCurrency = (value) => {
        this.setState({ currency: value });
    };

    setAccountNumber = (value) => {
        this.setState({ accountNumber: value });
    };

    toggle = () => {
        this.props.toggleModal();
    }

    validateFields = () => {
        const errorOnDestination = checkBasicField(this.state.destination, 3, 40);
        const errorOnAmount = validateNumber(this.state.amount, 1, 10000000);
        const errorOnMessage = checkBasicField(this.state.message, 3, 40);
        this.setState({
            errorDestination: errorOnDestination,
            errorAmount: errorOnAmount,
            errorMessage: errorOnMessage
        });
        if (!errorOnDestination && !errorOnAmount && !errorOnMessage && this.state.accountNumber) {
            this.transferMoney();
        }
    }

    transferMoney = () => {
        const newTransferRequest = {
            source: this.state.accountNumber,
            destination: this.state.destination,
            amount: this.state.amount,
            currency: this.state.currency,
            message: this.state.message
        }
        makeTransaction(newTransferRequest);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Bank Account Details</MDBModalHeader>
                    <MDBModalBody>
                        <div >
                            <h6>Select source account</h6>
                            <BankAccountDropdown init={true} setCurrency={this.setCurrency} setAccountNumber={this.setAccountNumber} />
                            <h6>Currency</h6>
                            <h6>{this.state.currency}</h6>
                        </div>
                        <MDBInput label="Type destination account" icon="bullseye" group type="text" className={this.state.errorDestination ? "invalid" : ""}
                            value={this.state.destination} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("destination", e)} />
                        <MDBInput label="Type amount" icon="coins" group type="number" className={this.state.errorAmount ? "invalid" : ""}
                            value={this.state.amount} error={errorValidNumber} onChange={(e) => this.handleChange("amount", e)} />
                        <MDBInput label="Type your message" icon="comment" group type="text" className={this.state.errorMessage ? "invalid" : ""}
                            value={this.state.message} error={errorBasicFieldMessage} onChange={(e) => this.handleChange("message", e)} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.validateFields}>Send money</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;