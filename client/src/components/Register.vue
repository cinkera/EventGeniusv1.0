<template>
    <div>
        <h1>Register Today!</h1>
        <input type="text" name="username" v-model="username" required placeholder="Enter your username"/>
        <br>
        <input type="text" name="firstname" v-model="firstname" required placeholder="First name..."/>
        <br>
        <input type="text" name="lastname" v-model="lastname" required placeholder="Last name..."/>
        <br>
        <input type="email" name="email" v-model="email" required @change="validateEmail" placeholder="Email..."/>
        <br>
        <input :type="passwordFieldType" @change="checkSame" name="password" v-model="password" required placeholder="Password..."/>
        <br>
        <input :type="passwordFieldType" @change="checkSame" name="password2" v-model="password2" required placeholder="Confirm your password"/>
        <button type="password" @click="switchVisibility">show / hide</button>
        <br>
        <input type="date" name="birthday" v-model="birthday" required placeholder="Birthday... "/>
        <br>
        <button class="btn-large purple" @click="register">Register!</button>
    </div>
</template>

<script>
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
        passwordFieldType: 'password'
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
          return status(201).send({ message: "your account was created!" });
        } catch (err) {
          console.log("\n ... error in register: ", err);
          return status(500).send({message: "Error registering you as a user :/"});
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

  }}
</script>

