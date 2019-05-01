const hifzService = require('./services/HifzService');
const router = require('express').Router();

router.get('/surahs', hifzService.getSurahs);

router.route('/hifz')
    .get(hifzService.getHifz)
    .post(hifzService.addHifz);

module.exports = router;