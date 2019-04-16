<template>
  <div id="home">
    <img src="../assets/vue.png">
    <hello-world msg="Welcome to Web Security Demo App 🔐👏" @welcomeClicked="onWelcomeClicked"/>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'

export default {
    components: {
        HelloWorld
    },
    methods: {
        onWelcomeClicked(event) {
            alert('Received welcomeClicked event from Child');
            console.log('Received from child:', event)
        }
    }
}
</script>

<style scoped>
    #home {
        text-align: center;
    }
</style>