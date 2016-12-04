'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const pg = require('pg')

module.exports = {
  get: getUser,
  insert: addUser,
  updateGeo: updateGeo
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
  console.log(Object.values(user));
  const sqlQuery = `INSERT INTO ${global.tables.users} (first_name, last_name, nick_name, sex, email, password, registered_since, birthday, longterm_tags, middleterm_tags, shortterm_tags, current_route, lat, lon, last_geo_timestamp) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery, Object.values(user), function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result.rows[0].id)
    }
  })
  return deferred.promise
}

function updateGeo(userId, geoInfo){
  const deferred = q.defer();
  var unixtime = Date.now() / 1000;
  const sqlQuery = `UPDATE ${global.tables.users} SET route_setup = '` + geoInfo.route_setup + `', current_route = ` + geoInfo.current_route + `, lat = `+ geoInfo.lat + `, lon = `+ geoInfo.lon + `, last_geo_timestamp = `+ unixtime + ` WHERE id = ` + userId +` RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result.rows[0].id)
    }
  })
  return deferred.promise
}
