<template>
  <div class="hello">
    <div>
      <input class="search-box"
             v-model="searchTerm"
             v-on:keyup.13="search"
             placeholder="Search your archive"/>
    </div>
    <button class="search-button"
            v-on:click="search"
            v-if="searchTerm !== ''"
            v-bind:disabled="searchTerm === ''">
      Search
    </button>
    <div class="results" v-if="loading">
      Loading...
    </div>
    <div class="results" v-if="messages.length === 0 && !loading && resultsForTerm !== ''">
      No results for '{{ resultsForTerm }}'
    </div>
    <div class="results" v-if="messages.length > 0 && !loading">
      Results for '{{ resultsForTerm }}'...
      <ul>
        <li class="message"
            v-for="m in messages"
            v-if="!m.hide">
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
          <a v-bind:href="m.image_link"
             v-if="m.image_src !== null"
             target="_blank">
            <img v-bind:src="m.image_src" />
          </a>
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
      loading: false,
      searchTerm: '',
      resultsForTerm: '',
      messages: [],
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
      if (this.searchTerm === '') {
        return
      }

      this.loading = true
      var userRe = /from:@?([^\s]*)/
      var channelRe = /in:#?([^\s]*)/

      var userMatch = userRe.exec(this.searchTerm)
      var user = userMatch !== null ? userMatch[1] : null

      var channelMatch = channelRe.exec(this.searchTerm)
      var channel = channelMatch !== null ? channelMatch[1] : null

      var query = this.searchTerm.replace(userRe, '').replace(channelRe, '').trim()

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
          if (m.text === '') {
            m.hide = true
            return m
          }
          m.channel_link = 'slack://channel?id=' + m.channel_id + '&team=' + m.team_id
          m.user_link = 'slack://user?team=' + m.team_id + '&id=' + m.user_id
          m.text = m.text.replace(/^<@[A-Z0-9]*\|.* uploaded a file:/, '')
          var imageRe = /<(.*)\|.*>( and commented:)?/
          var imageMatch = imageRe.exec(m.text)
          if (imageMatch !== null) {
             var imagePage = imageMatch[1]
             m.image_link = imagePage
             var imageUrlPart = imagePage.replace(/^.*.slack.com\/files\/[^\/]*\//, '')
             m.image_src = 'https://files.slack.com/files-pri/' + m.team_id + '-' + imageUrlPart
          }
          m.text = m.text.replace(imageRe, '')
          return m
        })
        this.loading = false
      }, response => {
        alert('Something went wrong :(')
        this.loading = false
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

.search-box {
  width: 300px;
  height: 30px;
  font-size: 16px;
  margin: 15px;
  padding: 0 7px;
}

.search-button {
  border: 0;
  background: none;
  box-shadow:none;
  border-radius: 0px;
  width: 100px;
  height: 30px;
  font-size: 16px;
  font-weight: 100;
  border: 1px solid #ececec;
}

.search-button:focus, .search-box:focus {
  outline: 0;
}

.search-button:hover, .search-button:active {
  border: 2px solid #ececec;
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

.message:last-child {
  border-bottom: 0;
}

.message img {
  display: block;
  max-width: 90%;
  margin: 10px auto;
}

.text {
  white-space: pre-line;
}

.details {
  display: flex;
  margin-bottom: 5px;
  font-size: 90%;
  width: 400px;
}

.details span {
  flex-grow: 1;
}

a {
  text-decoration: none;
  color: #7c87e0;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
