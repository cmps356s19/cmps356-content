const unitConverter = require('./UnitConverter')
const expect = require('chai').expect;

describe("Unit Converter Test Cases", () => {
    //test case 1
    describe("Weight Methods test cases ", () => {
        it('1 kgToOunce should return 35.274 ', () => {
            expect(unitConverter.kgToOunce(1)).to.equal(35.274)
        });

        it('2 kgToPound should return 4.4092', () => {
            expect(unitConverter.kgToPound(2)).to.equal(4.4092)
        });
    });
});