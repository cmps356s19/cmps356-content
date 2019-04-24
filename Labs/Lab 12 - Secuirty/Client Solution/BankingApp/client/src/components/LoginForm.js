import React, { useState } from "react";
import GoogleLogin from 'react-google-login';

function LoginForm ({onLogin, location, history}) {
    const googleClientId = "866457396346-piq09ek9kiofq9uspsnjulv1mu1v4s8k.apps.googleusercontent.com";
    const [values, setValues] = useState({email: "", password: ""});

    // If Google Login does not work then try to clear the browser cash
    // See more info @ https://github.com/anthonyjgrove/react-google-login/issues/132
    const handleGoogleResponse = (response) => {
        console.log(response);
        const user = response.profileObj;
        user.role = 'Clerk';
        console.log(user);
        if (user) {
            console.log('id_token from Google', response.tokenId);
            console.log('User profile from Google', user);
            console.log('access_token from Google', response.accessToken);
            handleLogin(user);
        }
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        //alert(JSON.stringify(values));
        //ToDo: implement server-side authentication
        const user = {givenName: values.email, email: values.email};
        if (values.email === 'manager@test.com')
            user.role = 'Manager';
        else
            user.role = 'Clerk';

        handleLogin(user);
    };

    const handleLogin = (user) => {
        onLogin(user);

        let redirectTo = user.role === "Manager" ? "/acct/list" : "/addTrans";
        if (location.state && location.state.from) {
            redirectTo = location.state.from;
        }

        history.push(redirectTo);
    };
    return (
        <>
            <div className="align-center">
                <strong>Clerk</strong> - U: clerk@test.com P: clerk
                <br/>
                <strong>Manager</strong> - U: manager@test.com P: manager
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    name="email" id="email" placeholder="e-mail"
                    type="email" required
                    value={values.email}
                    onChange={handleChange}/>

                <label htmlFor='password'>Password</label>
                <input
                    name="password" id="password" placeholder="password"
                    type="password" required
                    value={values.password}
                    onChange={handleChange}/>

                <button type="submit">Login</button>
            </form>
            <br />
            <div className="align-center">
                <GoogleLogin
                    clientId={googleClientId}
                    onSuccess={handleGoogleResponse}
                    onFailure={handleGoogleResponse}
                />
            </div>
        </>
    );
}

export default LoginForm;