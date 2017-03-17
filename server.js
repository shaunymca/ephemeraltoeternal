var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var messages = require('modules/messages.js')
var Q = require('q')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))


app.get('/messages', (req, res) => {
  messages.getMessages(req.query).then(function(output){
    res.send(output);
  });
});

app.get('/users', (req, res) => {
  messages.getUsers().then(function(output){
    res.send(output);
  })
})


app.get('/channels', (req, res) => {
  messages.getChannels().then(function(output){
    res.send(output);
  })
})

app.get('/findByTimestamp', (req, res) => {
  messages.findByTimestamp(req.query.t).then(function(output){
    res.send(output);
  })
})

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)