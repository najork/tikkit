// db/accesstokens.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const dbFile = config.db.dbFile;

exports.find = function(token, done) {
  const db = new sqlite3.Database(dbFile);
  db.run('PRAGMA foreign_keys = ON');

  const query = 'SELECT * FROM AccessTokens WHERE token = ?';
  db.get(query, token, function(err, row) {
    if (err) return done(err);
    return done(null, row);
  });

  db.close();
}

exports.save = function(token, userId, done) {
  const db = new sqlite3.Database(dbFile);
  db.run('PRAGMA foreign_keys = ON');

  const query = 'INSERT INTO AccessTokens(token, user_id) VALUES (?, ?)';
  db.run(query, token, userId, function(err) {
    if (err) return done(err);
    return done(null);
  });

  db.close();
}
