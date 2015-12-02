// db/games.js

var sqlite3 = require('sqlite3').verbose();
var dbDir = './db/app-data.db';

exports.find = function(id, done) {
  var db = new sqlite3.Database(dbDir);
  db.run('PRAGMA foreign_keys = ON');

  var query = 'SELECT * FROM Games WHERE game_id = ?';
  db.get(query, id, function(err, row) {
    if (err) return done(err);
    return done(null, row);
  });

  db.close();
}

exports.findBySchool = function(schoolId, done) {
  var db = new sqlite3.Database(dbDir);
  db.run('PRAGMA foreign_keys = ON');

  var query = 'SELECT * FROM Games WHERE home_team_id = ? OR away_team_id = ?';
  db.all(query, schoolId, schoolId, function(err, rows) {
    if (err) return done(err);
    return done(null, rows);
  });

  db.close();
}
