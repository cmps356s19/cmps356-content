//Test all the methods in the AccountRepository
const expect = require('chai').expect;
const accountRepo = require('./account-repository');

describe('Accounts Repository Test Suite', () => {
    it('getAccounts() should return an Array of Size 4 ', async () => {

        let accounts = await accountRepo.getAccounts();
        expect(accounts)
            .to.be.a('array').and
            .have.a.have.property('length', 4);
    });

    it('getAccount(456) should return an object with accountNumber 456', async () => {

        let account = await accountRepo.getAccount(456);
        expect(account)
            .to.be.a('object').and
            .have.a.have.property('accountNo', 456);
    });

    it('saveAccounts(accounts) should return success', async () => {
        let accounts = await accountRepo.getAccounts();
        const expectedCount = accounts.length;
        await accountRepo.saveAccounts(accounts);

        //Read again and make sure the accounts are there
        accounts = await accountRepo.getAccounts();
        expect(accounts)
            .to.be.a('array').and
            .have.a.have.property('length', expectedCount);
    });

    //ToDo - Test remaining methods
})