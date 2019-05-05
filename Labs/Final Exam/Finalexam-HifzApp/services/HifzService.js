const hifzRepo = require('../repositories/HifzRepository');

class HifzService {
    async getSurahs(req, res) {
        try {
            const surahs = await hifzRepo.getSurahs(req.query.surahType);
            res.status(200).json(surahs);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getHifz(req, res) {
        try {
            const hifzs = await hifzRepo.getHifz();
            res.status(200).json(hifzs);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async addHifz(req, res) {
        try {
            const hifz = await hifzRepo.addHifz(req.body);
            res.status(201).json(hifz);
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = new HifzService();