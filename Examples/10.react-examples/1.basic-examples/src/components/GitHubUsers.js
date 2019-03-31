//Source: https://scotch.io/tutorials/getting-started-with-react-hooks
import React, { useState, useEffect } from "react";

function GitHubUsers() {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        setUsers(data); // set users in state
    }, []); // pass empty array to run this effect once when the component loads

    return (
        <>
            <h3>GitHub users</h3>
            <ul>
                {users.map(user =>
                    <li key={user.id}>
                        {user.login}
                    </li>
                )}
            </ul>
        </>
    );
}

export default GitHubUsers;