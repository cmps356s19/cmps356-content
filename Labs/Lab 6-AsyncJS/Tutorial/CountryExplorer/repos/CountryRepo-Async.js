const fs = require('fs-extra');
class CountryRepoAsync {
    constructor() {
        this.countryFilePath = './data/country.json';
        this.literacyFilePath = '../data/country-literacy-rate.json';
    }

    async getCountries(filePath) {
        let data = await fs.readFile(filePath);
        let parsedData = await JSON.parse(data);

        return parsedData;
    }

    async getCapitalCity(countryName) {

        let countries = await this.getCountries(this.countryFilePath);
        let country = countries.find(country=> country.name ==countryName);
        console.log(`The capital city of ${countryName} is ${country.capital}`);
        return country;
    }

    async getCountryLiteracy(countryName) {
        let countries =  await this.getCountries(this.countryFilePath);
        let country = countries.find(country=> country.name ==countryName);

        let countriesLitracy = await this.getCountries(this.literacyFilePath);
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
countryRepo.getCountries(countryRepo.countryFilePath).then(result=> {
    const countries = result.map(c => {
        const {alpha2Code : code, name, capital, region : continent, population} = c;
        return {code, name, capital, continent, population, flag: `https://cmps356s19.github.io/flags/${code.toLowerCase()}.png`};
    });
    console.log(countries);
    fs.writeFile('./data/countries.json', JSON.stringify(countries));
    
 });


// countryRepo.getCapitalCity("Qatar");
//countryRepo.getCountryLiteracy("Qatar");


console.log('This message will only be displayed after you read the file');