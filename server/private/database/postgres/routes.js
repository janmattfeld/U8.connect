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
  var g_ids = [];
  const deferred = q.defer()
//  console.log(routes);
/*  for(i=0;i<routes.route_setup.length;i++)
  {*/
  //  var route = routes.route_setup[i];

  var insertObj = {
      type : 'ST',//route.type,
      route_name: 'Alexanderplatz',//route.name,
      route_extid: '9100001',//route.extId,
      time_start: Math.round(Date.now()/1000),//moment(route.rtDate+" "+route.rtTime).unix(),
      time_end: 0,
      main_tags: '1',
      tags: '1,2,3',
      tags_intensity: '0.3, 0.6, 0.94'
    }

  var values =  Object.values(insertObj)
  const sqlSearch = `SELECT * FROM ${global.tables.routes} WHERE route_extid = ` + values[2] + ` AND time_start = ` + values[3]
  global.instance.query(sqlSearch, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result.rows.length == 0) {
    } else {
      console.log("HEY");
      g_ids.push(result);
    }
  })


  const sqlQuery = `INSERT INTO ${global.tables.routes} (type, route_name, route_extid, time_start, time_end, main_tags, tags, tags_intensity) VALUES($1, $2, $3, $4,$5,$6,$7,$8) RETURNING id`
  global.instance.query(sqlQuery, values, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result.rows.length == 0) {
      deferred.resolve(g_ids);
    } else {
      //console.log(g_ids);
      g_ids.push(result);
      deferred.resolve(g_ids);
    }
  })

  return deferred.promise
}
