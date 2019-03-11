const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const heroRespository = require('./repositories/HeroRepository');

const app = express();
app.use( bodyParser.json() );

//Allow serving static files from public folder
app.use( express.static('public') );

app.get('/', (req, res) => {
    let responseText = 'السلام عليكم ورحمة الله وبركاته';
    responseText += '<br><a href="heroes">Heroes</a>';
    responseText += '<br><a href="quote">Quote</a>';
    responseText += '<br><a href="cats.jpg">Cats</a>';
    res.send(responseText);
});

app.get('/quote', (req, res) => {
    res.sendFile( path.join( __dirname, 'public', 'quote.txt') );
});

app.get('/heroes', async (req, res) => {
    let heroes = await heroRespository.getHeroes();
    res.json(heroes);
});

app.post('/heroes', async (req, res) => {
    let hero = req.body;
    await heroRespository.addHero(hero);
    res.sendStatus(201);
});


app.get('/heroes/:id', async (req, res) => {
    let heroId = req.params.id;
    console.log(heroId);
    let hero = await heroRespository.getHero(heroId);
    console.log(hero);
    res.json(hero);
});

app.get('/*', (req, res) => {
    res.status(404);
    res.send('Not found');
});

const port = 4000;
app.listen(port, () => {
    const host = "localhost";
    console.log(`App is running and available @ http://${host}:${port}`);
});