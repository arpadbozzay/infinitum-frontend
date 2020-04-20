import fetch from "node-fetch";
import store from "../store";
import { toast } from "react-toastify";

const notify = (msg, options) => { toast(msg, options) }

export async function getBankAccounts() {
    const res = await fetch('http://localhost:8080/user/accounts', {
        method: "POST",
        body: localStorage.getItem("username"),
        headers: { "Authorization": `Bearer ${localStorage.getItem("jwtToken")}` }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function login(userRequest) {
    const res = await fetch('http://localhost:8080/user/login', {
        method: "POST",
        body: JSON.stringify(userRequest),
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 200) {
        const json = await res.json();
        localStorage.setItem("jwtToken", json.jwtToken);
        localStorage.setItem("username", json.userName);
        window.location.replace("http://localhost:3000/accounts");
    } else {
        handleError(res);
    }
}

export async function getCurrencies() {
    const res = await fetch('http://localhost:8080/user/currencies', {
        headers: { "Authorization": `Bearer ${localStorage.getItem("jwtToken")}` }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function createAccount(accountRequest) {
    const res = await fetch('http://localhost:8080/user/account/create', {
        method: "POST",
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        await res.json();
        window.location.replace("http://localhost:3000/accounts");
    } else {
        handleError(res);
    }
}

export async function freezeAccount(accountNumber) {
    const res = await fetch('http://localhost:8080/user/account/freeze', {
        method: "POST",
        body: accountNumber,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        await res.json();
        window.location.replace("http://localhost:3000/accounts");
    } else {
        handleError(res);
    }
}

export async function unfreezeAccount(accountNumber) {
    const res = await fetch('http://localhost:8080/user/account/unfreeze', {
        method: "POST",
        body: accountNumber,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        await res.json();
        window.location.replace("http://localhost:3000/accounts");
    } else {
        handleError(res);
    }
}

export async function getTransferHistory() {
    const res = await fetch('http://localhost:8080/user/account/transfer/history', {
        method: "POST",
        body: localStorage.getItem("username"),
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        console.log("faaaaas");
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function searchTransferHistory(searchRequest) {
    const res = await fetch('http://localhost:8080/user/account/transfer/search', {
        method: "POST",
        body: JSON.stringify(searchRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function makeTransaction(transferRequest) {
    const res = await fetch('http://localhost:8080/user/account/transfer', {
        method: "POST",
        body: JSON.stringify(transferRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        await res.json();
        window.location.replace("http://localhost:3000/transactions");
    } else {
        handleError(res);
    }
}

export async function getPersonalData() {
    const res = await fetch('http://localhost:8080/user/personal', {
        method: "POST",
        body: localStorage.getItem("username"),
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function updatePersonalData(updatedData) {
    const res = await fetch('http://localhost:8080/user/personal/update', {
        method: "POST",
        body: JSON.stringify(updatedData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        notify("Data updated", { type: toast.TYPE.SUCCESS });
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function changePassword(passwordRequest) {
    const res = await fetch('http://localhost:8080/user/personal/password', {
        method: "POST",
        body: JSON.stringify(passwordRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        notify("Password successfully changed!", { type: toast.TYPE.SUCCESS });
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function calculateLoan(loanRequest) {
    const res = await fetch('http://localhost:8080/user/account/loan/calculate', {
        method: "POST",
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function takeLoan(loanRequest) {
    const res = await fetch('http://localhost:8080/user/account/loan', {
        method: "POST",
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        notify("Loan taken", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/loans"), 2000)
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function getLoans() {
    const res = await fetch('http://localhost:8080/user/account/loans', {
        method: "POST",
        body: localStorage.getItem("username"),
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

async function handleError(res) {
    const error = await res.json();
    if (error.status === 401 || error.status === 403) {
        notify(error.message, { type: toast.TYPE.ERROR });
        setTimeout(() => window.location.replace("http://localhost:3000/login"), 2000)
    } else {
        notify(error.message, { type: toast.TYPE.ERROR });
        console.log(error);
    }
}

function handleSuccess() {
    notify("Process successfully finished", { type: toast.TYPE.SUCCESS });
}
