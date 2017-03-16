<template>
  <div class="hello">
    <div>
      <input v-model="searchTerm"
             v-on:keyup.13="search"/>
    </div>
    <button v-on:click="search">Search</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      searchTerm: ''
    }
  },
  methods: {
    search() {
      console.log(this.searchTerm)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
