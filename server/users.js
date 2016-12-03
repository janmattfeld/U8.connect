'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const mysql = require('pg')

module.exports = {
  get: getUser,
  add: addUser,
}

function getUser(userId) {
  const deferred = q.defer()
  console.log(userId)
  let query = `SELECT * FROM ${global.tables.users} WHERE id = ` + userId
  console.log(query)
  global.instance.query(query, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result.rows.length == 0) {
      console.log(result.rows)
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
  const sqlQuery = `INSERT INTO ${global.tables.users} (first_name) VALUES($1) RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery, user, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result)
    }
  })
  return deferred.promise
}
