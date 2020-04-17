import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { getBankAccounts, freezeAccount, unfreezeAccount } from "../../api/apiCalls";
import BankAccountModal from "../builders/BankAccountModal";

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
                            { title: 'AccountNumber', field: 'accountNumber', cellStyle: { overflowWrap: "normal" } },
                            { title: 'Balance', field: 'balance', type: "numeric" },
                            { title: 'Currency', field: 'currency' },
                            { title: 'Frozen', field: 'frozen', type: "boolean" },
                            { title: 'Created at', field: 'createdAt', type: "datetime" },
                        ]}
                        data={this.state.bankAccounts}
                        actions={[
                            rowData => ({
                                icon: 'lock',
                                tooltip: 'Freeze',
                                onClick: (event, rowData) => freezeAccount(rowData.accountNumber),
                                hidden: rowData.frozen
                            }),
                            rowData => ({
                                icon: 'lock_open',
                                tooltip: 'Unfreeze',
                                onClick: (event, rowData) => unfreezeAccount(rowData.accountNumber),
                                hidden: !rowData.frozen
                            }),
                            {
                                icon: 'add',
                                tooltip: 'Add Bank Account',
                                isFreeAction: true,
                                onClick: (event) => { this.setState({ toggleModal: true }) }
                            }
                        ]}
                    />
                    <BankAccountModal toggleModal={this.state.toggleModal} />
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