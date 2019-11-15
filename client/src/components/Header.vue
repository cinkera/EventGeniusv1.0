<template>
    <v-toolbar fixed row class="purple darken-1">
        <v-toolbar-title class="mr-4">
            <router-link class="bb" to="/"> Event Genius </router-link>
            <router-link class="bb smol" to="/about"> About </router-link>
            <router-link v-if="!$store.state.isUserLoggedIn" class="bb smol" to="/login"> Log in / Register </router-link>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-icon v-if="$store.state.isUserLoggedIn" @click="navigateTo('/user/' + $store.state.user.handle + '/notifications')" color="black">mdi-bell-outline</v-icon>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-icon v-if="$store.state.isUserLoggedIn" @click="navigateTo('/user/' + $store.state.user.handle + '/messages')" color="black">mdi-message-outline</v-icon>
            <v-divider class="mx-4" inset vertical></v-divider>

             <v-menu  
                class="headeravatar" 
                dense
                :offset-y="true"
                :open-on-hover="true"
                v-if="$store.state.isUserLoggedIn">
              <template v-slot:activator="{ on }">
                <v-avatar  color="purple darken-1" right v-on="on">
                    <v-icon color="black">mdi-account-circle-outline</v-icon>
                </v-avatar>
              </template>
  
              <v-list>
                <v-list-item @click="navigateTo('/user/' + $store.state.user.handle)">
                  <v-list-item-title>{{$store.state.user.handle}}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>logout</v-list-item-title>
                </v-list-item>
              </v-list>

            </v-menu>

        </v-toolbar-title>
    </v-toolbar>
</template>

<script>
// import Router from '@/router'
import AuthenticationService from '@/services/AuthenticationService'
export default {
    data () {
    return {
        error: null
    }
  },
  methods: {
      // async register method to make call to API to send form data to firebase / return response from that
      logout () {
        console.log("logout was clicked")
        try{
            AuthenticationService.logout()
            alert("You are logged out!! Taking you to the home page");
            this.$router.push("/")
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            return;
        } catch (error) {
            this.error = error.response.data.error
            alert("Error logging you out :( try again?", err);
            return;
        }
      },
      navigateTo(route) {
          this.$router.push(route)
      }
  }
}
</script>

<style scoped>

a {
  color: black;
  text-decoration: none;
  font-size: 1.3em;
  padding: 0px;
  padding: 0px 15px;
}

a:hover {
  border-bottom: 1px solid black;
}

.bb {
    color: black;
}

.smol {
    font-size: .9em;
}
.links {
    padding-top: 5%;
}

.headeravatar {
    right: 0px;
}
</style>
