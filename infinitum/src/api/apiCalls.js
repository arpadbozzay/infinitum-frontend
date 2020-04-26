import fetch from "node-fetch";
import store from "../store";
import { toast } from "react-toastify";

const notify = (msg, options) => { toast(msg, options) }

////// USER ACTIONS //////

export async function baseUserCall() {
    const res = await fetch('http://localhost:8080/user/base', {
        method: "GET",
    });
    if (res.status === 200) {
        await res.text();
    } else {
        handleError(res);
    }
}

export async function registrate(registrationRequest) {
    const res = await fetch('http://localhost:8080/user/registration', {
        method: "POST",
        body: JSON.stringify(registrationRequest),
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 200) {
        const username = await res.text();
        localStorage.setItem("username", username);
        window.location.replace("http://localhost:3000/registrationconfirm");
    } else {
        handleError(res);
    }
}

export async function confirmRegistration() {
    const res = await fetch('http://localhost:8080/user/registration/confirm', {
        method: "POST",
        body: localStorage.getItem("username"),
    });
    if (res.status === 200) {
        return await res.text();
    } else {
        handleError(res);
    }
}

export async function login(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    console.log(csrfCookie);
    const res = await fetch('http://localhost:8080/user/login', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        const json = await res.json();
        localStorage.setItem("jwtToken", json.jwtToken);
        localStorage.setItem("username", json.username);
        localStorage.setItem("userType", json.userType);
        window.location.replace("http://localhost:3000/accounts");
    } else {
        handleError(res);
    }
}

//////// ACCOUNT PAGE //////

export async function getBankAccounts() {
    const res = await fetch(`http://localhost:8080/user/accounts?username=${localStorage.getItem("username")}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}


export async function getCurrencies() {
    const res = await fetch('http://localhost:8080/user/currencies', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function createAccount(accountRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/create', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.json();
        window.location.replace("http://localhost:3000/accounts");
    } else {
        handleError(res);
    }
}

////// TRANSACTION TYPES ////////

export async function freezeAccount(accountNumber) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/freeze', {
        method: "POST",
        credentials: 'include',
        body: accountNumber,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
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
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/unfreeze', {
        method: "POST",
        credentials: 'include',
        body: accountNumber,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
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
    const res = await fetch(`http://localhost:8080/user/account/transfer/history?username=${localStorage.getItem("username")}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function searchTransferHistory(searchRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/transfer/search', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(searchRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function makeTransaction(transferRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/transfer', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(transferRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.json();
        notify("Transaction was successful!", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/transactions"), 2000)
    } else {
        handleError(res);
    }
}

////// CUSTOMER SETTINGS ///////

export async function getPersonalData() {
    const res = await fetch(`http://localhost:8080/user/personal?username=${localStorage.getItem("username")}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function updatePersonalData(updatedData) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/personal/update', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(updatedData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
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
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/personal/password', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(passwordRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        notify("Password successfully changed!", { type: toast.TYPE.SUCCESS });
        return await res.text();
    } else {
        handleError(res);
    }
}

///// INVESTMENT ///////

export async function calculateLoan(loanRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/calculate', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function takeLoan(loanRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/loan', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
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
    const res = await fetch(`http://localhost:8080/user/account/loans?username=${localStorage.getItem("username")}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function takeDebit(loanRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/user/account/debit', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        notify("Debit taken", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/debits"), 2000)
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function getDebits() {
    const res = await fetch(`http://localhost:8080/user/account/debits?username=${localStorage.getItem("username")}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        },
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

/////////////////////////////////////// ADMIN /////////////////////////////////

export async function baseAdminCall() {
    const res = await fetch('http://localhost:8080/admin/base', {
        method: "GET",
    });
    if (res.status === 200) {
        await res.text();
    } else {
        handleError(res);
    }
}

export async function getBankRoles() {
    const res = await fetch('http://localhost:8080/admin/auth/roles', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}


export async function adminLogin(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/admin/login', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        const json = await res.json();
        localStorage.setItem("jwtToken", json.jwtToken);
        localStorage.setItem("username", json.username);
        localStorage.setItem("userType", json.userType);
        window.location.replace("http://localhost:3000/admin/users");
    } else {
        handleError(res);
    }
}

export async function getAdminBankAccounts() {
    const res = await fetch('http://localhost:8080/admin/auth/accounts', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function deleteBankAccount(accountRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/admin/auth/accounts/delete', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.text();
        notify("Account deleted", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/admin/accounts"), 2000)
    } else {
        handleError(res);
    }
}

export async function updateBankAccount(accountRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/admin/auth/accounts/update', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.json();
        notify("Account updated", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/admin/accounts"), 2000)
    } else {
        handleError(res);
    }
}

export async function getAdminUsers() {
    const res = await fetch('http://localhost:8080/admin/auth/users', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username")
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function deleteUser(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/admin/auth/user/delete', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.text();
        notify("User deleted", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/admin/users"), 2000)
    } else {
        handleError(res);
    }
}

export async function updateUser(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/admin/auth/user/update', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.json();
        notify("User updated", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/admin/users"), 2000)
    } else {
        handleError(res);
    }
}

export async function addUser(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch('http://localhost:8080/admin/auth/user/add', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "XInifinitumUsername": localStorage.getItem("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.json();
        notify("User added", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace("http://localhost:3000/admin/users"), 2000)
    } else {
        handleError(res);
    }
}


async function handleError(res) {
    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("username");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userType");
        notify(res.message, { type: toast.TYPE.ERROR });
        setTimeout(() => window.location.replace("http://localhost:3000/"), 2000)
    }
    const error = await res.json();
    notify(error.message, { type: toast.TYPE.ERROR });
}

function handleSuccess() {
    notify("Process successfully finished", { type: toast.TYPE.SUCCESS });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
