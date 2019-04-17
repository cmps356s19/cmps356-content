import React, {useState} from 'react'
import AddAccount from "./AddAccount";
import AccountTable from "./AccountsTable";

function Accounts() {
    const initialValue = [
        {
            _id: 1000,
            acctType: "Saving",
            balance: 2000
        },
        {
            _id: 1001,
            acctType: "Current",
            balance: 12000
        }
    ];
    const [accounts, setAccounts] = useState(initialValue);

    function handleAddAccount(account) {
        account._id = accounts.length + 1;
        const newAccounts = [...accounts];
        newAccounts.push(account);
        setAccounts(newAccounts);
    }

    function handleDeleteAccount(id) {
        const newAccounts = accounts.filter(account=> account._id!=id)
        setAccounts(newAccounts)
    }

    return <>
        <AddAccount onAddAccount={handleAddAccount}/>
        <AccountTable onDeleteAccount={handleDeleteAccount} accounts={accounts}/>
    </>
}

export default Accounts;