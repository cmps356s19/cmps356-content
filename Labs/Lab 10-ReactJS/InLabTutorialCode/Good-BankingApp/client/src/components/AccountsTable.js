import React from 'react';
import Account from './Account'
import {Link} from "react-router-dom";

export default function AccountsTable({accounts, onAcctTypeChange, onDeleteAccount}) {
    return (
        <>

            <br/><br/>
            <label htmlFor="acctType">
                Account Type
            </label>
            <select name="acctType" onChange={(e) => onAcctTypeChange(e.target.value)}>
                <option value="All">All</option>
                <option value="Current">Current</option>
                <option value="Saving">Saving</option>
            </select>
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
                {accounts.map((account, index) =>
                    <Account
                        onDeleteAccount={() => onDeleteAccount(account._id)}
                        key={index}
                        account={account}
                    />)
                }
                </tbody>
            </table>
            <Link to="/accts/add" className="float"><i className="fa fa-plus my-float"/></Link>
        </>
    )
}