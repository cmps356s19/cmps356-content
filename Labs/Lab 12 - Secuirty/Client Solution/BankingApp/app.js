const express = require('express');
const routes = require('./routes');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const acctRespository = require('./repositories/account-repository');
const myCredential = require('./config/myCredentials');

const app = express();

// Enables Cross-Origin Resource Sharing (CORS) - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// Tell a browser to let a web application running at one origin (domain)
// have permission to access selected resources from a server at a different origin
app.use(cors());

const port = 5000;

app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(logger('dev'));
app.use(express.json());

app.use('/api', routes);

//Or use 'mongodb://127.0.0.1:27017/BankingAppDB'
mongoose.connect(myCredential.database)
    .then(() => {
        acctRespository.initDb();

        app.listen(port, () => {
            console.log(`Server started @ http://localhost:${port}`);
        });
    }).catch((err) => {
    console.log(`Failed to connect to monogoDb ${err}`);
});




