<template>
    <div>
        <h1>Register Today!</h1>
        <input type="email" name="email" v-model="email" placeholder="Enter your email here!"/>
        <br>
        <input type="password" name="password" v-model="password" placeholder="Enter your password!"/>
        <br>
        <button @click="register">Register!</button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
        email: "",
        password: ""
    }
  },
  methods: {
      async register () {
        console.log("register was clicked", this.email, this.password)
        const response = await AuthenticationService.register({
            email: this.email,
            password: this.password
        })
        console.log("response: ", response.data)
      }
  }
}
</script>

