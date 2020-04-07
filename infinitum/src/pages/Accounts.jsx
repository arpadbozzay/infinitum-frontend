import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { getBankAccounts } from "../api/apiCalls";
import ModalPage from "./builders/BankAccountModal";

function mapStateToProps(state) {
    return {
        user: state,
        toggleModal: false
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setUserName: (name) => {
            dispatch({
                type: "CHANGE_USER_NAME",
                payload: name
            });
        }
    };
};

class ConnectedAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankAccounts: [],
        }
    }

    async componentDidMount() {
        const res = await getBankAccounts();
        this.setState({
            bankAccounts: res
        });
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <h1>Accounts</h1>
                    <MaterialTable
                        title="Bank accounts"
                        columns={[
                            { title: 'AccountNumber', field: 'accountNumber' },
                            { title: 'Balance', field: 'balance', type: "numeric" },
                            { title: 'Currency', field: 'currency' },
                            { title: 'Created at', field: 'createdAt' },
                        ]}
                        data={this.state.bankAccounts}
                        actions={[
                            {
                                icon: 'lock',
                                tooltip: 'Freeze',
                                onClick: (event, rowData) => alert("Freeze " + rowData.accountNumber)
                            },
                            {
                                icon: 'add',
                                tooltip: 'Add Bank Account',
                                isFreeAction: true,
                                onClick: (event) => { this.setState({ toggleModal: true }) }
                            }
                        ]}
                    />
                    <ModalPage toggleModal={this.state.toggleModal} />
                </main>
            </div>
        );
    }
}

const Accounts = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedAccounts);

export default Accounts;