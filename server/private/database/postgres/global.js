'use strict'
const config = require( __dirname + '/../dbconfig.json').postgres

const db  = require('pg')
const q   = require('q')

//Tables
let tables = {
  users: config.database + '.Users',
  tags: config.database + '.Tags',
  routes: config.database + '.Routes'
}

module.exports = {
  init: setupDatabase,
  instance: null,
  tables: tables
}

function connect() {
  var deferred = q.defer()
  console.log('Trying to connect...')
  console.log('Waiting')
  console.log(config.url)
  db.defaults.ssl = true
  db.connect(config.url, function(err, client) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      deferred.reject(err)
    } else {
      module.exports.instance = client
      console.log('Connected to postgres!')
      deferred.resolve()
    }
  });

  return deferred.promise
}

function createDatabase(){
  const deferred = q.defer()

  const query = pg.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
  query.on('end', () => { client.end(); });
  deferred.resolve()

  return deferred.promise

}

function createUsersTable() {
  // TODO: Replace long type with DateTime
  return createTable(tables.users, [
    'id int KEY AUTO_INCREMENT',
    'first_name text',
    'last_name text',
    'nick_name text',
    'sex int',
    'email text',
    'password text',
    'registered_since long',
    'birthday long',
    'longterm_tags text',
    'middleterm_tags text',
    'shortterm_tags text',
    'current_route text'
  ])
}

function createTagsTable() {
  return createTable(tables.tags, [
    'id int KEY AUTO_INCREMENT',
    'tag_name varchar(128)'
  ])
}

function createRoutesTable() {
  // TODO: Replace long type with DateTime
  return createTable(tables.routes, [
    'id int KEY AUTO_INCREMENT',
    'vehicle_name text',
    'route_name text',
    'time_start long',
    'time_end long',
    'tags text',
    'tags_amount text'
  ])
}

function createTable(tableName, columns){
  const deferred = q.defer()
  const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columns.join(',\n')}
  )`
  pg.query(tableQuery, (err, result) => {
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
      return pg
    })
    .catch((err) => {
      console.error("Database Error: ", err)
    })
}
