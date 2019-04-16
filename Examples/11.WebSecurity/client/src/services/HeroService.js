/*****************************
 Functions to call Web API
 *****************************/
export default class HeroService {
//region Web API Calls
    static WebApiBaseUrl = `http://${window.location.hostname}:3040/api/heroes`;
    static async getHeroes() {
        const url = this.WebApiBaseUrl;
        const response = await fetch(url);
        return await response.json()
    }

    static async getHero(heroId) {
        const url = `${this.WebApiBaseUrl}/${heroId}`;
        const response = await fetch(url);
        return await response.json();
    }

    static async addHero(hero) {
        const url = this.WebApiBaseUrl;
        //console.log("HeroService.addHero", url, hero);
        try {
            const response = await fetch(url, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hero)
            });
            return await response.json();
        } catch (err) {
            console.error(err);
        }
    }

    static async updateHero(hero) {
        const url = `${this.WebApiBaseUrl}/${hero.id}`;
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

    static async deleteHero(heroId) {
        const url = `${this.WebApiBaseUrl}/${heroId}`;
        console.log(url);
        try {
            await fetch(url, {method: "delete"});
        } catch (err) {
            console.log(err);
        }
    }
//endregion
}