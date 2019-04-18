import React, {useState} from 'react'

function AddAccount({onAddAccount}) {
    const [account, setAccount] = useState({});

    function handleChange(e) {
        const newAccount = {
            ...account,
            [e.target.name]: e.target.value

        };
        setAccount(newAccount)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddAccount(account);
    }
    return <>
        <h3>Add Account</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="acctType">Account Type</label>
            <select
                onChange={handleChange}
                name="acctType" id="acctType" required>

                <option></option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>

            <label htmlFor="balance">Balance</label>
            <input
                onChange={handleChange}
                type="number" name="balance" id="balance" required/>
            <button type="Submit">Submit</button>
        </form>
    </>
}

export default AddAccount;