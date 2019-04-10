import React, {useState, useEffect, useRef} from 'react'

function TransForm({history}) {
    const [accounts, setAccounts] = useState([]);
    const [transaction, setTransaction] = useState({});

    const getAccounts = async () => {
        const url = 'http://localhost:5000/api/accounts';
        const response = await fetch(url);
        const data = await response.json();
        setAccounts(data);
    }

    useEffect(() => {
        getAccounts();
    }, []);

    function handleInputChange(e) {
        const newTransaction = {...transaction};
        newTransaction[e.target.name] = e.target.value
        setTransaction(newTransaction);

    }

    async function handleAddTrans(e) {
        e.preventDefault();
        const url = `http://localhost:5000/api/accounts/${transaction.accountId}/trans`;
        await fetch(url,
            {
                method: "Post",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(transaction)
            });

        history.push('/accts/list');
    }

    return (
        <div>
            <h3>Add Transaction</h3>
            <form onSubmit={handleAddTrans}>
                <label htmlFor="accountNo">Account No</label>
                <select
                    onChange={handleInputChange}
                    name="accountId" id="accountId" required>
                    <option></option>
                    {
                        accounts.map((account, index) =>
                            <option key={index} value={account._id}>
                                {account._id} &nbsp;
                                ({account.acctType}) - {account.balance}
                            </option>)
                    }
                </select>

                <label htmlFor="transType">Transaction Type</label>
                <select
                    onChange={handleInputChange}
                    name="transType" id="transType" required>
                    <option></option>
                    <option value="Credit">Deposit</option>
                    <option value="Debit">Withdraw</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input
                    onChange={handleInputChange}
                    type="number" id="amount" name="amount" required/>

                <button type="Submit">Submit</button>
            </form>
        </div>
    );
}

export default TransForm;