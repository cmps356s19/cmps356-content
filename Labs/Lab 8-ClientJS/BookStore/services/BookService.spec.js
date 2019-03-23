const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
chai.use(chaiHttp);
const expect = chai.expect;
describe('Test the Books web API ',  ()=> {
    it('/books?name=Unlocking Android GET', ()=> {
        chai.request(app)
            .get('api/books')
            .query({name: 'Unlocking Android'})
            .end(function (err, res) {
                expect(res).to.have.status(200);
            })
    });
    it('/books?author=Michael D. Galpin GET ', ()=> {
        chai.request(app)
            .get('api/books')
            .query({author: 'Michael D. Galpin'})
            .end(function (err, res) {
                expect(res).to.have.status(200);
            })
    });
    it('/books?pageCount=111 GET ', ()=> {
        chai.request(app)
            .get('api/books')
            .query({pageCount: '111'})
            .end(function (err, res) {
                expect(res).to.have.status(200);
            })
    });
    it('/books?category=Java GET ', ()=> {
        chai.request(app)
            .get('api/books')
            .query({category: 'Java'})
            .end(function (err, res) {
                expect(res).to.have.status(200);
            })
    });
    it('/books/summary GET', ()=> {
        chai.request(app)
            .get('api/books/summary')
            .end(function (err, res) {
                expect(res.body).to.have.property("authorsCounts");
                expect(res).to.have.status(200);

            })
    });
    it("/api/books/ POST", () => {
        chai.request(app)
            .post('/api/books/')
            .send({
                "_id": 12323442,
                "title": "Miracles of eng",
                "isbn": "132244545",
                "pageCount": 416,
                "publishedDate": {
                    "$date": "2009-04-01T00:00:00.000-0700"
                },
                "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
                "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
                "longDescription": "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
                "status": "PUBLISH",
                "authors": [
                    "W. Frank Ableson",
                    "Charlie Collins",
                    "Robi Sen"
                ],
                "categories": [
                    "Open Source",
                    "Mobile"
                ]
            })
            .then(function (res) {
                expect(res).to.have.status(200);
            })
    });
    it("/api/books/:isbn PUT", () => {
        chai.request(app)
            .put('/api/books/:isbn')
            .send({
                "_id": 12323442,
                "title": "Miracles of engineering",
                "isbn": "132244545",
                "pageCount": 416,
                "publishedDate": {
                    "$date": "2009-04-01T00:00:00.000-0700"
                },
                "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
                "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
                "longDescription": "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
                "status": "PUBLISH",
                "authors": [
                    "W. Frank Ableson",
                    "Charlie Collins",
                    "Robi Sen"
                ],
                "categories": [
                    "Open Source",
                    "Mobile"
                ]
            })
            .then(function (req, res) {
                expect(res).to.have.status(200);
            })
    });
    it("/api/books/:isbn DELETE", () => {
        chai.request(app)
            .delete(`/api/books/${132244545}`)
            .then(function (req, res) {
                expect(res).to.have.status(200);
            })
    });
});