<template>
  <div class="container">
    <h4> Hello, {{$store.state.user.handle}}! Welcome to your user page </h4>
    <div class="userinfo white elevation-2">
      <div class="flex1">
        <div class="basicinfo">
          <p style="font-size:2em;">{{$store.state.user.handle}}</p>  
        </div>
        <div class="otherinfo">
          <v-avatar size="80" v-if="$store.state.user.imageUrl != ''"></v-avatar>
          <v-icon size="80" v-if="$store.state.user.imageUrl == ''">mdi-account-circle</v-icon>
        </div>
        <div class="follow">
          <p class="phover" style="font-size:1em;" @click="getFollowers">Followers: {{$store.state.user.followersCount}}</p>
          <p class="phover" style="font-size:1em;" @click="getFollowing">Following: {{$store.state.user.followingCount}}</p>
        </div>
      </div>
      <span class="custom-br"></span><br>
      <div class="bio">
      </div> <!-- end of bio div -->

    </div>  <!-- end of userinfo div -->
    <div class="events">
      <h2> This is where your events will show up! </h2>
    </div>  <!-- end of events div -->
  </div> <!-- end of container div -->
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      
    }
  },
  methods: {
    async getFollowers() {
      console.log("\n ... getFollowers clicked");
    },
    async getFollowing() {
      console.log("\n ... getFollowing clicked");
    }
  }
}
</script>

<style scoped>
.container {
  top: 0;
  left:0;
  min-width: 90%;
  min-height: 90%;
}

.userinfo {
  margin: 5px;
  left: 0;
  height: 500px;
  min-width: 400px;
  width: 35%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
}
.flex1 {
  order:1;
  display: flex;
  flex-direction: row;
}
.basicinfo {
  /* border: 1px solid yellow; */
  left:0;
  order: 1;
  width: 33%;
  text-align: center;
}

.otherinfo {
  /* border: 1px solid purple; */
  top:0;
  order: 2;
  width: 33%;
  text-align: center;
}
.follow {
  /* border: 1px solid red; */
  width: 33%;
  order:3;
}

.events { 
  margin: 5px;
  border: 1px solid red;
}

.phover:hover {
  text-decoration: underline;
  cursor: pointer;
}

.custom-br {
	display:block;
	width: 100%;
	height: 2px;
	background: #f5e51b; 
	border: 1px solid black;
	border-radius: 0.4em;
}
</style>

