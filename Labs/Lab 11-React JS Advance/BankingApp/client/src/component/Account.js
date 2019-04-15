import React from 'react';
import {Link} from 'react-router-dom';


function Account({account}) {
    return (
        <tr>
            <td>{account._id}</td>
            <td>{account.acctType}</td>
            <td>{account.balance}</td>
        </tr>
    )
};

export default Account;
