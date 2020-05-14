import React, { Component } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
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
        let firstVal = bankAccounts.length > 0 ? bankAccounts[0] : "";
        this.setState({
            value: this.props.init ? firstVal.accountNumber : "",
            values: bankAccounts
        });
        if (this.props.init) {
            this.props.setCurrency(firstVal.currency);
            this.props.setAccountNumber(firstVal.accountNumber);
        }
    }

    onClickHandler = event => {
        const value = event.target.innerHTML;
        this.setState({ value });
        this.props.setAccountNumber(value);
        this.props.setCurrency(this.state.values.filter(obj => obj.accountNumber === value)[0].currency);
    }

    render() {
        return (
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                    {this.props.init ? this.state.value : this.props.source}
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    {this.state.values.map((value, index) => {
                        return <MDBDropdownItem key={index} onClick={this.onClickHandler}>{value.accountNumber}</MDBDropdownItem>
                    })}
                </MDBDropdownMenu>
            </MDBDropdown>
        );
    }
}
export default BankAccountDropdown;