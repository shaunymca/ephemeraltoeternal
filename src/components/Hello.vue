<template>
  <div class="hello">
    <div>
      <input v-model="searchTerm"
             v-on:keyup.13="search"
             placeholder="Search your archive"/>
    </div>
    <button v-on:click="search">Search</button>
    <div class="results" v-if="messages.length > 0">
      Results for '{{ resultsForTerm }}'...
      <ul>
        <li class="message"
            v-for="m in messages">
          <div class="details">
            <span class="timestamp">
              {{ m.timestamp | dateFormat }}
            </span>
            <span class="channel">
              <a v-bind:href="m.channel_link">#{{ m.channel_name }}</a>
            </span>
            <span class="user">
              <a v-bind:href="m.user_link">@{{ m.user_name }}</a>
            </span>
          </div>
          <span class="text">{{ m.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'hello',
  data () {
    return {
      searchTerm: '',
      resultsForTerm: '',
      messages: []
    }
  },
  filters: {
    dateFormat: function (date) {
      var tsFloat = parseFloat(date) * 1000
      return moment(tsFloat).format('MM/DD/YY h:mm A');
    }
  },
  methods: {
    search() {
      var userRe = /from:@?([^\s]*)/
      var channelRe = /in:#?([^\s]*)/

      var userMatch = userRe.exec(this.searchTerm)
      var user = userMatch !== null ? userMatch[1] : null

      var channelMatch = channelRe.exec(this.searchTerm)
      var channel = channelMatch !== null ? channelMatch[1] : null

      var query = this.searchTerm.replace(userRe, '').replace(channelRe, '')

      var opts = {params: {}}

      if (user !== null) {
        opts.params.u = user
      }

      if (channel !== null) {
        opts.params.c = channel
      }

      if (query !== '') {
        opts.params.q = query
      }

      this.$http.get('/messages', opts).then(response => {
        this.resultsForTerm = this.searchTerm
        this.messages = response.body.map(m => {
          m.channel_link = 'slack://channel?id=' + m.channel_id + '&team=' + m.team_id
          m.user_link = 'slack://user?team=' + m.team_id + '&id=' + m.user_id
          return m
        })

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

.results {
  margin: 40px auto;
  width: 75%;
}

ul {
  list-style-type: none;
  padding: 0;
}

.message {
  text-align: left;
  margin: 0 10px;
  border-bottom: 1px solid #ececec;
  padding: 10px 5px;
}

.text {
  white-space: pre-line;
}

.details {
  margin-bottom: 5px;
  font-size: 90%;
}

a {
  color: #42b983;
}
</style>
