import React from "react";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import MaterialTable from "material-table";
import { getAdminUsers, deleteUser, updateUser, addUser } from "../../api/apiCalls";
import RoleDropdown from "./builders/RoleDropdown";

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    async componentDidMount() {
        const res = await getAdminUsers();
        this.setState({
            users: res
        });
    }

    render() {
        return (
            <div className="flexible-content">
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5">
                    <MaterialTable
                        title="Users"
                        columns={[
                            { title: 'Username', field: 'username', defaultSort: "asc" },
                            { title: 'Name', field: 'name' },
                            { title: 'Personal id', field: 'personalId' },
                            { title: 'Email', field: 'email' },
                            { title: 'Birthday', field: "birthday", type: 'date' },
                            { title: 'Phone', field: 'phoneNumber' },
                            { title: 'Password', field: 'password' },
                            { title: 'Address', field: 'address' },
                            { title: 'Secret', field: 'secret' },
                            { title: 'Role', field: 'role' },
                            { title: 'Reg confirmed', field: 'registrationConfirmed', type: "boolean" },
                            { title: 'Deleted', field: 'deleted', type: "boolean" }
                        ]}
                        data={this.state.users}
                        editable={localStorage.getItem("userType") === "ROLE_ADMIN" && {
                            onRowAdd: (newData) => addUser(newData),
                            onRowUpdate: (newData, oldData) => updateUser(newData),
                            onRowDelete: oldData => deleteUser(oldData),
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

export default AdminUsers;