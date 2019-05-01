//This class will help you initialize your database and format some of the files

const Book = require('../models/Book'),
    Author = require('../models/Author'),
    Borrower = require('../models/Borrower'),
    path = require('path');

const fs = require('fs-extra'),
    chance = require('chance').Chance();

class Utils {

    getFormattedFilePath(filename) {
        return path.join(__dirname, `../data/${filename}`)
    }

    async initializeAuthorsDBCollectionFromJSONFile() {
        await this.extractAuthorsFromTheBooksCatalogJSONFile();
        const authors = await fs.readJSON(this.getFormattedFilePath('authorsWithAddress.json'))
        for (const author of authors)
            await Author.create(author);
    }

    async initializeBorrowersDBCollectionFromJSONFile() {
        await this.generateRandomBorrowersJSONFile();
        const borrowers = await fs.readJSON(this.getFormattedFilePath('borrowersWithAddress.json'))
        for (const borrower of borrowers)
            await Borrower.create(borrower);
    }

    async mapAuthorNamesToAuthorId(authorNames) {
        const mappedAuthors = [];
        for (const authorName of authorNames) {
            const author = await Author.findOne({name: authorName});
            if (author) mappedAuthors.push(author._id);
        }
        return mappedAuthors;
    }

    async initializeBooksDBCollectionFromJSONFile() {
        try {
            const books = await fs.readJSON(this.getFormattedFilePath('catalog-books.json'));
            const mappedBooks = [];

            for (const book of books) {
                book.authors = await this.mapAuthorNamesToAuthorId(book.authors);
                book.publishedDate = chance.date();
                mappedBooks.push(book);
            }

            for (let book of mappedBooks) {
                if (book.isbn == 'undefined' || book.isbn.length < 5)
                    continue;

                delete book._id;
                await Book.create(book)
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    //if you call this method will extract the authors from the json file and
    // add address information for them
    async extractAuthorsFromTheBooksCatalogJSONFile() {
        //Author Generating
        const authors = await fs.readJSON(this.getFormattedFilePath('authors.json'))
        const authorsWithAddress = authors.map(author => {
            const newAuthor = {
                name: author,
                address: chance.address(),
                phoneNumber: chance.phone(),
                street: chance.street(),
                email: author.split('')[0] + '_' + chance.email()
            };

            return newAuthor;
        })
        await fs.writeJSON(this.getFormattedFilePath('authorsWithAddress.json'), authorsWithAddress);
    }

    async generateRandomBorrowersJSONFile() {
        const borrowers = [];
        for (let i = 0; i < 1000; i++) {
            borrowers.push({
                name: chance.first() + ' ' + chance.last(),
                address: chance.address(),
                phoneNumber: chance.phone(),
                street: chance.street(),
                email: chance.email()
            })
        }
        await fs.writeJSON(this.getFormattedFilePath('borrowersWithAddress.json'), borrowers)
    }

           async cleanBooksCatalog() {
            //Author Generating
            const books = await fs.readJSON(this.getFormattedFilePath('back-up.json'))
            const cleanBooks = books.filter(book => book.authors.length > 0 ||
                book.categories.length > 0 ||
                typeof book.isbn != "undefined" ||
                typeof book.shortDescription != "undefined" ||
                typeof book.longDescription != "undefined" ||
                book.shortDescription.length > 10 ||
                book.longDescription.length > 10

            )


            await fs.writeJSON(this.getFormattedFilePath('cleanBooks.json'), cleanBooks);
    }

}

module.exports = new Utils();

//jobs 1,u1 job2 //u1

//fuction that can return an array of the jobs of this user

//read the file of users into an array of users


for(user of users){
    const userObj= USERMODEL.create(user[0])

    _id

    const jobs = getUserJobs(user.id) //array of jobs for this user
    for(job of jobs){
        job.customerId = userObj._id
        add(job);
    }
//open the jobs
    custommmerId === user[o]._id

//customeId= userObj._id;


=> id /
}
/Add the user to the database