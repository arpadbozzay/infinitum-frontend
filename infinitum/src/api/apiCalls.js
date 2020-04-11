import fetch from "node-fetch";

export async function getBankAccounts() {
    const res = await fetch('http://localhost:8080/user/accounts', {
        method: "POST",
        body: localStorage.getItem("username"),
        headers: { "Authorization": `Bearer ${localStorage.getItem("jwtToken")}` }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        console.log(await res.text());
        window.location.replace("http://localhost:3000/login");
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
        localStorage.setItem("isAuthenticated", true);
        window.location.replace("http://localhost:3000/");
    } else {
        console.log(await res.text());
        window.location.replace("http://localhost:3000/login");
    }
}

export async function getCurrencies() {
    const res = await fetch('http://localhost:8080/user/currencies', {
        headers: { "Authorization": `Bearer ${localStorage.getItem("jwtToken")}` }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        console.log(await res.text());
        window.location.replace("http://localhost:3000/login");
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
        console.log(await res.text());
        window.location.replace("http://localhost:3000/login");
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
        console.log(await res.text());
        window.location.replace("http://localhost:3000/login");
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
        console.log(await res.text());
        window.location.replace("http://localhost:3000/login");
    }
}
