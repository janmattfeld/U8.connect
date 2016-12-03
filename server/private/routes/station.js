const db = require('../database/dbinterface')
const request = require('request');
const http = 'http://demo.hafas.de/openapi/vbb-proxy/location.name?input=';
const bvg = '&format=json&accessId=BVG-VBB-Dezember';
var selectedStart;
var selectedEnd;

module.exports = (app) => {
    app.get('/station', (req, res) => {
      var searchString = req.query.search

      request(http + searchString + bvg, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage.
          selectedStart = JSON.parse(body);
          res.json(selectedStart)
        }
      })

    })
}
