import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBBox } from 'mdbreact';
import CurrencyDropdown from "./CurrencyDropdown";
import { createAccount } from "../../api/apiCalls";

class ModalPage extends Component {
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
                        <div >
                            <h4>Select currency</h4>
                            <CurrencyDropdown setCurrency={this.setCurrency} />
                        </div>
                        <h4>Check if you want your account frozen</h4>
                        <div className="bankAccountModalCheckboxBox">
                            <MDBInput type="checkbox" value={this.state.isFrozen} onClick={this.changeFrozenState} />
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.createBankAccount}>Create new bank account</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;