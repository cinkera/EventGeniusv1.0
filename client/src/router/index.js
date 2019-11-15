import Vue from 'vue'
import VueRouter from 'vue-router'
import colors from 'vuetify/lib/util/colors'

/* Component Imports */
import HomePage from '../components/HomePage'
import Register from '@/components/Register'
import Login from '@/components/Signin'
import About from '@/components/About'
import UserPage from '@/components/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user/:userHandle',
    name: 'user',
    component: UserPage
  },
]

const router = new VueRouter({
  routes
})

export default router

// export default new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: colors.red.darken1, // #E53935
//         secondary: colors.red.lighten4, // #FFCDD2
//         accent: colors.indigo.base, // #3F51B5
//       },
//     },
//   },
// })