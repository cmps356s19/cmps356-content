const express = require('express')
const accountService = require('./services/account-service')


const router = express.Router();

router.post('/accounts/addMultipleAccounts',accountService.addMultipleAccounts)

router.get('/accounts',accountService.getAccounts )
      .post('/accounts', accountService.addAccount);

router.route('/accounts/sumBalance')
    .get(accountService.sumBalance);

router.route('/accounts/:id')
    .get(accountService.getAccount)
    .put(accountService.updateAccount)
    .delete(accountService.deleteAccount);

router.route('/accounts/:id/trans')
    .post(accountService.addTransaction);




module.exports = router;