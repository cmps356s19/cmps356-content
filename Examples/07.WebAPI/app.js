const express	   =  require('express');
const bodyParser   =  require('body-parser');

const app		   =   express();

/*  body-parser extracts the body portion of an incoming request and assigns
    it to req.body.
 */
app.use( bodyParser.json() );

//Mount the routes to the app
const routes = require('./routes');
app.use('/api/', routes);

const port = 9080;
app.listen(port, () => {
    const host = "localhost";
    console.log(`App is running @ http://${host}:${port}/api/heroes`);
});