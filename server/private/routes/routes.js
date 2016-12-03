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
    app.get('/getRoutes', (req, res) => {
      const tags = req.params.routes;
        db.getTags(tags)
        .then( (result) => {
          res.json({"status":"200", "message": result });
        })
        .catch( (error) => {
          console.log(error)
          res.json({"status":"500", "message": error });
        })
    })

    app.get('/addRoutes', (req, res) => {
      const tags = req.body;
        db.addRoutes(routes)
        .then( (result) => {
          res.json({"status":"200", "message": "Route added", "ids" : result });
        })
        .catch( (error) => {
          console.log(error)
          res.json({"status":"500", "message": error });
        })
    })
}
