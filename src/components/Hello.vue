<template>
  <div class="hello">
    <div v-if="users.length === 0 && !loading">
      <div class='results'>
        <div class="instructions-container">
          <h2>Getting Set Up</h2>
          <ul class="instructions">
            <li>Set up a free <a target="_blank" href="https://stitchdata.com/signup"> Stitch account </a> to sync data to your heroku postgres account</li>
            <li>Once you've logged into Stitch, create a webhook integration. <b>Please note, you have to name the integration "Stitch" for this app to work correctly</b>, and make sure to note the webhook url, and copy it. </li>
            <li> You'll get taken to the Destination page next. Make sure to leave this tab open for later.</li>
            <li> Open up your Slack group settings and head to <code> menu / Configure Apps / Custom Integrations / Outgoing Webhooks</code>. </li>
            <li> Click "Add A Configuration" and confirm. Scroll down and choose the channel you'd like to set up. You can add more channels later by setting up more webhooks. Add the webhook url you copied earlier from Stitch in the "URL(s)" section. Scroll down and click "Save Settings"</li>
            <li>Now you'll need to add your Heroku Postgres to Stitch, so it can load the messages. Head to this app's repository in your Heroku account. On the Overview tab for this app, you'll see the Heroku Postgres add-on listed. Click on it.</li>
            <li>Scroll down, and click the "View Credentials" button. Copy over the relevant sections into the Stitch destination page, and click "Save Destination" in Stitch."</li>
          </ul>
          <p><b>And, you're done!</b> After a few messages have gone through, you'll be able to search and view them here. </p>
        </div>        
      </div>
    </div>
    <div v-else>
      <input class="search-box"
             v-model="searchTerm"
             v-on:keyup.13="search"
             placeholder="Search for... e.g. #my-channel or @gooduser"/>
      <button class="search-button"
              v-on:click="search"
              v-bind:disabled="searchTerm === ''">
        Search
      </button>
      <ul class="auto-suggest" v-if="userSuggestions.length > 0">
        <li class="suggestion"
            v-for="u in userSuggestions"
            v-on:click="pickSuggestedUser(u)">
          @{{ u }}
        </li>
      </ul>
      <ul class="auto-suggest" v-if="channelSuggestions.length > 0">
        <li class="suggestion"
            v-for="c in channelSuggestions"
            v-on:click="pickSuggestedChannel(c)">
          #{{ c }}
        </li>
      </ul>
    </div>
    <div v-if="messages.length === 0 &&
               resultsForTerm == '' &&
               $route.name !== 'Message'">
      <br>
      <h2>
        <span v-if="!loading">
          Nothing to show yet, start searching
        </span>
        <span v-if="loading">
          Loading...
        </span>
      </h2>
    </div>
    <div class="results" v-if="messages.length === 0 &&
                               !loading &&
                               resultsForTerm !== '' &&
                               $route.name !== 'Message'">
      <div class="desc">No results for '{{ resultsForTerm }}'</div>
    </div>
    <div class="results" v-if="messages.length > 0 && !loading">
      <div class="desc" v-if="$route.name !== 'Message'">
        Results for '{{ resultsForTerm }}':
      </div>
      <ul>
        <li class="message"
            v-for="m in messages"
            v-if="!m.hide"
            v-bind:class="{expanded: m.expanded}">
          <div class="details">
            <span class="user">
              <a v-bind:href="m.user_link">@{{ m.user_name }}</a>
            </span>
            <span class="channel">
              <a v-bind:href="m.channel_link">#{{ m.channel_name }}</a>
            </span>
            <span class="timestamp">
              <button class="expand-button" v-on:click="expandMessage(m)">
                {{ m.timestamp | dateFormat }}
              </button>
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
  mounted() {
    this.$http.get('/users').then(response => {
      this.users = response.body.map(u => u.user_name)
      this.loading = false
    })
    this.$http.get('/channels').then(response => {
      this.channels = response.body.map(c => c.channel_name)
    })

    if (this.$route.name === 'Search') {
      this.searchTerm = decodeURIComponent(this.$route.params.query)
      this.search()
    }
    if (this.$route.name === 'Message') {
      this.expandMessage({timestamp: this.$route.params.timestamp})
    }
  },
  watch: {
    searchTerm: function (val, oldVal) {
      if (val !== oldVal) {
        this.userSuggestions = []
        this.channelSuggestions = []
      }
      var userRe = /@([^\s]+)/
      var setUserRe = /from:/
      var userMatch = userRe.exec(val)
      var setUserMatch = setUserRe.exec(val)
      if (userMatch !== null && setUserMatch === null) {
        var userStr = userMatch[1]
        this.userSuggestions = this.users.filter(u => {
          var userFilterRe = new RegExp(userStr)
          return userFilterRe.exec(u) !== null
        })
      }

      var channelRe = /#([^\s]+)/
      var setChannelRe = /in:/
      var channelMatch = channelRe.exec(val)
      var setChannelMatch = setChannelRe.exec(val)
      if (channelMatch !== null && setChannelMatch === null) {
        var channelStr = channelMatch[1]
        this.channelSuggestions = this.channels.filter(c => {
          var channelFilterRe = new RegExp(channelStr)
          return channelFilterRe.exec(c) !== null
        })
      }
    }
  },
  data () {
    return {
      loading: true,
      searchTerm: '',
      resultsForTerm: '',
      messages: [],
      users: [],
      channels: [],
      userSuggestions: [],
      channelSuggestions: []
    }
  },
  filters: {
    dateFormat: function (date) {
      var tsFloat = parseFloat(date) * 1000
      return moment(tsFloat).format('MM/DD/YY h:mm A');
    }
  },
  methods: {
    parseMessage(m) {
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
    },
    sortMessages(a, b) {
      return parseFloat(a.timestamp) - parseFloat(b.timestamp);
    },
    expandMessage(m) {
      this.loading = true
      var opts = {
        params: {
          t: m.timestamp
        }
      }

      this.$router.push({ path: '/message/' + m.timestamp })

      this.$http.get('/findByTimestamp', opts).then(response => {
        var messages = response.body.map(this.parseMessage).sort(this.sortMessages)
        this.messages = messages.map(innerM => {
          if (innerM.timestamp === m.timestamp) {
            innerM.expanded = true
          }
          return innerM
        })
        this.resultsForTerm = ''
        this.loading = false
      })
    },
    pickSuggestedUser(u) {
      this.userSuggestions = []
      this.searchTerm = 'from:@' + u
    },
    pickSuggestedChannel(c) {
      this.channelSuggestions = []
      this.searchTerm = 'in:#' + c
    },
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

      this.$router.push({ path: '/search/' + encodeURIComponent(this.searchTerm) })

      this.$http.get('/messages', opts).then(response => {
        this.resultsForTerm = this.searchTerm
        this.messages = response.body.map(this.parseMessage).sort(this.sortMessages)
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

.results {
  margin: 40px auto;
  text-align: left;
  width: 780px;
  background-color: #FFFFFF;
  border: 1px solid #D2D2D2;

}

.results .desc {
  width: 285.41px;
  height: 23px;
  font-family: Avenir;
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  color: #999999;
  margin: 0 10px;
  padding: 10px 5px;
}

.search-box {
  width: 490px;
  height: 43px;
  font-size: 16px;
  margin: 50px 0 0 0;
  padding: 0 7px;
}

.auto-suggest {
  background-color: white;
  width: 635px;
  margin: 0 auto 10px auto;
  text-align: left;
}

.auto-suggest li {
  padding: 5px;
  margin: 3px 0;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  border-bottom: 1px solid #f4f4f4;
}

.auto-suggest li:hover {
  font-weight: bold;
}

.search-button {
  width: 130px;
  height: 47px;
  font-size: 16px;
  color: #ececec;
  border: none;
  background-color: #3399CC;
  margin-left: -4px;
  cursor: pointer;
}

.search-button:focus, .search-box:focus {
  outline: 0;
}

.search-button:hover, .search-button:active {
  border: 2px solid #ececec;
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

.message.expanded {
  background-color: #fffaea;
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

.expand-button {
  color: #999999;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.expand-button:hover {
  text-decoration:underline;
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

.instructions-container {
  padding: 35px;
  color: #5f5f5f;
  font-weight: 500;
}

.instructions-container b {
  font-weight: 900;
}

.instructions-container h2 {
  max-width: 100%;
  font-weight: bold;
  font-size: 20px;
  margin: 1rem 0;
}

.instructions {
  padding: 0 40px 0 50px;
  margin: 0 auto;
}

.instructions li {
  margin-bottom: 1rem;
}

.instructions li code {
  font-size: 15px;
  font-weight: 600;
}

body {
  padding-bottom: 3rem;
}

</style>
