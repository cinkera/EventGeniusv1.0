<template>
  <v-layout column xs6 offset-xs3 class="white elevation-2">
      <v-flex >
        <div class="form">
            <v-toolbar flat dense class="purple darken-1" dark>
                <v-toolbar-title> Sign in! </v-toolbar-title>
            </v-toolbar>
            <div class="inputs">
                <br>
              <v-text-field
                v-model="email"
                label="Email"
                @change="validateEmail" 
                outlined
                required
                color="purple"
              ></v-text-field>

              <v-text-field
                :type="passwordFieldType" 
                v-model="password"
                label="Password"
                outlined
                required
                color="purple"
              ></v-text-field>

              <div class="error" v-html="error"></div><br>
              <div class="center">
                <router-link to="/register"> Not registered yet? Create an account! </router-link>
                <br>
                <v-btn class="purple" @click="login">Submit!</v-btn>
                <v-btn class="purple" @click="switchVisibility">show / hide passwords</v-btn>
              </div>
              <br>
          </div>
        </div>
      </v-flex>
  </v-layout>
</template>

<script>
/*eslint no-console: "error"*/
console.log("\n signin.vue script");
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
        email: "",
        password: "",
        passwordFieldType: 'password',
        error: null
    }
  },
  methods: {
      // async register method to make call to API to send form data to firebase / return response from that
      async login() {
        // I need to dynamically watch passwords to ensure match. Red if not matched, require fields
        try{
          console.log("login was clicked", this.email, this.password)
          const response = await AuthenticationService.login({
              email: this.email,
              password: this.password
          })
          console.log("response: ", response.data[0].user)
          let route = "/user/"+ response.data[0].user.handle;
          this.$store.dispatch('setToken', response.data[1].token)
          this.$store.dispatch('setUser', response.data[0].user)
          this.$router.push(route);
          return;
        } catch (error) {
          this.error = error.response.data.error
          alert("Error registering you as a user :/", err);
          return;
        }
      },
      // swithces the visibility of passwords on click
      switchVisibility() {
          this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      // validates email format
      validateEmail() {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.email.match(mailformat)) {
            console.log("\n\n email is good");  
            return true;
        }
        else {
            console.log("\n\n email is NOT good");
            alert("You have entered an invalid email address!");
            return false;
        }
      }
  }
}
</script>

<style scoped>
  .error {
    color: red;
    background-color: white;
  }

  .inputs {
    margin: auto;
    width: 75%
  }

  .center {
    text-align: center;
    margin: auto;
    padding-left: 5px;
  }
</style>
