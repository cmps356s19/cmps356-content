const Account = require('../models/account')
const Transaction = require('../models/account-trans')

class AccountRepository {
    async getAccounts(acctType) {
        return await Account.find({acctType});
    }

    //Get account by accountNo
    async getAccount(id) {
        return await Account.findById({id});
    }

    async addAccount(account) {
        return await Account.create(account);
    }

    async deleteAccount(id) {
        Account.remove({_id: id});
    }

    async updateAccount(account) {
        return await Account.findOneAndUpdate({accountNo: account.accountNo}, account);
    }

    async addTransaction(trans) {
        //step 1 find the account
        const account = await this.getAccount(trans.accountId);

        //step 2 . deduct or increase
        if (trans.transactionType === "Debit")
            account.balance -= trans.amount;
        else
            account.balance += trans.amount;

        //step 3 to create the transaction
        trans = await Transaction.create(trans);
        await account.save();

        return trans;
    }

    //ToDo: implement this method
    getTransactions(acctId, fromDate, toDate) {

    }

    async sumBalance() {
        return await Account.aggregate([
            {
                $group: {
                    _id: "$acctType",
                    accountsCount: {$sum: 1},
                    totalBalance: {$sum: "$balance"}
                }
            },
            {
                $sort: {
                    totalBalance: 1
                }
            }

        ]);
    }

    //ToDo: Implement this method
    async chargeFees() {
    }

    async distributeBenefits(benefitRate) {
        const accounts = await this.getAccounts();
        // Go through all the Saving accounts and distribute the benefit
        for (const acct of accounts) {
            if (acct.acctType === 'Saving') {
                acct.balance *= (1 + benefitRate / 100);
                acct.save();
            }
        }
    }

    //ToDo: Implement based on the lecture example
    async emptyDB() { //in case needed during testing
    }

    //ToDo: Implement based on the lecture example
    async initDb() {

    }
}

module.exports = new AccountRepository();