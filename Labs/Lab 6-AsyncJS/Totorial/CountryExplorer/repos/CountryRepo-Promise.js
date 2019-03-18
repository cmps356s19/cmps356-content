class CountryRepoPromise {
    constructor() {
        this.fse = require('fs-extra');
        this.countryFilePath = '../data/country.json';
        this.literacyFilePath = '../data/country-literacy-rate.json';
    }

    readFileAsync(filePath) {
        return this.fse.readFile(filePath)
            .then(data => JSON.parse(data))
            .catch(err => console.log(err))
    }

    getCapitalCity(countryName) {
        this.readFileAsync(this.countryFilePath)
            .then(countries => countries.find(c => c.name == countryName))
            .then(country => console.log(`The capital city of ${countryName} is ${country.capital}`))
            .catch(err => console.log(err))
    }

    getCountryLiteracy(countryName) {
        this.readFileAsync(this.countryFilePath)
            .then(countries => countries.find(c => c.name == countryName))
            .then(country => {
                return this.readFileAsync(this.literacyFilePath)
                    .then(countryLiteracy => countryLiteracy.filter(cLit.country == countryName))
                    .then(theLiteracyOfTheCountry => {
                        country.literacy = theLiteracyOfTheCountry
                        return country;
                    })
            })
            .then(countryWithLiteracy => console.log(countryWithLiteracy))
            .catch(err => console.log(err))

    }
}

let countryRepo = new CountryRepoPromise();
// // let countries = countryRepo.readFileContentSync();
// // console.log(countries[0].name , "- " , countries[1].name);
//
//
// countryRepo.readFileAsync();
// countryRepo.getCapitalCity("Qatar");
countryRepo.getCountryLiteracy("Qatar");
// console.log('This message will only be displayed after you read the file');