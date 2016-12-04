'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const pg = require('pg')
const moment = require('moment');


module.exports = {
  get: getRoutes,
  insert: addRoutes,
}

function getRoutes(routes) {
  const deferred = q.defer()
  console.log(routes)
  let query = `SELECT * FROM ${global.tables.routes} WHERE id IN (
    ${routes.routes}
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
  console.log(routes.routeSetup.length);
  for(i=0;i<routes.routeSetup.length;i++)
  {
    var route = routes.routeSetup[i];
    insertObj = {
      type : route.type,
      route_name: route.name,
      route_extid: route.extId,
      time_start: moment(route.rtDate+" "+route.rtTime).unix(),
      time_end: 0,
      main_tags: 1,
      tags: "1,2,3",
      tags_intensity: "0.3, 0.6, 0.94"
    }
  const sqlQuery = `INSERT INTO ${global.tables.routes} (type, route_name, route_extid, time_start, time_end, main_tags, tags, tags_intensity) VALUES($1, $2, $3, $4,$5,$6,$7,$8) RETURNING id`
  console.log(sqlQuery);
  global.instance.query(sqlQuery,  Object.values(insertObj), function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve(result.rows)
    }
  })
}

  return deferred.promise
}
