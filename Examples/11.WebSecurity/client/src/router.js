import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Contacts from './components/Contacts.vue'
import Users from './components/Users.vue'
import Calculator from './components/Calculator.vue'
import Heroes from './components/Heroes.vue'
import AuthService from './api-calls/AuthService'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/contacts',
            component: Contacts,
            meta: { requiresGoogleAuth: true }
        },
        {
            path: '/users',
            component: Users,
            meta: { requiresAdmin: true }
        },
        {
            path: '/calculator',
            component: Calculator
        },
        {
            path: '/heroes',
            component: Heroes
        }
    ],
});

router.beforeEach((to, from, next) => {
    //Clean any previous user notifications
    router.$bus.$emit('notifyUser', '');
    console.log("from", from.path, 'to', to.path);
    if (to.meta.requiresAdmin) {
        //if the user is admin allow him/her to access the route
        if (AuthService.isUserInRole('Admin')) {
            next();
        } else {
            const message = `You need Admin role to access${to.path}`;
            //alert(message);
            router.$bus.$emit('notifyUser', message);
            const path = from ? from.path : '/';
            router.push({path});
            return;
        }
    }
    if (to.meta.requiresGoogleAuth) {
        //if the user is admin allow him/her to access the route
        if (AuthService.isGoogleAuth()) {
            next();
        } else {
            const message = `You need to authenticate using Google to access ${to.path}`;
            //alert(message);
            router.$bus.$emit('notifyUser', message);
            const path = from ? from.path : '/';
            router.push({path});
            return;
        }
    }
    //console.log('I am going to the requested route', to.path);
    next();
});

export default router;