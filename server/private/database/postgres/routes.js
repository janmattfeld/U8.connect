'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const mysql = require('pg')

module.exports = {
  get: getUser,
  insert: insertUser,
}

function getRoutes(Routes) {
  const deferred = q.defer()
  console.log(routeId)
  let query = `SELECT * FROM ${global.tables.routes} WHERE id IN (
    ${tags.join(', \n')}
  )`
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

function insertRoutes(user) {
  const deferred = q.defer()
  const sqlQuery = `INSERT INTO ${global.tables.routes} (tag_name) VALUES($1, $2, $3, $4) RETURNING id`
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
