<template>
  <main class="container">
    <nav-bar/>
    <br>
    <div class="alert alert-info" v-if="message">
        {{message}}
    </div>
    <!-- Components will be loaded in router-view -->
    <router-view :key="$route.fullPath" />
    <!--
      By default the Vue Router does not reload the component if the url parameters change
      With adding the key, any change to the path will trigger a reload of the component
      with the new data.
    -->
  </main>
</template>

<script>
    import NavBar from './components/NavBar.vue'

    export default {
        components: {
            NavBar
        },
        data() {
          return {
              message : ''
          }
        },
        created() {
            //Subscribe to notifyUser event
            this.$bus.$on('notifyUser', (message) => {
                //console.log('notifyUser.message', message);
                this.message = message;
            });
        },
    }
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .router-link-active {
    border-bottom-color: CornflowerBlue;
  }

  .page {
    position: fixed;
    width: 80%;
  }

  #app {
    margin-top: 60px;
  }

</style>
