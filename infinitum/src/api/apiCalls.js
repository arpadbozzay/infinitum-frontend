import fetch from "node-fetch";
import config from "../config/config";
import { toast } from "react-toastify";
import { deleteAllCookies, getCookie } from "../common";

const notify = (msg, options) => { toast(msg, options) }

////// USER ACTIONS //////

export async function baseUserCall() {
    const res = await fetch(`${config.backend}/user/base`, {
        credentials: 'include',
        method: "GET",
    });
    if (res.status === 200) {
        await res.text();
    } else {
        handleError(res);
    }
}

export async function registrate(registrationRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/user/base/registration`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(registrationRequest),
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.text();
        window.location.replace(`${config.frontend}/registrationconfirm`);
    } else {
        handleError(res);
    }
}

export async function confirmRegistration() {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/user/base/registration/confirm`, {
        method: "POST",
        credentials: 'include',
        headers: { 'X-XSRF-TOKEN': csrfCookie }
    });
    if (res.status === 200) {
        return await res.text();
    } else {
        handleError(res);
    }
}

export async function login(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/user/base/login`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.text();
        window.location.replace(`${config.frontend}/accounts`);
    } else {
        handleError(res);
    }
}

//////// ACCOUNT PAGE //////

export async function getBankAccounts() {
    const res = await fetch(`${config.backend}/user/accounts`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        handleError(res);
    }
}


export async function getCurrencies() {
    const res = await fetch(`${config.backend}/user/currencies`, {
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/user/account/create`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.json();
        notify("Account created", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/accounts`), 2000);
    } else {
        handleError(res);
    }
}
export async function freezeAccount(accountNumber) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/user/account/freeze`, {
        method: "POST",
        credentials: 'include',
        body: accountNumber,
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.json();
        notify("Account frozen", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/accounts`), 2000);
    } else {
        handleError(res);
    }
}

export async function unfreezeAccount(accountNumber) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/user/account/unfreeze`, {
        method: "POST",
        credentials: 'include',
        body: accountNumber,
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.json();
        notify("Account unfrozen", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/accounts`), 2000);
    } else {
        handleError(res);
    }
}

////// TRANSACTION TYPES ////////

export async function getTransferHistory() {
    const res = await fetch(`${config.backend}/user/account/transfer/history`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/user/account/transfer/search`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(searchRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
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
    const res = await fetch(`${config.backend}/user/account/transfer`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(transferRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.json();
        notify("Transaction was successful!", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/transactions`), 2000)
    } else {
        handleError(res);
    }
}

////// CUSTOMER SETTINGS ///////

export async function getPersonalData() {
    const res = await fetch(`${config.backend}/user/personal`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/user/personal/update`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(updatedData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
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
    const res = await fetch(`${config.backend}/user/personal/password`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(passwordRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
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
    const res = await fetch(`${config.backend}/user/account/calculate`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
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
    const res = await fetch(`${config.backend}/user/account/loan`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        notify("Loan taken", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/loans`), 2000)
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function getLoans() {
    const res = await fetch(`${config.backend}/user/account/loans`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/user/account/debit`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loanRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        notify("Debit taken", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/debits`), 2000)
        return await res.json();
    } else {
        handleError(res);
    }
}

export async function getDebits() {
    const res = await fetch(`${config.backend}/user/account/debits`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/admin/base`, {
        credentials: 'include',
        method: "GET",
    });
    if (res.status === 200) {
        await res.text();
    } else {
        handleError(res);
    }
}

export async function getBankRoles() {
    const res = await fetch(`${config.backend}/admin/auth/roles`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/admin/base/login`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfCookie
        },
    });
    if (res.status === 200) {
        await res.text();
        window.location.replace(`${config.frontend}/admin/users`);
    } else {
        handleError(res);
    }
}

export async function getAdminBankAccounts() {
    const res = await fetch(`${config.backend}/admin/auth/accounts`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/admin/auth/accounts/delete`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.text();
        notify("Account deleted", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/admin/accounts`), 2000)
    } else {
        handleError(res);
    }
}

export async function updateBankAccount(accountRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/admin/auth/accounts/update`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(accountRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.json();
        notify("Account updated", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/admin/accounts`), 2000)
    } else {
        handleError(res);
    }
}

export async function getAdminUsers() {
    const res = await fetch(`${config.backend}/admin/auth/users`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username")
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
    const res = await fetch(`${config.backend}/admin/auth/user/delete`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.text();
        notify("User deleted", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/admin/users`), 2000)
    } else {
        handleError(res);
    }
}

export async function updateUser(userRequest) {
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/admin/auth/user/update`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.json();
        notify("User updated", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/admin/users`), 2000)
    } else {
        handleError(res);
    }
}

export async function addUser(userRequest) {
    if (!userRequest.deleted) {
        userRequest.deleted = false;
    }
    const csrfCookie = getCookie("XSRF-TOKEN");
    const res = await fetch(`${config.backend}/admin/auth/user/add`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userRequest),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("jwtToken")}`,
            "XInifinitumUsername": getCookie("username"),
            'X-XSRF-TOKEN': csrfCookie
        }
    });
    if (res.status === 200) {
        await res.json();
        notify("User added", { type: toast.TYPE.SUCCESS });
        setTimeout(() => window.location.replace(`${config.frontend}/admin/users`), 2000)
    } else {
        handleError(res);
    }
}


async function handleError(res) {
    if (res.status === 401 || res.status === 403) {
        deleteAllCookies();
        notify(res.message, { type: toast.TYPE.ERROR });
        setTimeout(() => window.location.replace(`${config.frontend}/`), 2000)
    }
    const error = await res.json();
    notify(error.message, { type: toast.TYPE.ERROR });
}



