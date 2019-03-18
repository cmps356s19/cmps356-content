const BooksRepository = require('./BookRepo.js'),
    expect = require('chai').expect;

let book = {
    "_id": 4,
    "title": "Specification by Example",
    "isbn": "1617290084",
    "pageCount": 0,
    "publishedDate": {
        "$date": "2011-06-03T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
    "status": "PUBLISH",
    "authors": [
        "Gojko Adzic"
    ],
    "categories": [
        "Software Engineering"
    ]
};
let bookAuthor = {
    "_id": 3,
    "title": "Specification by Example",
    "isbn": "1617290084",
    "pageCount": 0,
    "publishedDate": {
        "$date": "2011-06-03T00:00:00.000-0700"
    },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
    "status": "PUBLISH",
    "authors": [
        "Gojko Adzic"
    ],
    "categories": [
        "Software Engineering"
    ]
}

describe("Books Repository Class Test", () => {
    it("book with name \"Specification by Example\" should return the all the details about this book", async () => {
        const result = await BooksRepository.getBook("Specification by Example")
        expect(result).to.be.ok;
        expect(result).to.have.property("title").and.equal('Specification by Example')

    });
    it("The number of books with page count more than 700 should be 22", async () => {
        const result = await BooksRepository.getBooksByPageCount(700)
        expect(result).to.be.ok;
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(22);

    });

    it("The Books for the author \"Gojko Adzic\" should return all his books", async () => {
        const result = await BooksRepository.getBooksByAuthor("Gojko Adzic");
        expect(result[0].authors[0]).to.equal(bookAuthor.authors[0]);

    });

    it("The number of books of the author \"Richard Siddaway\" is 6", async () => {
        const result = await BooksRepository.getBooksSummary();
        expect(result.get("Richard Siddaway")).to.be.equal(6);

    });

    it("The number of books with category \"Programming\" should be 12", async () => {
        const result = await BooksRepository.getBooksByCategory("Programming")
        expect(result).to.have.lengthOf(12);
    });
});