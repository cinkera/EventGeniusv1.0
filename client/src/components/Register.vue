<template>
  <v-layout column xs6 offset-xs3 class="white elevation-2">
      <v-flex >
        <div class="form">
            <v-toolbar flat dense class="purple" dark>
                <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <div class="inputs">
              <br>
              <v-text-field
                v-model="firstname"
                label="First Name"
                outlined
                required
              ></v-text-field>

              <v-text-field
                v-model="lastname"
                label="Last name"
                outlined
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                @change="validateEmail" 
                label="Email"
                outlined
                required
              ></v-text-field>

              <v-text-field
                v-model="username"
                label="Username"
                outlined
                required
              ></v-text-field>

              <v-text-field
                :type="passwordFieldType" 
                v-model="password"
                label="Password"
                outlined
                required
              ></v-text-field>

              <v-text-field
                :type="passwordFieldType" 
                v-model="password2"
                label="Confirm your Password"
                @change="checkSame"
                outlined
                required
              ></v-text-field>

              <v-text-field
                type="date"
                label="Birthday"
                v-model="birthday"
                outlined
              ></v-text-field>

              <div class="error" v-html="error"></div><br>
              <div class="center">
                <v-btn class="purple" @click="register">Register!</v-btn>
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
console.log("\n register.vue script");
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
        email: "",
        password: "",
        password2: "",
        username: "",
        firstname: "",
        lastname: "",
        birthday: "",
        passwordFieldType: 'password',
        error: null
    }
  },
  methods: {
      // async register method to make call to API to send form data to firebase / return response from that
      async register () {
      // I need to dynamically watch passwords to ensure match. Red if not matched, require fields
      try{
          console.log("register was clicked", this.email, this.password)
          const response = await AuthenticationService.register({
              email: this.email,
              password: this.password,
              username: this.username,
              firstname: this.firstname,
              lastname: this.lastname,
              birthday: this.birthday
          })
          console.log("response: ", response.data)
          alert("Your account was created! routing you to your user page");
          return;
        } catch (error) {
          this.error = error.response.data.error
          // alert("Error registering you as a user :/", err);
          // return;
        }
      },
      // swithces the visibility of passwords on click
      switchVisibility() {
          this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      // checkSame
      checkSame() {
          if(this.password != this.password2) {
            console.log("\n\n passwords not the same");
            alert("Passwords do NOT match. Double check your input");
          } else {
            console.log("\n\n passwords match!");
          }
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
