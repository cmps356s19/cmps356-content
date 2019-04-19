import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import logo from './imgs/logo.png'
import {login, addOpenIdUser} from '../api-calls/AuthService'

function LoginForm ({onLogin, location, history}) {
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [manageMyGoogleContacts, setManageMyGoogleContacts] = useState(true);
    const [googleAuthScope, setGoogleAuthScope] = useState("profile email");

    const handleChange = e => {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    };

    const handleLocalLogin = async e => {
        e.preventDefault();
        await authenticate('local');
    };

    // If Google Login does not work then try to clear the browser cash
    // See more info @ https://github.com/anthonyjgrove/react-google-login/issues/132
    const handleGoogleResponse = async (authResponse) => {
        console.log(authResponse);
        console.log('id_token from Google', authResponse.tokenObj.id_token);
        console.log('access_token from Google', authResponse.access_token);
        await authenticate('google', authResponse.tokenObj);
    };

    const authenticate = async (oidProvider, tokenObj) => {
        setError('');
        try {
           let user;
           if (oidProvider == 'local') {
                const userInfo = {name: this.name, password: this.password};
                user = await login(loginInfo);
            } else {
                user = await addOpenIdUser(tokenObj);
            }
            console.log('LoginForm.authenticate.user: ', user);

            //Let the App component know (to enable components to rerender after login)
            // and redirect to requested page
            if (user) {
                console.log('User profile after login: ', user);
                redirectAfterLogin(user);
            } else {
                setError("Authentication failed 😱");
            }
        } catch (err) {
            console.log('LoginForm.authenticate: ', err);
            setError(`${err}😱`);
        }
    };

    const redirectAfterLogin = (user) => {
        //Let the App component know
        onLogin(user);

        let redirectTo = "/";
        if (location.state && location.state.from) {
            redirectTo = location.state.from;
        }

        history.push(redirectTo);
    };

    const handleManageMyGoogleContacts = e => {
        setManageMyGoogleContacts(e.target.checked);
        console.log("manageMyGoogleContacts", manageMyGoogleContacts, e.target.checked);
        if (!e.target.checked)
            setGoogleAuthScope("profile email");
        else
            setGoogleAuthScope("profile email https://www.googleapis.com/auth/contacts");
    };

    return (
        <>
            <div className="align-center">
                <img src={logo} className="logo" />
                <h3>Login</h3>
                <hr />
                <div>Login using: admin@jwt.org pass: secret.</div>
                <div>Or login using your Gmail account.</div>
                <div>Or signup using postman @ http://localhost:3040/auth/signup. Lazy to provide UI 🙄</div>
            </div>

            <form onSubmit={handleLocalLogin}>
                <label htmlFor='email'>Email</label>
                <input
                    name="email" id="email" placeholder="e-mail"
                    type="email" required
                    value={loginInfo.email}
                    onChange={handleChange}/>

                <label htmlFor='password'>Password</label>
                <input
                    name="password" id="password" placeholder="password"
                    type="password" required
                    value={loginInfo.password}
                    onChange={handleChange} />

                <button type="submit">Login</button>
            </form>
            <br />
            {error && <p className="text-danger">{error}</p>}
            <br />
            <div className="align-center">
                <GoogleLogin
                    clientId="866457396346-piq09ek9kiofq9uspsnjulv1mu1v4s8k.apps.googleusercontent.com"
                    buttonText="Login"
                    scope={googleAuthScope}
                    onSuccess={handleGoogleResponse}
                    onFailure={handleGoogleResponse}
                    cookiePolicy={'single_host_origin'}
                />
                <br />
                <label>
                    <input type="checkbox"  checked={manageMyGoogleContacts}
                             onChange={handleManageMyGoogleContacts} />
                    Manage my Google Contacts
                </label>
            </div>
        </>
    );
}

export default LoginForm;