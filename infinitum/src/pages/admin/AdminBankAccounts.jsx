import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import MaterialTable from "material-table";
import { getAdminBankAccounts, deleteBankAccount, updateBankAccount } from "../../api/apiCalls";

class AdminBankAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankAccounts: [],
        }
    }

    async componentDidMount() {
        const res = await getAdminBankAccounts();
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
                            { title: 'AccountNumber', defaultSort: "asc", field: 'accountNumber', cellStyle: { overflowWrap: "normal" } },
                            { title: 'Balance', field: 'balance', type: "numeric" },
                            { title: 'Currency', field: 'currency' },
                            { title: 'Frozen', field: 'frozen', type: "boolean" },
                            { title: 'Deleted', field: 'deleted', type: "boolean" },
                            { title: 'Created at', field: 'createdAt', type: "datetime", editable: 'never' },
                        ]}
                        data={this.state.bankAccounts}
                        editable={{
                            onRowUpdate: (newData, oldData) => updateBankAccount(newData),
                            onRowDelete: oldData => deleteBankAccount(oldData),
                        }}
                        options={{
                            sorting: true
                        }}
                    />
                </main>
            </div>
        );
    }
}

export default AdminBankAccounts;