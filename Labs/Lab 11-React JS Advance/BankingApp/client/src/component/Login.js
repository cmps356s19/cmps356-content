import React from 'react';

function Login(prop) {

    function handleLoginAccounts() {
       prop.history.push(prop.from)
    }
    return (
        <div>
            <h3>Login</h3>
            <form>
                <label htmlFor="username">UserName</label>
                <input type="email" id="username" name="username" required/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required/>
                <button type="Submit" onClick={handleLoginAccounts}>Submit</button>
            </form>
        </div>
    )
};

export default Login;
