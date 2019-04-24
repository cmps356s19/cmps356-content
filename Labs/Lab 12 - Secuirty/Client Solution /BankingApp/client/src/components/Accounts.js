import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import AccountsTable from "./AccountsTable";
import AccountForm from "./AccountForm";

export default function Accounts({history}) {
    const [accounts, setAccounts] = useState([]);

    const getAccounts = async (acctType) => {
        let url = 'http://localhost:5000/api/accounts';
        if (acctType) {
            url = `${url}?acctType=${acctType}`
        }
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setAccounts(data);
    };

    async function handleDeleteAccount(acctId) {
        try {
            const confirmed = confirm("Are you sure you want to delete this account?");
            if (confirmed) {
                const url = `http://localhost:5000/api/accounts/${acctId}`
                await fetch(url, {method: 'delete'});
                setAccounts(accounts.filter(a => a._id != acctId));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function handleAddAccount(account) {
        let url = 'http://localhost:5000/api/accounts';
        const response = await fetch(url,
            {
                method: 'Post',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(account)
            });

        account = await response.json();

        const newAccts = [...accounts, account];
        setAccounts(newAccts);
        history.push("/accts/list");
    }

    async function handleUpdateAccount(account) {
        let url = `http://localhost:5000/api/accounts/${account._id}`;
        let httpVerb = 'Put';
        const response = await fetch(url,
            {
                method: httpVerb,
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(account)
            });

        const newAccts = [...accounts];
        const udatedAcctIndex = newAccts.findIndex(a => a._id == account._id);
        newAccts[udatedAcctIndex] = account;
        setAccounts(newAccts);
        history.push("/accts/list");
    }

    // Load all accounts once when the component is mounted to the DOM
    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <div>
          <Switch>
            <Route exact path="/accts/list"
                   render={() => <AccountsTable
                       accounts={accounts}
                       onDeleteAccount={handleDeleteAccount}
                       onAcctTypeChange={getAccounts} />
                    }
            />

            <Route path="/accts/add"
                   render={() => {
                       const acct = {acctType: '', balance: ''};
                       return <AccountForm acct={acct} onSubmit={handleAddAccount}/>
                   }}
            />

            <Route path="/accts/:acctId"
                   render={({match}) => {
                       const acctId = match.params.acctId;
                       console.log("match.params.acctId", match.params.acctId);
                       const acct = accounts.find(a => a._id == acctId);
                       console.log("match.params.acctId", acct);
                       return <AccountForm
                               key={acctId}
                               acct={acct}
                               onSubmit={handleUpdateAccount}/>
                   }}
            />
          </Switch>
        </div>
    )
}