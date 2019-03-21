const express = require('express');
const routes = require('./routes');
const logger = require('morgan');
const path = require('path');

const app = express();

const port = 5000;

// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());

app.use('/api', routes);
app.listen(port, ()=>{
    console.log(`Server started @ http://localhost:${port}`);
});








