var pg = require('pg'),
    Q = require('q');


var conString = process.env.DATABASE_URL;

exports.getMessages = function(searchQuery) {
  return Q.promise(function(resolve, reject) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) throw err;
      queryparts = queryParts(searchQuery);
      client.query('SELECT * FROM slack.data where 1=1 ' + queryparts.user.column + queryparts.channel.column + queryparts.query.column + ' ;', [queryparts.user.query, queryparts.channel.query, queryparts.query.query], function (err, result) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
        });
        resolve(result.rows);
      });
    });
  });
};

queryParts = function(searchQuery) {
  console.log(searchQuery.q);
  var queryPart = {};
  if (typeof searchQuery.u !== 'undefined') {
   queryPart.user = {column: " AND user_name = $1", query : searchQuery.u}
 } else {queryPart.user = {column : "AND 1 = $1", query : 1}}
  if (typeof searchQuery.c !== 'undefined') {
   queryPart.channel = {column : " AND channel_name = $2", query : searchQuery.c}
 } else {queryPart.channel = {column : "AND 1 = $2", query : 1}}
  if (typeof searchQuery.q !== 'undefined') {
   queryPart.query = {column : " AND  text::text @@ $3::text", query : searchQuery.q}
 } else {queryPart.query = {column : "AND 1 = $3", query : 1}}
  return queryPart;
}

exports.getUsers = function() {
  return Q.promise(function(resolve, reject) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) throw err;
      client.query('SELECT distinct(user_name) FROM slack.data', function (err, result) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
        });
        console.log(result.rows);
        resolve(result.rows);
      });
    });
  });
}

exports.getChannels = function() {
  return Q.promise(function(resolve, reject) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) throw err;
      client.query('SELECT distinct(channel_name) FROM slack.data', function (err, result) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
        });
        console.log(result.rows);
        resolve(result.rows);
      });
    });
  });
}

exports.findByTimestamp = function(timestamp) {
  return Q.promise(function(resolve, reject) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) throw err;
      client.query('SELECT * FROM slack.data where timestamp >= $1 limit 25;', [timestamp], function (err, result) {
        if (err) throw err;
        firstMessages = result.rows
        client.query('SELECT * FROM slack.data where timestamp < $1 limit 25;', [timestamp], function (err, result) {
          if (err) throw err;
          var fullMessages = firstMessages.concat(result.rows)
          
          client.end(function (err) {
            if (err) throw err;
          });
          resolve(fullMessages);
        });
      });
    });
  });
};