<template>
    <!-- A grey horizontal navbar that becomes vertical on extra small screens -->
    <nav class="navbar navbar-expand-sm bg-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="navbar-brand" href="#">
                    <img src="imgs/logo.png" id="logo">
                </a>
            </li>
            <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/heroes" class="nav-link">Heroes</router-link>
            </li>
            <!-- Only show the contacts menu if the user is login -->
            <li class="nav-item" v-if="isGoogleAuth">
                <router-link to="/contacts" class="nav-link">Contacts</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
                <router-link to="/users" class="nav-link">Users</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/calculator" class="nav-link">Calculator</router-link>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
            <li class="nav-item">
                <span class="navbar-text">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  Welcome {{user.given_name}} {{user.family_name}}
                </span>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" role="button" @click="logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                </a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-else>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                    Login
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import AuthService from '../api-calls/AuthService'
    export default {
        data() {
          return {
              user: null,
              isGoogleAuth: false,
              isAdmin: false
          }
        },
        created() {
            //Subscribe to afterLogin event
            this.$bus.$on('userChanged', (user) => {
                this.user = user;
                this.isGoogleAuth = AuthService.isGoogleAuth();
                this.isAdmin = AuthService.isUserInRole('Admin');
            });
            this.user = AuthService.getUser();
        },
        methods: {
            logout(event) {
                this.user = null;
                //this.$forceUpdate();
                AuthService.logout();
                this.$router.push('/login');
                event.preventDefault();
            }
        }
    }
</script>

<style scoped>
    #logo {
        display: block;
        max-width:40px;
        max-height:40px;
        width: auto;
        height: auto;
    }
</style>