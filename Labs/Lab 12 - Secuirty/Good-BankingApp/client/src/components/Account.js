import React from 'react'
import {Link} from 'react-router-dom'

export default function Account({account, onDeleteAccount}) {
    return (
        <tr>
            <td>{account._id}</td>
            <td>{account.acctType}</td>
            <td>{account.balance}</td>
            <td >
                <Link to={`/accts/${account._id}`}>Edit</Link>

                {/* Show an edit link if the balance is equal 0 */}
                { account.balance == 0 &&
                    <a style={{marginLeft: '8px'}} href="#" onClick={onDeleteAccount}>Delete</a>
                }
            </td>
        </tr>
    );
}