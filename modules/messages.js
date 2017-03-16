var pg = require('pg'),
    Q = require('q');


var conString = process.env.DATABASE_URL;

exports.getMessages = function(searchQuery) {
  return Q.promise(function(resolve, reject) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) throw err;
      client.query('SELECT * FROM slack.data where text like $1;', ["%" + searchQuery + "%"], function (err, result) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
        });
        resolve(result.rows);
      });
    });
  });
};