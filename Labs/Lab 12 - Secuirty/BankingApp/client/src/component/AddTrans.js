import React from 'react';

function AddTrans() {
    return (
        <div>
            <h3>Add Transaction</h3>
            <form>
                <label htmlFor="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required>
                    <option></option>
                </select>

                <lablel htmlFor="type">Transaction Type</lablel>
                <select name="type" id="type" required>
                    <option></option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" required/>
                    <button type="Submit">Submit</button>
            </form>
        </div>
    )
};

export default AddTrans;
