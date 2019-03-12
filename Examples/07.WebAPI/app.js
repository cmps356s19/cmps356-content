const express	   =  require('express');
const routes = require('./routes');

const app		   =   express();

/*  express.json() is a middleware function that extracts the body portion of an incoming request and assigns
    it to req.body. without this line req.body will be undefined
 */
app.use( express.json() );

//Mount the routes to the app
app.use('/api/', routes);

const port = 9080;
app.listen(port, () => {
    const host = "localhost";
    console.log(`App is running @ http://${host}:${port}/api/heroes`);
});