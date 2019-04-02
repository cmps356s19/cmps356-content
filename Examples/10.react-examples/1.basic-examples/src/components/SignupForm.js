import React, { useState } from "react";

function SignupForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <form>
            <label htmlFor="firstName">First name</label>
            <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                type="text"
                name="firstName" id="firstName"
                required
            />

            <label htmlFor="lastName">Last name</label>
            <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
                type="text"
                name="lastName" id="lastName"
                required
            />

            <label htmlFor="email">Email</label>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                name="email" id="email"
                required
            />

            <label htmlFor="password">Password</label>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password" id="password"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}
export default SignupForm;