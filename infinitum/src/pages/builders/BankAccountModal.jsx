import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import CurrencyDropdown from "./CurrencyDropdown";
import { createAccount } from "../../api/apiCalls";

class BankAccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isFrozen: false,
            currency: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modal: this.props.toggleModal
            });
        }
    }

    setCurrency = (value) => {
        this.setState({ currency: value });
    };


    changeFrozenState = () => {
        this.setState({
            isFrozen: !this.state.isFrozen
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    createBankAccount = () => {
        const newAccountRequest = {
            username: localStorage.getItem("username"),
            frozen: this.state.isFrozen,
            currency: this.state.currency
        }
        createAccount(newAccountRequest);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Bank Account Details</MDBModalHeader>
                    <MDBModalBody>
                        <MDBRow middle>
                            <MDBCol size="3" middle>
                                <h6>Select currency</h6>
                            </MDBCol>
                            <MDBCol size="4" middle>
                                <CurrencyDropdown setCurrency={this.setCurrency} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size="3" middle>
                                <h6>Freeze account</h6>
                            </MDBCol>
                            <MDBCol size="4" middle>
                                <input type="checkbox" onClick={this.changeFrozenState} value={!this.state.isFrozen}></input>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.createBankAccount}>Create new bank account</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer >
        );
    }
}

export default BankAccountModal;