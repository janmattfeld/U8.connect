'use strict'
const dbPath = './postgres'
const sample = require( __dirname + '/dbconfig.json').postgres

//import necessary modules
const global = require( dbPath + '/global.js')
const users = require( dbPath + '/users.js')

module.exports = {
  init: () => {
    return global.init().then(() => {
      // sample.boards.forEach(board.insert)
    })
  },
  getUser: users.get,  // @Param (userId)
  addUser: users.insert,  // @Param (user)
}
