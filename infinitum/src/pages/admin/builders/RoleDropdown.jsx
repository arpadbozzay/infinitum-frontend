import React, { Component } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { getBankRoles } from "../../../api/apiCalls";

class RoleDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            value: ""
        }
    }

    async componentDidMount() {
        const roles = await getBankRoles();
        let firstVal = roles[0];
        this.setState({
            value: firstVal,
            values: roles
        });
        //this.props.setRole(firstVal);
    }

    onClickHandler = event => {
        const value = event.target.innerHTML;
        this.setState({ value });
        //this.props.setRole(value);
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
export default RoleDropdown;