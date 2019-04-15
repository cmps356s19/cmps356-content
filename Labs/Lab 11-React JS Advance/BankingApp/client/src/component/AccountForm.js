import React from 'react';

function AccountForm() {
    return (
        <div>
            <h3>Add Account</h3>
            <form>
                <label htmlFor="acctType">Account Type</label>
                <select name="acctType" id="acctType" required>
                    <option></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance">Balance</label>
                <input type="number" name="balance" id="balance" required/>
                <button type="Submit">Submit</button>
            </form>
        </div>
    )
};

export default AccountForm;
