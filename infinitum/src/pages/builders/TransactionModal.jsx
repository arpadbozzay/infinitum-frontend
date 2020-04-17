import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBBox } from 'mdbreact';
import BankAccountDropdown from "./BankAccountDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import { makeTransaction } from "../../api/apiCalls";

class ModalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            destination: "",
            amount: "",
            message: "",
            currency: "",
            accountNumber: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modal: this.props.toggleTransactionModal
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
        this.setState({
            modal: !this.state.modal
        });
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
                            <h4>Select source account</h4>
                            <BankAccountDropdown setAccountNumber={this.setAccountNumber} />
                        </div>
                        <MDBInput label="Type destination account" icon="bullseye" group type="text" validate error="wrong"
                            success="right" value={this.state.destination} onChange={(e) => this.handleChange("destination", e)} />
                        <MDBInput label="Type amount" icon="coins" group type="number" validate error="wrong"
                            success="right" value={this.state.amount} onChange={(e) => this.handleChange("amount", e)} />
                        <div>
                            <h4>Select currency</h4>
                            <CurrencyDropdown setCurrency={this.setCurrency} />
                        </div>
                        <MDBInput label="Type your message" icon="comment" group type="text" validate error="wrong"
                            success="right" value={this.state.message} onChange={(e) => this.handleChange("message", e)} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.transferMoney}>Send money</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;