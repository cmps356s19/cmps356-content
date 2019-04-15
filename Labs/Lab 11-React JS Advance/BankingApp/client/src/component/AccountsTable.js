import React from 'react';
import Account from "./Account";

function AccountsTable({accounts}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Account No</th>
                <th>Type</th>
                <th>Balance</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map(account=> <Account  key={account._id} account={account}/>)}
            </tbody>
        </table>
    )
};

export default AccountsTable;
