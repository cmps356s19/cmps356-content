<template>
   <h1 @click="onClick">{{ msg }}</h1>
</template>

<script>
  export default {
      props: {
          msg: String
      },
      methods: {
          onClick() {
              this.$emit('welcomeClicked', this.msg);
          }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
