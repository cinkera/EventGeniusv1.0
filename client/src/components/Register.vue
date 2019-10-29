<template>
  <v-layout column>
      <v-flex class="container">
        <div class="form">
            <v-toolbar flat dense class="purple" dark>
                <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <div class="inputs">
              <v-text-field
                v-model="firstname"
                placeholder="First name"
                required
              ></v-text-field>

              <v-text-field
                v-model="lastname"
                placeholder="Last name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                @change="validateEmail" 
                placeholder="Email"
                required
              ></v-text-field>

              <v-text-field
                v-model="username"
                placeholder="Username"
                required
              ></v-text-field>

              <v-text-field
                :type="passwordFieldType" 
                v-model="password"
                placeholder="Password"
                required
              ></v-text-field>

              <v-text-field
                :type="passwordFieldType" 
                v-model="password2"
                placeholder="Confirm your Password"
                @change="checkSame"
                required
              ></v-text-field>

              <v-text-field
                type="date"
                v-model="birthday"
                placeholder="Birthday"
              ></v-text-field>

              <div class="error" v-html="error"></div><br>
              <div class="center">
                <v-btn class="button" @click="register">Register!</v-btn>
                <v-btn class="button" @click="switchVisibility">show / hide passwords</v-btn>
              </div>
              <br>
          </div>
        </div>
      </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import PageHeader from '@/components/Header.vue'
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
        error: null,
        justify: 'center'
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
  },
  components: {
    PageHeader
  }
}
</script>

<style scoped>

  .error {
    color: red;
  }

  .v-btn {
    color: purple;
    background-color: rgb(91, 14, 192);
  }

  .v-text-field {
    color: purple;
  }

  .purple {
    background-color: purple;
  }

  .container {
    width: 75%;
  }

  .form {
    border-radius: 0.4em;
    border: 2px solid purple;
  }

  .inputs {
    padding: 5px;
  }

  .center {
    text-align: center;
  }
</style>
