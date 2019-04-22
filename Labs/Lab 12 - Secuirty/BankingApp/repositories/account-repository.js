const Account = require('../models/account');
const Transaction = require('../models/account-trans');
const mongoose = require('mongoose');

class AccountRepository {
    async getAccounts(acctType) {
        if (!acctType || acctType == "All")
            return await Account.find();
        return await Account.find({acctType});
    }

    //Get account by accountNo
    async getAccount(id) {
        return await Account.findById(id);
    }

    async addAccount(account) {
        return await Account.create(account);
    }

    async deleteAccount(id) {
        try{
            console.log(id);
            const finding =  await Account.remove({_id: mongoose.Types.ObjectId(id)});
            console.log('finding');

            return finding;
        }
        catch (e) {

            console.log(e);
            return e;
        }
    }

    async updateAccount(account) {
        return await Account.findByIdAndUpdate(account._id, account);
    }

    async addTransaction(trans) {
      try{
          // console.log(trans);
          trans.amount = parseInt(trans.amount);
          //step 1 find the account
          const account = await this.getAccount(trans.accountId);

          //step 2 . deduct or increase
          if (trans.transType === "Debit")
              account.balance -= trans.amount;
          else
              account.balance += trans.amount;

          //step 3 to create the transaction
          trans = await Transaction.create(trans);
          //console.log(trans, account);
          await account.save();

          return trans;
      } catch (e) {
          console.log(e);
      }
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

    async emptyDB() { //in case needed during testing
        await Account.remove({});
    }

    async initDb() {
        try {
            //Uncomment to empty the database
            //await this.emptyDB();
            //If the db is empty then init the db with data in json files
            const acctsCount = await Account.countDocuments({});
            console.log(`Accounts Count: ${acctsCount}. Comment out emptyDB() to stop re-initializing the database`);
            if (acctsCount == 0) {
                await this.loadDataFromJsonFiles();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async loadDataFromJsonFiles() {
        const fs = require('fs-extra');
        const accounts = await fs.readJson('data/accounts.json');
        console.log('Retrieved accounts from json file and added to MongoDB accounts Collection: ' + accounts.length);

        for (const acct of accounts) {
            await this.addAccount(acct);
        }
    }
}

module.exports = new AccountRepository();