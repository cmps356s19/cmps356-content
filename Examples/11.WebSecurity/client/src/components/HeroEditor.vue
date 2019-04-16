<template>
    <div class="container">
        <h3 v-if="hero.id">Edit Hero</h3>
        <h3 v-else>Add Hero</h3>

            <input type="hidden" class="form-control" id="id" name="id" v-model="hero._id">
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="name">Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name"
                           name="name" v-model.trim="hero.name" autofocus
                           @input="$v.hero.name.$touch()">
                </div>
                <!--<pre>name: {{ $v.hero.name }}</pre>-->
                <span class="text-danger"
                      v-if="$v.hero.name.$dirty && !$v.hero.name.required">
                    Name is required
                </span>
                <span class="text-danger" v-if="$v.hero.name.$dirty && !$v.hero.name.minLength">
                    Name must have at least {{$v.hero.name.$params.minLength.min}} letters.
                </span>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="heroType">Hero Type</label>
                <div class="col-sm-10">
                    <select class="form-control" id="heroType"
                            name="heroType" v-model="hero.heroType"
                            @input="$v.hero.heroType.$touch()">
                        <option value=""></option>
                        <option v-for="heroType in heroTypes" :value="heroType">
                            {{heroType}}
                        </option>
                    </select>
                </div>
                <span class="text-danger"
                        v-if="$v.hero.heroType.$dirty && !$v.hero.heroType.required">Hero Type is required
                </span>
            </div>

            <h4>Quotes</h4>
            <button @click="addQuote" class="btn btn-link">
                <i class="fa fa-plus" aria-hidden="true"></i> Quote
            </button>

            <div class="text-danger"
              v-if="$v.hero.quotes.$dirty && $v.hero.quotes.$invalid">Quote cannot be empty
            </div>

            <div v-for="(quote, index) in hero.quotes" >
                <div class="form-group row">
                    <div class="col-sm-11">
                        <input class="form-control"
                               v-model.trim="quote.text"
                               @input="$v.hero.quotes.$touch()">
                    </div>
                    <div class="col-sm-1">
                      <span class="delete" title="Delete quote" @click="deleteQuote(index)">
                            <i style="color: indianred;" class="fa fa-minus-circle" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="form-group row text-center">
                <div class="col-sm-12">
                    <input type="button" value="Save" class="btn btn-primary"
                            @click="onSave"
                            :disabled="$v.$invalid">

                    <input type="button" value="Cancel"  class="btn btn-secondary"
                           @click="onCancel">
                </div>
            </div>
    </div>
</template>

<script>
    import {required, minLength, between} from 'vuelidate/lib/validators'

    function validateQuotes(quotes){
        //do logic on password value and return boolean on if meets standards
        if (!quotes) {
            return true;
        }
        const emptyQuotes = quotes.filter(q => q.text === '');
        return (emptyQuotes.length === 0);
    }

    export default {
        props: {
            hero: {}
        },
        data() {
          return {
              heroTypes : ['Prophet', 'Companion', 'Scholar']
          }
        },
        validations: {
            hero: {
                name: {
                    required,
                    minLength: minLength(4)
                },
                heroType: {
                    required
                },
                quotes: {
                    validateQuotes
                }
            }
        },
        methods: {
            onSave() {
                this.$emit('onSave', this.hero);
            },
            onCancel() {
                this.$emit('onCancel');
            },

            addQuote() {
                if (!this.hero.quotes) {
                    this.hero.quotes = [];
                }
                this.hero.quotes.push({text: ''});
            },

            deleteQuote(quoteIndex) {
                this.hero.quotes.splice(quoteIndex, 1);
            }
        }
    }
</script>

<style scoped>
    input[type='button'] {
        margin-right: 10px;
    }
</style>