<template>

  <div id="app">
      <a href="https://github.com/shaunymca/ephemeraltoeternal" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>
    <h1>ephemeral &#8594; eternal</h1>
    <h2>Search your entire archive, even if you have a free account.</h2>
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
