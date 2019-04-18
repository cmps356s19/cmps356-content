import React from 'react'
import Account from "./Account";

function AccountTable({accounts, onDeleteAccount}) {
    return <>
        <h1>Accounts</h1>
        <table>
            <thead>
            <tr>
                <th>Account No</th>
                <th>Account Type</th>
                <th>Balance</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map(account => <Account onDeleteAccount={onDeleteAccount}
                                              key={account._id}
                                              account={account}/>)}
            </tbody>
        </table>
    </>
}
export default AccountTable;