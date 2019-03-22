const express = require('express');
const mongoose = require('mongoose');
const bookRespository = require('./models/BookRepository');

const app = express();

app.use( express.json());

//Mount the routes to the app
const routes = require('./routes');
app.use('/api/', routes);

const port = 9090; //process.env.PORT || 3000
const dbConnection = mongoose.connect('mongodb://localhost/books', function(err) {
    if (err) {
        console.log("Failed to connect to monogoDb " + err);
        return;
    }
    else {
        bookRespository.initDb();

        app.listen(port, () => {
            console.log(`Book Service running on http://localhost:${port}/api/books`);
        });
    }
});