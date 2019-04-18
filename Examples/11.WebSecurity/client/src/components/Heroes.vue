<template>
    <div>
        <h2>Heroes</h2>
        <p v-if="error" class="text-danger">{{error}}</p>
        <p v-if="!isContributor" class="text-info">
            Need a Contributor role to add/update/delete heroes.
            Login using your Google Account to get these permissions.
        </p>

        <button @click="onAddHero" class="btn btn-link" v-if="isContributor">
            <i class="fa fa-plus" aria-hidden="true"></i> Hero
        </button>

        <table id="heroesTable" class="table table-bordered table-striped table-hover">
            <tr v-for="hero in heroes">
                <td>
                    <a href="#" @click="onEditHero(hero._id)" v-if="isContributor">
                        {{hero.name}}
                    </a>
                    <span v-else>
                        {{hero.name}}
                    </span>
                </td>
                <td> {{ hero.heroType }}</td>
                <td align="right">
                    <ul>
                        <li style="direction:rtl;" v-for="quote in hero.quotes">
                            {{ quote.text }}
                        </li>
                    </ul>
                </td>
                <td v-if="isContributor">
                  <span class="delete" title="Delete hero" @click="onDeleteHero(hero._id)">
                    <i style="color: indianred;" class="fa fa-minus-circle" aria-hidden="true"></i>
                  </span>
                </td>
            </tr>
        </table>
        <br>

        <!-- Wrap the form in a model tag to be able to open it as a dialog -->
        <modal name="hero-editor-modal" height="auto" :scrollable='true'>
            <div v-if='selectedHero'>
                <hero-editor :hero="selectedHero" @onSave="saveHero" @onCancel="closeHeroForm"/>
            </div>
       </modal>

    </div>
</template>

<script>
    import HeroService from '../api-calls/HeroService'
    // @ is an alias to /src
    import HeroEditor from './HeroEditor.vue'
    import AuthService from '../api-calls/AuthService'

    export default {
        components: {
            HeroEditor
        },
        data() {
            return {
                heroes: [],
                selectedHero: null,
                error: '',
                isContributor: AuthService.isUserInRole('Contributor')
            }
        },
        //When the component is created then get the heroes using Web API
        async created() {
            try {
                this.error = '';
                this.heroes = await HeroService.getHeroes();
            } catch (e) {
                console.dir(e);
                this.error = `${e.error}. Please make sure the server is running.`;
            }
        },

        methods: {
            async onDeleteHero(heroId) {
                if (!confirm('Confirm Delete?')) {
                    return;
                }

                await HeroService.deleteHero(heroId);

                // Look for the hero to be deleted then remove it
                const index = this.heroes.findIndex(h => h._id == heroId);
                if (index >= 0) {
                    this.heroes.splice(index, 1);
                }
            },

            async onEditHero(heroId) {
                const hero = this.heroes.find(h => h._id === heroId);
                //Clone the hero to avoid direct edit of the hero displayed in the list
                //this.selectedHero = Object.assign({}, hero);
                this.selectedHero = JSON.parse(JSON.stringify(hero));
                this.$modal.show('hero-editor-modal');
                //console.log(this.selectedHero);
            },

            onAddHero() {
                this.selectedHero = { quotes: []};
                this.$modal.show('hero-editor-modal');
            },

            closeHeroForm() {
                this.$modal.hide('hero-editor-modal');
            },

            async saveHero(hero) {
                this.$modal.hide('hero-editor-modal');
                //console.log("Heroes.vue saveHero", hero);
                //If the hero has an id then update otherwise add
                if (hero._id) {
                    await HeroService.updateHero(hero);
                    const index = this.heroes.findIndex(h => h._id == hero._id);
                    //console.log("saveHero.index", index, hero);
                    //This does not work, need to delete then add
                    //this.heroes[index] = hero;
                    if (index >= 0) {
                        this.heroes.splice(index, 1);
                        this.heroes.push(hero);
                    }
                } else {
                    hero = await HeroService.addHero(hero);
                    this.heroes.push(hero);
                    //console.log("Heroes.vue after add Hero", hero);
                }
            }
        }
    }
</script>

<style scoped>

</style>