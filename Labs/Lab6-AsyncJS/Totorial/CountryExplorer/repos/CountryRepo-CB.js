
class CountryRepoCB {
    constructor() {
        this.fs = require('fs');
        this.countryFilePath = '../data/country.json';
        this.literacyFilePath = '../data/country-literacy-rate.json';
    }

    readFileContentSync() {
        let data = this.fs.readFileSync();
        let countries = JSON.parse(data);
        return countries;
    }

    readFileAsync() {
        this.fs.readFile(this.countryFilePath, (err, data) => {
            if (err) console.log("OMG something went terribly wrong");
            else {
                let countries = JSON.parse(data);
                console.log(countries[0].name, "- ", countries[1].name);
            }
        })
    }

    getCapitalCity(countryName) {
        this.fs.readFile(this.countryFilePath, (err, data) => {
            if (err) console.log("OMG something went terribly wrong");
            else {
                let countries = JSON.parse(data);
                let country = countries.find(c => c.name == countryName)
                console.log(`The capital city of ${countryName} is ${country.capital}`);
            }
        })
    }

    getCountryLiteracy(countryName){
        this.fs.readFile(this.countryFilePath, (err, data) => {
            if (err) console.log("OMG something went terribly wrong");
            else {
                let countries = JSON.parse(data);
                let country = countries.find(c => c.name == countryName)

                this.fs.readFile(this.literacyFilePath,(err, data)=>{
                    let countryLiteracy = JSON.parse(data);

                    let theLiteracyOfTheCountry = countryLiteracy.filter(lit=> lit.country==countryName)
                    country.literacy = theLiteracyOfTheCountry
                    // country.averageLiteracy = (theLiteracyOfTheCountry[1].rate+theLiteracyOfTheCountry[2].rate)/2;
                    console.log(country);
                })
            }
        })
    }
}
let countryRepo = new CountryRepoCB();
// // let countries = countryRepo.readFileContentSync();
// // console.log(countries[0].name , "- " , countries[1].name);
//
//
// // countryRepo.readFileAsync();
// countryRepo.getCapitalCity("Qatar");
countryRepo.getCountryLiteracy("Qatar");
// console.log('This message will only be displayed after you read the file');