import React from 'react'
function Account({account, onDeleteAccount}) {
    return <tr>
        <td>{account._id}</td>
        <td>{account.acctType}</td>
        <td>{account.balance}</td>
        <td><button
            onClick={()=>onDeleteAccount(account._id)}>
            Delete
        </button></td>

    </tr>
}

export default Account;