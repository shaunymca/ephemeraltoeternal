var pg = require('pg'),
    Q = require('q');


var conString = process.env.DATABASE_URL;
var client = new pg.Client(conString);

exports.getMessages = function() {
  return Q.promise(function(resolve, reject) {
    client.connect();
    client.query('SELECT * FROM slack.data;', function(err, result) {
      resolve(result.rows);
    });
  });
};