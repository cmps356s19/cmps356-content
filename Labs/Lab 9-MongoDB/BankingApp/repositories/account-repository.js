const Account = require('../models/account');
const Transaction = require('../models/account-transaction');
const uuid = require('uuid');

class AccountRepository {

    constructor() {
    }

    //Get account from accounts.json file
    async getAccounts(acctType) {


    }

    //Get account by accountNo
    async getAccount(accountNo) {

    }

    async addAccount(account) {

    }

    async deleteAccount(accountNo) {

    }

    async updateAccount(account) {

    }


    async sumBalance() {

    }

    async chargeFees() {

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

    async addTransaction(transaction, accountNo) {


    }


}

module.exports = new AccountRepository();

console.log(uuid.v4());
