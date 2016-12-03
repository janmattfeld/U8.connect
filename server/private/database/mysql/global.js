'use strict'
const config = require( __dirname + '/../dbconfig.json').postgres

const db  = require('mysql')
const q   = require('q')

//Instance variable
var mysql = db.createPool({
  host     : config.host,
  user     : config.user
})

//Tables
let tables = {
  project: config.database + '.Project',
  board: config.database + '.Board',
}

module.exports = {
  init: setupDatabase,
  instance: mysql,
  tables: tables
}

function createDatabase(){
  const deferred = q.defer()

  mysql.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`, function(err, result){
    if(err){

      console.log(err)
      deferred.reject(err)
    }else{
      deferred.resolve()
    }
  })

  return deferred.promise
}

function createProjectTable() {
  return createTable(tables.project, [
    'id int KEY AUTO_INCREMENT',
    'title varchar(128)',
    'description text',
  ])
}

function createBoardTable() {
  // TODO: Replace long type with DateTime
  return createTable(tables.board, [
    'id int KEY AUTO_INCREMENT',
    'title varchar(128)',
    'project_id int',
    'description text',
    'creation_user int',
    'creation_date long',
    'last_modified long',
    'vs_session_key varchar(300)',
    'vs_session_date long',
  ])
}

function createTable(tableName, columns){
  const deferred = q.defer()
  const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columns.join(',\n')}
  )`
  mysql.query(tableQuery, (err, result) => {
    if (err) {
      deferred.reject(err)
    } else {
      deferred.resolve()
    }
  })
  return deferred.promise
}

function setupDatabase () {
  return createDatabase()
    .then(createProjectTable)
    .then(createBoardTable)
    .then(() => {
      console.info("Connected to Database")
      return mysql
    })
    .catch((err) => {
      console.error("Database Error: ", err)
    })
}
