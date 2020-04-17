import React, { Component } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBSwitch } from "mdbreact";
import { getBankAccounts } from "../../api/apiCalls";

class BankAccountDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            value: ""
        }
    }

    async componentDidMount() {
        const bankAccounts = await getBankAccounts();
        const bankAccountNumbers = bankAccounts.map(a => a.accountNumber);
        let firstVal = bankAccountNumbers[0];
        this.setState({
            value: firstVal,
            values: bankAccountNumbers
        });
        this.props.setAccountNumber(firstVal);
    }

    onClickHandler = event => {
        const value = event.target.innerHTML;
        this.setState({ value });
        this.props.setAccountNumber(value);
    }

    render() {
        return (
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                    {this.state.value}
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    {this.state.values.map((value, index) => {
                        return <MDBDropdownItem key={index} onClick={this.onClickHandler}>{value}</MDBDropdownItem>
                    })}
                </MDBDropdownMenu>
            </MDBDropdown>
        );
    }
}
export default BankAccountDropdown;