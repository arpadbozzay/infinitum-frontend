import React, { Component } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBSwitch } from "mdbreact";
import { getCurrencies } from "../../api/apiCalls";

class CurrencyDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            value: ""
        }
    }

    async componentDidMount() {
        const currencies = await getCurrencies();
        let firstVal = currencies[0];
        this.setState({
            value: firstVal,
            values: currencies
        });
    }


    onClickHandler = event => {
        const value = event.target.innerHTML;
        this.setState({ value });
        this.props.setCurrency(value);
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
export default CurrencyDropdown;