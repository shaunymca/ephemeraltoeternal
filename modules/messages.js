var pg = require('pg'),
    Q = require('q');


var conString = process.env.DATABASE_URL;
var client = new pg.Client(conString);

console.log(process.env.DATABASE_URL);

exports.getMessages = function() {
  return Q.promise(function(resolve, reject) {
    client.connect();
    client.query('SELECT * FROM slack.data;', function(err, result) {
      console.log(result.rows);
      resolve(result.rows);
    });
  });
};