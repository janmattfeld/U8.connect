'use strict'
const dbPath = './mysql'
const sample = require( __dirname + '/dbconfig.json').postgres

//import necessary modules
const global = require( dbPath + '/global.js')
const board = require( dbPath + '/board.js')

module.exports = {
  init: () => {
    return global.init().then(() => {
      // sample.boards.forEach(board.insert)
    })
  },
  getBoards: board.get,  // @Param (project_id)
  addBoard: board.insert,  // @Param (board)
}
