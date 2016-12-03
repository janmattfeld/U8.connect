'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')
const mysql = require('mysql')

module.exports = {
  get: getBoards,
  insert: insertBoard,
}

function getBoards(projectId) {
  const deferred = q.defer()
  let query = `SELECT * FROM ${global.tables.board}  WHERE project_id=?`
  global.instance.query(query, projectId, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result) {
      deferred.resolve(result)
    }
  })
  return deferred.promise
}

function insertBoard(board) {
  const deferred = q.defer()
  const sqlQuery = `INSERT INTO ${global.tables.board} SET ?`
  global.instance.query(sqlQuery, board, function (err, result) {
    if (err) {
      console.info(sqlQuery, ' -> ', mysql.escape(board))
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve()
    }
  })
  return deferred.promise
}
