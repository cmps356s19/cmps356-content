const accountRepo = require('../repositories/account-repository')

class AccountService {

    async addMultipleAccounts(req, res){
        try{
            const accounts = req.body;
            await accounts.forEach(async(account)=> await accountRepo.addAccount(account))
            res.send('All accounts added')
        }catch(e){
            res. send(e)
        }
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
            const account = await accountRepo.addAccount(req.body);
            res.status(201).json(account);
        } catch (err) {
            console.log(err);
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
            const account = req.body;
            await accountRepo.updateAccount(account);
            res.status(200).send("Acct Updated");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteAccount(req, res) {
        try {
            const deletedAccount = await accountRepo.deleteAccount(req.params.id);
            if(deletedAccount)
                res.status(200).json(deletedAccount)
            else
                res.status(200).json('Account Does Not Exist')

        } catch (err) {
            res.status(500).send(err)
        }
    }
    async addTransaction(req, res) {
        try {
            const transaction = req.body;
            console.log(req.body);

            res.status(200).send(await accountRepo.addTransaction(transaction));
        }
        catch (err) {
            res.status(500).send(err);
        }
    }

    async sumBalance(req, res) {
        try {
            res.json(await accountRepo.sumBalance())
        } catch (e) {
           console.log(e);
        }
    }
}

module.exports = new AccountService();