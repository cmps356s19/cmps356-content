const express = require('express');
const bodyParser = require('body-parser');
const heroRepo = require('./repositories/HeroRepository.js')
const app = express();

app.use(bodyParser.json());

app.get('/salam', (req, res) => {
    res.send('السلام عليكم ورحمة الله وبركاته');
});


app.get('/time', (req, res) => {
    const datetime = new Date();
    res.send(datetime);
});

app.get('/heroes', async (req, res) => {
    const heroes = await heroRepo.getHeroes();
    res.json(heroes);
});

app.get('/heroes/:heroId', async (req, res) => {
    const heroId = req.params.heroId;
    const hero = await heroRepo.getHero(heroId);
    res.json(hero);
});

app.post('/heroes', async (req, res) => {
    try {
        let hero = req.body
        hero = await heroRepo.addHero(hero);
        const urlOfNewHero = `/api/heroes/${hero.id}`;
        res.location(urlOfNewHero);
        res.status(201).send("created");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

const port = 3500;
app.listen(port, () => {
    const host = "localhost";
    console.log(`App is running and available @ http://${host}:${port}`);
});