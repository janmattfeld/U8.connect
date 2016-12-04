'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const pg = require('pg')

module.exports = {
  get: getTags,
  insert: addTags,
}

function getTags(tags) {
  const deferred = q.defer()
  console.log(tags)
  let query = `SELECT * FROM ${global.tables.tags} WHERE id IN (
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

function addTags(tags) {
  const deferred = q.defer()
  const sqlQuery = `INSERT INTO ${global.tables.tags} (tag_name, x, y, general_class) VALUES($1, $2, $3, $4) RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery,  Object.values(tags), function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result.rows[0].id)
    }
  })
  return deferred.promise
}
