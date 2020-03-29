import React from "react";
const fetch = require('node-fetch');

class ConfirmRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        fetch('http://localhost:8080/admin/users',
            { headers: { "Authorization": `Bearer ${localStorage.getItem("jwtToken")}` } }
        )
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(e => console.log(e));
    }
    render() {
        return <h1>Welcome</h1>
    }
}
export default ConfirmRegistration;