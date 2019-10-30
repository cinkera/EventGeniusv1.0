<template>
    <v-toolbar fixed class="purple">
        <v-toolbar-title class="mr-4">
            <router-link class="bb" to="/"> Event Genius </router-link>
            <router-link class="bb smol" to="/register"> Register </router-link>
            <router-link class="bb smol" to="/about"> About </router-link>
        </v-toolbar-title>

        <v-toolbar-items>
        </v-toolbar-items>
        
    </v-toolbar>
</template>

<script>
// import Router from '@/router'
export default {
    
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
</style>
