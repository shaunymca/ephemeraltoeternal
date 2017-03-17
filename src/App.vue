<template>
  <div id="app">
    <h1>ephemeral &#8594; eternal</h1>
    <h2>Search your entire Slack archive, even if you have a free account.</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  background: #F4F4F4;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin: 0;
}

h2 {
  width: 780px;
  height: 22px;
  font-family: Avenir;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 22px;
  color: #5F5F5F;
  margin: 0 auto;
}
</style>
