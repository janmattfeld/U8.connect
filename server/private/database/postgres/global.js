'use strict'
const config = require( __dirname + '/../dbconfig.json').postgres

const pg  = require('pg')
const q   = require('q')

//Tables
let tables = {
  users: 'Users',
  tags: 'Tags',
  routes: 'Routes'
}

module.exports = {
  init: setupDatabase,
  instance: null,
  tables: tables
}


var client = new pg.Client(config.url)

function connect() {
  var deferred = q.defer()
  console.info('Trying to connect...')
  console.log('Waiting')
  console.log(config.url)


  // connect to our database
  client.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      deferred.reject(err)
    } else {
      console.log('Connected to postgres!')
      module.exports.instance = client
      deferred.resolve()
    }
  });

  return deferred.promise
}

function createDatabase(){
  const deferred = q.defer()

  /*const query = client.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
  query.on('end', () => { client.end(); });*/
  deferred.resolve()

  return deferred.promise

}

function createUsersTable() {
  // TODO: Replace long type with DateTime
  return createTable(tables.users, [
  'id serial',
  'first_name text',
  'last_name text',
  'nick_name text',
  'sex smallint',
  'email text',
  'password text',
  'registered_since integer',
  'birthday integer',
  'longterm_tags text',
  'middleterm_tags text',
  'shortterm_tags text',
  'current_route text',
  'lat float',
  'lon float',
  'last_geo_timestamp integer'
  ])
}

function createTagsTable() {
  return createTable(tables.tags, [
    'id serial',
    'tag_name varchar(128)',
    'x integer',
    'y integer',
    'general_class integer'
  ])
}

function createRoutesTable() {
  // TODO: Replace long type with DateTime
  return createTable(tables.routes, [
    'id serial',
    'type text',
    'route_name text',
    'route_extid text',
    'time_start integer',
    'time_end integer',
    'main_tags text',
    'tags text',
    'tags_intensity text'
  ])
}

function createTable(tableName, columns){
  const deferred = q.defer()
  const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columns.join(',\n')}
  )`
  console.log(tableQuery);
  client.query((tableQuery), (err, result) => {
    if (err) {
      deferred.reject(err)
    } else {
      deferred.resolve()
    }
  })

  return deferred.promise
}

function setupDatabase () {
  return connect()
    .then(createDatabase)
    .then(createUsersTable)
    .then(createTagsTable)
    .then(createRoutesTable)
    .then(() => {
      console.info("Connected to Database")
    })
    .catch((err) => {
      console.error("Database Error: ", err)
    })
}
