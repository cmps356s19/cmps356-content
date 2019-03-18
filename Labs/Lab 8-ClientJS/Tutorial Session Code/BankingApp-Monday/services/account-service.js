const accountRepo = require('../repositories/account-repository')

class AccountService {
    constructor() {

    }

    async getAccounts(req, res) {
        try {
            const acctType = req.query.acctType;
            const accounts = await accountRepo.getAccounts(acctType);
            res.json(accounts);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addAccount(req, res) {
        try {
            await accountRepo.addAccount(req.body)
            res.status(201).json(req.body)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async getAccount(req, res) {
        try {
            const accountNo = req.params.id;
            res.status(200).json(await accountRepo.getAccount(accountNo))
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async updateAccount(req, res) {
        try {
            const account = req.body
            await accountRepo.updateAccount(account)
            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    async deleteAccount(req, res) {
        try {
            await accountRepo.deleteAccount(req.params.id)
            res.status(200).json("Account deleted")
        } catch (err) {
            res.status(500).send(err)
        }
    }
    async addTransaction(req, res) {
        try {
            console.log('Ehat');
            const transaction = req.body;
            await accountRepo.addTransaction(transaction);
            res.status(200).send(`Transaction processed successfully`);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new AccountService();