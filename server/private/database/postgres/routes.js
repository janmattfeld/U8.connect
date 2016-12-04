'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const pg = require('pg')

module.exports = {
  get: getRoutes,
  insert: addRoutes,
}

function getRoutes(routes) {
  const deferred = q.defer()
  console.log(routes)
  let query = `SELECT * FROM ${global.tables.routes} WHERE id IN (
    ${routes.join(', \n')}
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

function addRoutes(routes) {
  const deferred = q.defer()
  const sqlQuery = `INSERT INTO ${global.tables.routes} (type, route_name, route_extid, time_start, time_end, main_tags, tags, tags_intensity) VALUES($1, $2, $3, $4,$5,$6,$7,$8) RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery,  Object.values(routes), function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result.rows[0].id)
    }
  })
  return deferred.promise
}
