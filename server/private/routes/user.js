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
const test = require('../../postTester')

module.exports = (app) => {
    app.get('/user/:userId', (req, res) => {
      const userId = req.params.userId;
        db.getUser(userId)
          .then( (result) => {
            res.json({"status":"200", "message": result });
          })
          .catch( (error) => {
            console.log(error)
            res.json({"status":"500", "message": error });
          })
    })

    app.get('/userPost', (req, res) => {
      console.log(req.query);
      const userInfo = req.query
        db.addUser(userInfo)
        .then( (result) => {
          res.json({"status":"200", "message": "User created", "id" : result });
        })
        .catch( (error) => {
          console.log(error)
          res.json({"status":"500", "message": error });
        })
    })

    app.get('/updateGeo/:userId', (req, res) => {
      const userId = req.params.userId;
      console.log(req.query);
      const userInfo = req.query
        db.updateGeo(userId, userInfo)
        .then( (result) => {
          res.json({"status":"200", "message": "Geo updated", "id" : result });
        })
        .catch( (error) => {
          console.log(error)
          res.json({"status":"500", "message": error });
        })
    })

    app.get('/searchForUsersWithId/:current_route', (req, res) => {
      const current_route = req.params.current_route;
      console.log(current_route);
        db.searchForUsersWithId(current_route)
        .then( (result) => {
          res.json({"status":"200", "message": "Geo updated", "id" : result });
        })
        .catch( (error) => {
          console.log(error)
          res.json({"status":"500", "message": error });
        })
    })

    app.get('/postTester', (req, res) => {
      test.postTester()
        .then( (result) => {
          res.json(JSON.parse(result.body))
        })
    })


}
