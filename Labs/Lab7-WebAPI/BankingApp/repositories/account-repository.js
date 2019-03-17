const fs = require('fs-extra');
const path = require('path');
const SavingAccount = require('../models/saving-account');
const CurrentAccount = require('../models/current-account');

class AccountRepository {

    constructor() {
        this.accountsFilePath = path.join(__dirname, '../data/accounts.json');
    }

    //Get account from accounts.json file
    async getAccounts(acctType) {
        let accounts = await fs.readJSON(this.accountsFilePath);

        if (acctType && acctType != 'All') {
            accounts = accounts.filter(acct => acct.acctType === acctType);
        }

        //This will add Account methods back to the deserialized account.
        for (const acct of accounts) {
            if (acct.acctType === "Saving")
                Object.setPrototypeOf(acct, CurrentAccount.prototype);
            else
                Object.setPrototypeOf(acct, SavingAccount.prototype);
        }
        return accounts;
    }

    //Get account by accountNo
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

    async updateAccount(account) {
        try {
            const accounts = await this.getAccounts();
            const index = accounts.findIndex(acct => acct.accountNo == account.accountNo);
            if (index >= 0) {
                accounts[index] = account;
                return await this.saveAccounts(accounts);
            }

            return -1;
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

    //Save accounts to accounts.json file
    async saveAccounts(accounts) {
        return await fs.writeJSON(this.accountsFilePath, accounts);
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