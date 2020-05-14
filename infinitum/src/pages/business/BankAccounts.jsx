import React from "react";
import TopNavigation from "../builders/TopNavigation";
import SideNavigation from "../builders/SideNavigation";
import MaterialTable from "material-table";
import { getBankAccounts, freezeAccount, unfreezeAccount } from "../../api/apiCalls";
import BankAccountModal from "../builders/BankAccountModal";

class Accounts extends React.Component {
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
                    <MaterialTable
                        title="Bank accounts"
                        columns={[
                            { title: 'AccountNumber', field: 'accountNumber', defaultSort: "asc", cellStyle: { overflowWrap: "normal" } },
                            { title: 'Balance', field: 'balance', type: "numeric" },
                            { title: 'Currency', field: 'currency' },
                            { title: 'Frozen', field: 'frozen', type: "boolean" },
                            { title: 'Created at', field: 'createdAt', type: "datetime" },
                        ]}
                        options={{
                            sorting: true
                        }}
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

export default Accounts;