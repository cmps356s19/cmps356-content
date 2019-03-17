//After the document is loaded in the browser
document.addEventListener("DOMContentLoaded", async () => {
    await handleInitPage();
});

/*****************************
    Functions to call Web API
 *****************************/
//region Web API Calls
async function getHeroes() {
    const url = '/api/heroes';
    const response = await fetch(url);
    return await response.json()
}

async function getHero(heroId) {
    const url = `/api/heroes/${heroId}`;
    const response = await fetch(url);
    return await response.json()
}

async function addHero(hero) {
    const url = '/api/heroes/';
    console.log(url);
    try {
        await fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hero)
        });
    } catch (err) {
        console.error(err);
    }
}

async function updateHero(hero) {
    const url = `/api/heroes/${hero.id}`;
    console.log(url);
    try {
        await fetch(url, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hero)
        });
    } catch (err) {
        console.error(err);
    }
}

async function deleteHero(heroId) {
    const url = `/api/heroes/${heroId}`;
    console.log(url);
    try {
        await fetch(url, {method: "delete"});
    } catch (err) {
        console.log(err);
    }
}

async function getHeroEditor() {
    const url = `hero-editor.html`;
    const response = await fetch(url);
    return await response.text();
}
//endregion

/*****************************
 Functions to handle UI Events
 *****************************/
//region UI Event Handlers
async function handleInitPage() {
    const heroes = await getHeroes();
    const heroesDiv = document.querySelector("#heroes");
    heroesDiv.innerHTML = heroes2Html(heroes);
}

async function handleUpdateHero(event, heroId) {
    event.preventDefault();
    //console.log("heroId:", heroId, event);

    const heroesDiv = document.querySelector("#heroes");
    const heroEdtior = await getHeroEditor();
    heroesDiv.innerHTML = heroEdtior;

    const hero = await getHero(heroId);
    document.querySelector("#id").value = hero.id;
    document.querySelector("#name").value = hero.name;
    document.querySelector("#heroType").value = hero.heroType;
    document.querySelector("#quote").value = hero.quote;
}

async function handleAddHero(event) {
    event.preventDefault();

    const heroesDiv = document.querySelector("#heroes");
    const heroEdtior = await getHeroEditor();
    heroesDiv.innerHTML = heroEdtior;
}

async function handleSubmitHero() {
    const hero = formToJsonObject("heroForm");
    //If hero.id has value then do update otherwise do add
    if (hero.id) {
        await updateHero(hero);
    } else {
        await addHero(hero);
    }
    //return to the home page
    window.location.href = "index.html";
}

async function handleDeleteHero(event, heroId) {
    const clikedElement = event.target;
    await deleteHero(heroId);

    //Delete the parent tr of the button that was clicked
    deleteParentTr(clikedElement);
    //console.log("heroId:", heroId, clikedElement);
}
//endregion


/*****************************
 Helper Functions
 *****************************/
//region Helper Functions
function formToJsonObject(formName) {
    const form = document.forms[formName];
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData) {
        data[key] = value;
    }
    //data = JSON.stringify(data);
    console.log(data);
    return data;
}

function deleteParentTr(el) {
    // Look the parent tr of the clicked delete button
    do {
        el = el.parentNode;
    } while (el.tagName.toLowerCase() != 'tr');
    //Remove the tr
    el.parentNode.removeChild(el);
}

function heroes2Html(heroes) {
    const html = `
        <h2>Heroes</h2>
        <table id="heroesTable" class="table table-bordered table-striped table-hover">
            ${ heroes.map( hero =>
            `<tr>
                <td>
                    <a href="#" onclick="handleUpdateHero(event, ${hero.id})">
                        ${hero.name}
                    </a>
                </td>
                <td> ${hero.heroType} </td>
                <td align="right">
                    ${hero.quote}
                </td>
                <td>
                  <span class="delete" title="Delete hero" onclick="handleDeleteHero(event, ${hero.id})">
                    <i style="color: indianred;" class="fa fa-times" aria-hidden="true"></i>
                  </span>
                </td>
            </tr>`).join('') }
        </table>`;

    return html;
}

//endregion