const express = require('express'),
    routes = require('./routes'),
    logger = require('morgan'),
    path = require('path'),
    cors = require('cors'),
    mongoose = require('mongoose');
const Utils = require('./repositories/Utils')


// mongoose.connection.db.dropDatabase();

mongoose.connect('mongodb://127.0.0.1:27017/BooksDB', { useCreateIndex: true,
    useNewUrlParser: true})
    .then(db => {
        //Initialize the database if it is not initialized from the JSON files
        mongoose.connection.db.collection('books').countDocuments()
            .then(count => {
                if(count==0){
                    Utils.initializeAuthorsDBCollectionFromJSONFile()
                        .then(()=> Utils.initializeBorrowersDBCollectionFromJSONFile())
                        .then(()=> Utils.initializeBooksDBCollectionFromJSONFile())
                }
                else{
                    console.log('DB is already ...<Initialized>');
                }
            })
    })
    .catch(e => console.log(e));

const app = express();
const port = 8000;

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(logger('dev'));
app.use(express.json());

app.use('/api', routes);
app.listen(port, () => {
    console.log(`Server started @ http://localhost:${port}`);
});
