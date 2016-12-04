const db = require('../database/dbinterface')
const request = require('request');
const http = 'http://demo.hafas.de/openapi/vbb-proxy/trip?';
const searchStart = 'görlitzer';
const searchEnd = 'bundesplatz';
const originExtId = '009014102';
const destExtId = '009003201';
const bvg = '&format=json&accessId=BVG-VBB-Dezember';
var selectedStart;
var selectedEnd;

/*function updateSearchList (sSearchString, sListName) {
  this.searchLocations(sSearchString).then((aLocations) => {
    aLocationNames = [];
    for (i=0; i<aLocations.length; i++) {
      aLocationNames[i] = aLocations[i].StopLocation.name;
   }
   if (sListName == "origin") {
     //routes.push({origins: aLocationNames});
     console.log(aLocationNames);
   } else if (sListName == "destination") {
        //routes.push({destinations: aLocationNames));
      }
}
}
}*/


module.exports = (app) => {
    app.get('/planer', (req, res) => {
      request(http + 'originExtId=' + originExtId + "&destExtId="+destExtId + bvg, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage.

          trip = JSON.parse(body);
          console.log(trip.stopLocationOrCoordLocation)
          //updateSearchList(trip.stopLocationOrCoordLocation)


          res.json(trip.stopLocationOrCoordLocation)
        }
      })
      request(http + searchEnd + bvg, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage.
          selectedEnd = JSON.parse(body);
          res.json(selectedEnd)
        }
      })
    })

}
