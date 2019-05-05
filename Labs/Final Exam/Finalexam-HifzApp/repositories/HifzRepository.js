const fs = require('fs-extra');
const path = require('path');
const surahFilePath = path.join(__dirname, '../data/surah.json');
const hifzFilePath = path.join(__dirname, '../data/hifz.json');

class HifzRepository {
    //ToDo: Implement using MongoDB. You must filter data using a database query.
    async getSurahs(surahType) {
        const surahs = await fs.readJSON(surahFilePath);

        if(surahType){
            return surahs.filter(s => s.type === surahType);
        } else{
            return surahs;
        }
    }

    async getHifz(){
        return await fs.readJSON(hifzFilePath);
    }

    async addHifz(hifz) {
        const hifzs = await this.getHifz();
        hifzs.push(hifz);
        await fs.writeJSON(hifzFilePath, hifzs);
         return hifz;
    }

    async initSurahDb() {

    }

    async initHifzDB() {

    }
}

module.exports = new HifzRepository();