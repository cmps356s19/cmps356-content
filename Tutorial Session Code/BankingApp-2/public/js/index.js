//After the document is loaded in the browser
document.addEventListener("DOMContentLoaded", async () => {
    await handleLoadAccounts();
});

//returns all the accounts depending on the type the user selected
async function getAccounts(acctType) {
    let url = '/api/accounts/';
    if (acctType) {
        url = `${url}?acctType=${acctType}`;
    }
    const response = await fetch(url);
    return response.json();
}

async function handleLoadAccounts(acctType) {
    try {
        const accounts = await getAccounts(acctType);

        document.querySelector('#accounts-table').innerHTML =
            `<table id="accounts">
                <tr>
                    <th>Account No</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                </tr>
                ${accounts.map(account => accountToHTMLRow(account)).join('')} 
            <table>`;
    } catch (e) {
        console.log(e);
    }
}

function accountToHTMLRow(acct) {
    return `
        <tr id="row-${acct.accountNo}">
            <td>${acct.accountNo}</td>
            <td>${acct.acctType}</td>
            <td>${acct.balance}</td>
            <td>
                ${ acct.balance <= 0 ? 
                        `<button onclick='handleDeleteAccount(${acct.accountNo})'>
                            <i class="fas fa-pencil-alt"></i>
                        </button>` 
                    : ''
                }
            </td>
        </tr>   
    `
}

async function handleDeleteAccount(accountNo) {
    try {
        const confirmed = confirm("Are you sure you want to delete this account?");
        if (confirmed) {
            await fetch(`/api/accounts/${accountNo}`,{method : 'delete'});
            document.querySelector(`#row-${accountNo}`).remove();
        }
    } catch(e){
        console.log(e);
    }
}

async function handleAddAccount(event) {
    try {
        const form = event.target.form;
        const isFormValid = form.checkValidity();
        if (!isFormValid) return;

        event.preventDefault();

        const account = formToObject(form);
        console.log('account', account);
        await fetch('/api/accounts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(account)
            });
        window.location.href = 'index.html'
    } catch (e) {
        console.log(e);
    }
}

async function fillAccountsDD() {
    try {
        const accounts = await getAccounts('All');
        document.querySelector('#accountNo').innerHTML +=
            `${ accounts.map(account => accountToHtmlOption(account)).join('') }`;

    } catch (e) {
        console.log(e);
    }
}

function accountToHtmlOption(account) {
    return  `<option value='${account.accountNo}'>
                #${account.accountNo} - ${account.acctType} (QR ${account.balance})
             </option>`;
}

async function handleAddTrans(event) {
    try{
        const form = event.target.form;
        const isFormValid = form.checkValidity();
        if (!isFormValid) return;

        event.preventDefault();
        const trans = formToObject(form);
        const url = `/api/accounts/${trans.accountNo}/trans`
        await fetch(url, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(trans)
        });
        window.location.href = 'index.html'
    } catch(e){
        console.log(e);
    }
}

async function loadPage(pageName) {
    const response = await fetch(pageName);
    document.querySelector('#main').innerHTML = await response.text();
    if (pageName === "acct-trans.html")
        await fillAccountsDD();
}

function formToObject(form) {
    // Construct key/value pairs representing form fields and their values,
    const formData = new FormData(form);
    let formObject = {};

    // Convert key/value pairs to an object
    formData.forEach( (value, key) => {
        formObject[key] = value;
    });

    return formObject;
}