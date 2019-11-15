// store.js file for our vuex store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if(token) {            
                state.isUserLoggedIn = true;
            } else {
                token = null;
                state.isUserLoggedIn = false;
            }
        },
        setUser(state, user) {
            console.log("\n ... setUser in store.js, user: ", user);
            state.user = user
            if(user) {
                state.isUserLoggedIn = true;
            } else {
                user = null;
                state.isUserLoggedIn = false;
            }
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token)
        },
        setUser({commit}, user) {
            commit('setUser', user)
        }
    }
})