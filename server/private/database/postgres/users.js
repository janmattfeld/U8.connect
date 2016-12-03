'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const mysql = require('pg')

module.exports = {
  get: getUser,
  insert: insertUser,
}

function getUser(userId) {
  const deferred = q.defer()
  let query = `SELECT * FROM ${global.tables.users}  WHERE id=?`
  global.instance.query(query, userId, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result) {
      deferred.resolve(result)
    }
  })
  return deferred.promise
}

function insertUser(user) {
  const deferred = q.defer()
  const sqlQuery = `INSERT INTO ${global.tables.users} SET ?`
  global.instance.query(sqlQuery, user, function (err, result) {
    if (err) {
      console.info(sqlQuery, ' -> ', pg.escape(user))
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve()
    }
  })
  return deferred.promise
}
