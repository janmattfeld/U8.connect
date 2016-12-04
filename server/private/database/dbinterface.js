'use strict'
const dbPath = './postgres'
const sample = require( __dirname + '/dbconfig.json').postgres

//import necessary modules
const global = require( dbPath + '/global.js')
const users = require( dbPath + '/users.js')
const tags = require( dbPath + '/tags.js')
const routes = require( dbPath + '/routes.js')

module.exports = {
  init: () => {
    return global.init().then(() => {
      // sample.boards.forEach(board.insert)
    })
  },
  getUser: users.get,  // @Param (userId)
  addUser: users.insert,  // @Param (user)
  search: users.search,
  updateGeo: users.updateGeo,  // @Param (user)
  getTags: tags.get,  // @Param (userId)
  addTags: tags.insert,  // @Param (user)
  getRoutes: routes.get,  // @Param (userId)
  addRoutes: routes.insert,  // @Param (user)
}
