import React, {useState, useEffect} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import AccountsTable from "./AccountsTable";
import AccountForm from "./AccountForm";

function Accounts() {
    const [accounts, setAccounts] = useState([
        {
            _id: 200,
            acctType: "Saving",
            balance: 4000
        },
        {
            _id: 201,
            acctType: "Current ",
            balance: 4000
        },
        {
            _id: 202,
            acctType: "Saving",
            balance: 4000
        }
    ])
    return (
        <div>
            <AccountsTable
                accounts={accounts}/>
            <AccountForm/>
        </div>
    )
};

export default Accounts;
