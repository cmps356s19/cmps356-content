import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import logo from './imgs/logo.png'
import {login, addOpenIdUser} from '../api-calls/AuthService'

function LoginForm ({onLogin, location, history}) {
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [manageMyGoogleContacts, setManageMyGoogleContacts] = useState(true);
    const [googleAuthScope, setGoogleAuthScope] = useState("profile email");

    // If Google Login does not work then try to clear the browser cash
    // See more info @ https://github.com/anthonyjgrove/react-google-login/issues/132
    const handleGoogleResponse = async (authResponse) => {
        console.log(authResponse);
        //console.log('id_token from Google', authResponse.tokenId);
        //console.log('access_token from Google', authResponse.accessToken);

        setError('');
        try {
            const user = await addOpenIdUser(authResponse.tokenObj);
            if (user) {
                console.log('Google user profile after adding it to local DB: ', user);
                handleLogin(user);
            } else {
                setError("Authentication failed 😱");
            }
        } catch (err) {
            console.log('Login.vue.authenticate.err: ', err);
            setError(`${err}😱`);
        }
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await localAuthenticate();
    };

    const handleLogin = (user) => {
        onLogin(user);

        let redirectTo = "/";
        if (location.state && location.state.from) {
            redirectTo = location.state.from;
        }

        history.push(redirectTo);
    };

    const localAuthenticate = async (oidProvider) => {
        setError('');
        try {
            const user = await login(loginInfo);
/*            if (oidProvider == 'local') {
                const userInfo = {name: this.name, password: this.password};
                user = await AuthService.login(userInfo);
            } else {
                user = await AuthService.addOpenIdUser(oidProvider, this.manageMyGoogleContacts);
            }*/
            console.log('LoginForm.authenticate.user: ', user);

            //Emit an event so that the MenuBar component can be notified to refresh the menu
            if (user) {
                handleLogin(user);
            } else {
                setError("Authentication failed 😱");
            }
        } catch (err) {
            console.log('Login.vue.authenticate.err: ', err);
            setError(`${err}😱`);
        }
    }

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

            <form onSubmit={handleSubmit}>
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