const express = require('express');
const routes = require('./app-routes');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Enables Cross-Origin Resource Sharing (CORS) - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// Tell a browser to let a web application running at one origin (domain)
// have permission to access selected resources from a server at a different origin
app.use(cors());

const port = 8090;

app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(logger('dev'));
app.use(express.json());

app.use('/api', routes);

//Or use 'mongodb://127.0.0.1:27017/OlivAppDB'
const dbConnection = mongoose.connect('mongodb://localhost/OlivAppDB', {useNewUrlParser: true})
    .then(() => {
        //ToDo: Call these methods to initialize the database
        //userRepo.initDb();
        //productRepo.initDb();
        //jobRepo.initDb();

        app.listen(port, () => {
            console.log(`Server started @ http://localhost:${port}`);
        });
    }).catch((err) => {
        console.log(`Failed to connect to monogoDb ${err}`);
    });