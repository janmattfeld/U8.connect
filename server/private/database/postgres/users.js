'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const mysql = require('pg')

module.exports = {
  get: getUser,
  insert: addUser,
}

function getUser(userId) {
  const deferred = q.defer()
  console.log(userId)
  let query = `SELECT * FROM ${global.tables.users} WHERE id = ` + userId
  console.log(query)
  global.instance.query(query, function (err, result) {
    if (err) {
      console.log(err)
      console.error(err)
      deferred.reject(err)
    } else if (result.rows.length == 0) {
      deferred.resolve(null)
    } else {
      console.log(result.rows)
      deferred.resolve(result.rows)
    }
  })
  return deferred.promise
}

function addUser(user) {
  const deferred = q.defer()
  const sqlQuery = `INSERT INTO ${global.tables.users} (first_name, last_name, nick_name, sex, email, password, registered_since, birthday, longterm_tags, middleterm_tags, shortterm_tags, current_route ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery, user, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result.rows[0].id)
    }
  })
  return deferred.promise
}
