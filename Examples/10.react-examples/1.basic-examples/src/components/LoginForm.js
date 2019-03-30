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
            <input
                name="email" placeholder="e-mail"
                type="email" required
                value={values.user}
                onChange={handleChange} />
            <input
                name="password" placeholder="password"
                type="password" required
                value={values.password}
                onChange={handleChange} />
            <input type="submit" />
        </form>
    );
};

export default LoginForm;