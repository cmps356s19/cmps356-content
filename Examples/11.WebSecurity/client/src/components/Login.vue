<template>
    <div class="container">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-2">
                    <img src="imgs/logo.png" id="logo">
                </div>
                <div class="col-md-4 justify-content-start">
                    <h3>Login</h3>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <ul class="col-md-6">
                    <li>Login using: admin pass: secret.</li>
                    <li>Or login using your Gmail account.</li>
                    <li>Or signup using postman @ http://localhost:3040/auth/signup. Lazy to provide UI 🙄</li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                  <span class="input-group-addon" style="width: 2.6rem">
                     <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                            <input type="text" v-model.trim="name" class="form-control"
                                   placeholder="username" autofocus
                                   @input="$v.name.$touch()">
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <span class="text-danger"
                          v-if="$v.name.$dirty && !$v.name.required">Username is required
                    </span>
                    <span class="text-danger"
                          v-if="$v.name.$dirty && !$v.name.minLength">
                        Username must have at least {{$v.name.$params.minLength.min}} letters.
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <div class="form-group">
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                  <span class="input-group-addon" style="width: 2.6rem">
                      <i class="fa fa-key" aria-hidden="true"></i>
                  </span>
                        <input type="password" v-model.trim="password"
                               class="form-control" placeholder="password"
                               @input="$v.password.$touch()">
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                  <span class="text-danger"
                        v-if="$v.password.$dirty && !$v.password.required">Password is required
                  </span>
                  <span class="text-danger"
                              v-if="$v.password.$dirty && !$v.password.minLength">
                    Password must have at least {{$v.password.$params.minLength.min}} letters.
                  </span>
                </div>
            </div>

            <div class="row" style="padding-top: 1rem">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="text-center">
                        <input id="submitBtn"
                               class="btn btn-primary" type="button" value="Login"
                               @click="authenticate('local')" :disabled="$v.$invalid">
                    </div>
                    <br>
                    <p v-if="error" class="text-danger">{{error}}</p>
                </div>
            </div>
        </form>

        <br>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6 text-center">
                <button @click="authenticate('google')" style="text-align: center">
                    <img src="../assets/google-signin.png">
                </button>
                <br>
                <input type="checkbox"  v-model="manageMyGoogleContacts"> Manage my Google Contacts
            </div>
        </div>
        <!--{{$v}}-->
    </div>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'
    import AuthService from '../api-calls/AuthService'

    export default {
        data() {
            return {
                name: '',
                password: '',
                manageMyGoogleContacts: false,
                error: ''
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4)
            },
            password: {
                required,
                minLength: minLength(4)
            }
        },
        created() {
            AuthService.logout();
            this.$bus.$emit('userChanged', null);
        },
        methods: {
            async authenticate(oidProvider) {
                this.error = '';
                try {
                    let user;
                    if (oidProvider == 'local') {
                        const userInfo = {name: this.name, password: this.password};
                        user = await AuthService.login(userInfo);
                    } else {
                        user = await AuthService.addOpenIdUser(oidProvider, this.manageMyGoogleContacts);
                    }
                    console.log('Login.vue.authenticate.user: ', user);

                    //Emit an event so that the MenuBar component can be notified to refresh the menu
                    if (user) {
                        this.$bus.$emit('userChanged', user);
                        this.$router.push(this.$route.query.redirect || AuthService.getUserDefaultUrl());
                    }
                    else {
                        this.error = "Authentication failed 😱";
                    }
                } catch (err) {
                    console.log('Login.vue.authenticate.err: ', err);
                    this.error = `${err}😱`;
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 30px;
    }

    #logo {
        max-width: 80px;
        max-height: 80px;
        width: auto;
        height: auto;
        margin-bottom: 20px;
    }
</style>
