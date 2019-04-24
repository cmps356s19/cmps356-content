import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function NavBar({isAuthenticated, user, onLogout, history, location}) {

    // Auto-run this function every time the isAuthenticated changes
    // If the user is NOT authenticated then redirect to login
    useEffect(() => {
        if (!isAuthenticated && location.pathname === '/') {
            console.log("NavBar.location", location);
            console.log("NavBar redirecting to /login because the user is not authenticated");
            history.push('/login');
        }
    }, [isAuthenticated]);

    const handleLogout = (e) => {
        e.preventDefault();
        onLogout();
    };

    if (!isAuthenticated) {
        return <></>;
    }

    return (
        <nav>
            <ul>
                <li>Alpha Bank</li>
                {user && user.role === 'Manager' &&
                    <li>
                        <Link to="/accts/list">Accounts</Link>
                    </li>
                }
                {user && user.role === 'Clerk' &&
                    <li>
                        <Link to="/addTrans">Add Transaction</Link>
                    </li>
                }
                {isAuthenticated && user && <li>Welcome {user.givenName} (<a href="#" onClick={handleLogout}>Logout</a>)</li> }
            </ul>
        </nav>
    )
}