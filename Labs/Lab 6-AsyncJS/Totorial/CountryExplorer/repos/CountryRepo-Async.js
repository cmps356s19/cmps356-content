class CountryRepoAsync {
    constructor() {
        this.fse = require('fs-extra');
        this.countryFilePath = '../data/country.json';
        this.literacyFilePath = '../data/country-literacy-rate.json';
    }

    async readFileAsync(filePath) {
        let data = await this.fse.readFile(filePath);
        let parsedData = await JSON.parse(data);

        return parsedData;
    }

    async getCapitalCity(countryName) {

        let countries = await this.readFileAsync(this.countryFilePath);
        let country = countries.find(country=> country.name ==countryName);
        console.log(`The capital city of ${countryName} is ${country.capital}`);
        return country;
    }

    async getCountryLiteracy(countryName) {
        let countries =  await this.readFileAsync(this.countryFilePath);
        let country = countries.find(country=> country.name ==countryName);

        let countriesLitracy = await this.readFileAsync(this.literacyFilePath);
        let singleCountryLiteracy = countriesLitracy.filter(lit=> lit.country==countryName);

        country.literacy = singleCountryLiteracy;

        return country;


    }
}

let countryRepo = new CountryRepoAsync();
// // let countries = countryRepo.readFileContentSync();
// // console.log(countries[0].name , "- " , countries[1].name);
//
//
countryRepo.readFileAsync(countryRepo.countryFilePath).then(result=> console.log(result));


// countryRepo.getCapitalCity("Qatar");
//countryRepo.getCountryLiteracy("Qatar");


console.log('This message will only be displayed after you read the file');