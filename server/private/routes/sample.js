/**
 * /sample
 *
 * Sample Route
 *
 * All routes have to expose a function to Standard module.exports that takes the express-app as an argument
 *
 * File-Handling:
 * Each Route has its own file, that takes care of all necessary Requests to this Route (GET / POST / DELETE / PUT ...)
 *
 * Naming:
 * Route: /some/important/route => Filename: some-important-route.js
 */

const db = require('../database/dbinterface')

module.exports = (app) => {
    app.get('/users', (req, res) => {
      const userId = 1;
        db.getUser(userId)
          .then( (result) => {
            res.send(result)
          })
    })
}
