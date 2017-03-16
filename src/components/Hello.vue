<template>
  <div class="hello">
    <div>
      <input v-model="searchTerm"
             v-on:keyup.13="search"/>
    </div>
    <button v-on:click="search">Search</button>
    <ul>
      <li v-for="m in messages">
        <strong>{{ m.user_name }}</strong>: {{ m.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      searchTerm: '',
      messages: []
    }
  },
  methods: {
    search() {
      var opts = {
        params: {
          q: this.searchTerm
        }
      }

      this.$http.get('/messages', opts).then(response => {

        this.messages = response.body;

      }, response => {
        alert('Something went wrong :(')
      });
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
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
