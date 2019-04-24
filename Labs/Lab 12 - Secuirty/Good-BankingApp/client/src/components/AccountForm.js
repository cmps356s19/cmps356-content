import React, {useState} from 'react'

function
AccountForm({acct, onSubmit}) {
    const [account, setAccount] = useState(acct);

    async function handleAddAccount(e) {
        e.preventDefault();
        onSubmit(account);
    }

    function handleInputChange(e) {
        let newAccount = {...account};
        newAccount[e.target.name] = e.target.value;
        setAccount(newAccount);
    }

    return (
        <div>
            <h3>{account._id ? `Edit Account (Acct #${account._id})` : "Add Account"}</h3>
            <form onSubmit={handleAddAccount}>
                <label htmlFor="acctType">Account Type</label>
                <select onChange={handleInputChange}
                        value={account.acctType}
                        name="acctType" id="acctType" required>
                    <option></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance">Balance</label>
                <input
                    value={account.balance} required
                    onChange={handleInputChange} type="number" name="balance" id="balance"/>

                <button type="Submit">Submit</button>
            </form>
        </div>
    );
}

export default AccountForm;