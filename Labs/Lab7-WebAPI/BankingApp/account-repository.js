class AccountRepository {

    //ToDo - Get accounts by acctType from accounts.json file
    /* acctType could be 'Saving', 'Current' or 'All'. If acctType = 'All' then return all accounts
      Important Tip
        - After you do JSON.parse(accountsText) to create the accounts objects
        You need to loop through the list of accounts to set the prototype to
        either SavingAccount or CurrentAccount using:
        Object.setPrototypeOf(acct, CurrentAccount.prototype); or
        Object.setPrototypeOf(acct, SavingAccount.prototype);

        This will add the methods back to the deserialized account.
    */
    async getAccounts(acctType) {
    }

    //ToDo - Get account by accountNo
    async getAccount(accountNo) {
        try {
            const accounts = await this.getAccounts();
            return accounts.find(account => account.accountNo == accountNo);
        } catch (err) {
            throw err;
        }
    }

    async addAccount(account) {
        account.accountNo = parseInt(account.accountNo);
        account.balance = parseInt(account.balance);
        try {
            const accounts = await this.getAccounts();
            if (account.acctType === 'Saving') {
                account.minimumBalance = parseInt(account.minimumBalance);
                account.minimumBalance = 1000;
            }
            else
                account.monthlyFee = 15;

            accounts.push(account);
            return await this.saveAccounts(accounts);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAccount(accountNo) {
        try {
            const accounts = await this.getAccounts();
            const index = accounts.findIndex(acct => acct.accountNo == accountNo);
            if (index >= 0) {
                accounts.splice(index, 1);
                return await this.saveAccounts(accounts);
            }
        } catch (err) {
            throw err;
        }
    }

    async sumBalance() {
        try {
            const accounts = await this.getAccounts();
            return accounts.reduce((sum, account) => sum + account.balance, 0);
        } catch (e) {
            throw err;
        }
    }

    async chargeFees() {
        try {
            const accounts = await this.getAccounts();
            for (const acct of accounts) {
                //console.log('acct instanceof CurrentAccount', acct instanceof CurrentAccount);
                if (acct instanceof CurrentAccount) {
                    acct.deductFee()
                }
            }
            await this.saveAccounts(accounts);
        } catch (err) {
            throw err;
        }
    }

    async distributeBenefits(benefitRate) {
        try {
            const accounts = await this.getAccounts();
            // Go through all the Saving accounts and distribute the benefit using a 5% benefit.
            // Should not use filter and map for this as this will NOT update the original array
            for (const acct of accounts) {
                //console.log('acct instanceof SavingAccount', acct instanceof SavingAccount);
                if (acct instanceof SavingAccount) {
                    acct.addBenefit(benefitRate);
                }
            }
            await this.saveAccounts(accounts);
        } catch (err) {
            throw err;
        }
    }

    //ToDo - Save accounts to accounts.json file
    async saveAccounts(accounts) {
    }

    async addTransaction(transaction) {
        transaction.accountNo = parseInt(transaction.accountNo);
        transaction.amount = parseInt(transaction.amount);
        try {
            const accounts = await this.getAccounts();
            const account = accounts.find(account => account.accountNo == transaction.accountNo);
            if (transaction.type == 'Deposit') {
                account.deposit(transaction.amount);
            }
            else {
                account.withdraw(transaction.amount);
            }
            console.log("addTransaction", account);
            await this.saveAccounts(accounts);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new AccountRepository();