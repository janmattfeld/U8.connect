const db = require('../database/dbinterface')
const request = require('request');
const querystring = require('querystring');
const moment = require('moment');

const http = 'http://demo.hafas.de/openapi/vbb-proxy/trip?';
const searchStart = 'görlitzer';
const searchEnd = 'bundesplatz';
const originExtId = '009014102';
const destExtId = '009003201';
const bvg = '&format=json&accessId=BVG-VBB-Dezember';
var selectedStart;
var selectedEnd;

function updateSearchList (sString) {
    aLocationNames = [];
    aLocationNamesToGo = [];
    var tempLocation;
    var flag = 0;
    var counter = 0;
    var counter2 = 0;
    for (i=0; i<sString.length; i++) {
      sSearchString = sString[i];
      //console.log(sSearchString);
      var clienttime = 1480844370;//Date.now() / 1000; //Server timestamp used here for ease

      var date = sSearchString.Origin.rtDate;
      var time = sSearchString.Origin.rtTime;
      var origintime = moment(date+ " "+time).unix();

      date = sSearchString.Destination.rtDate;
      time = sSearchString.Destination.rtTime;
      var desttime = moment(date+ " "+time).unix();
            //console.log(desttime);
      if(clienttime > origintime && clienttime < desttime){
        flag = 1
        tempLocation = sSearchString.Origin;
      }
      else if(clienttime > origintime && clienttime > desttime && i < sString.length-1){
        flag = 1
      }

      if(clienttime < desttime){
        aLocationNamesToGo[counter] = sSearchString.Origin
        counter++;
      }
        aLocationNames[counter2] = sSearchString.Origin
        counter2++;
   }

   return {
          route_setup: aLocationNames,
          route_setup_to_go: aLocationNamesToGo,
          current_route: tempLocation
        }
}


function makeUrl(data){
  var string_=JSON.stringify(data);

  /*string_=string_.replace(/{/g, "");
  string_=string_.replace(/}/g, "");
  string_=string_.replace(/:/g, "=")
  string_=string_.replace(/,/g, "&");
  string_=string_.replace(/"/g, "");*/

  return string_;
}

module.exports = (app) => {
    app.get('/planer', (req, res) => {
      request(http + 'originExtId=' + originExtId + "&destExtId="+destExtId + bvg, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          trip = JSON.parse(body);
          retrievedRoutes = updateSearchList(trip.Trip[0].LegList.Leg)
          var finalString = "http://localhost:8080/routesStuffPost/?" +  makeUrl(retrievedRoutes);
          request(finalString, function (error, response, body) {
            //console.log(response);
          });

          res.json(retrievedRoutes)


        }
      })
    })

}
