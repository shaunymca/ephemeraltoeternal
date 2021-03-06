# ephemeral-to-eternal

App that stores and searches messages from your Slack org.
Ideal for large communities that won't ever be able to pay for Slack.

## [DEMO (philly dev slack)](https://phillydevslack.herokuapp.com/#/)

## Deploy today!
Click the deploy button to setup this app in a free Heroku instance and get set up.  

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

[![read](https://github.com/shaunymca/ephemeraltoeternal/blob/master/message-search.gif?raw=true)]()

## Build Setup

``` bash
# install dependencies
npm install

# add a dotenv file
You'll need to add a `.env` file to root folder. Include the Postgres settings as below:
`DATABASE_URL=<your database uri>`
`PGSSLMODE=require`

# serve with hot reload at localhost:8080
npm run dev

# serve with (server) hot reload at localhost:8080
nodemon build/dev-server.js

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
