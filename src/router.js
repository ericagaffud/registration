import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register.vue'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('./components/User.vue')
    },
]

const router = new Router ({
    routes: routes,
    mode: 'history'
})

export default router;