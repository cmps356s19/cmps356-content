import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
    <nav>
        <ul>
            <li>Alpha Bank</li>
            <li>
                <Link to="/accts/list">Accounts</Link>
            </li>
            <li>
                <Link to="/addTrans">Add Transaction</Link>
            </li>
        </ul>
    </nav>
    )
}