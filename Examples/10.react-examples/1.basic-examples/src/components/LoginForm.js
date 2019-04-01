import React, { useState } from "react";

function LoginForm () {
    const [values, setValues] = useState({ email: "", password: "" });

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        //Merge the object before change with the updated property
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        alert(JSON.stringify(values));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
                name="email" id="email" placeholder="e-mail"
                type="email" required
                value={values.user}
                onChange={handleChange} />

            <label htmlFor='password'>Password</label>
            <input
                name="password" id="password" placeholder="password"
                type="password" required
                value={values.password}
                onChange={handleChange} />

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;