var http = require("http");
var querystring = require('querystring');
var request = require('request');
var q = require('q');

module.exports = {
  postTester: postTester
}

/*var user = querystring.stringify({
      first_name: "Alex",
      last_name: "Derulo",
      nick_name: "alex979k",
      sex: "0",
      email: "alexander.jagaciak@google.de",
      password: "12345",
      registered_since: "1480804449",
      password: "12345",
      birthday: "851036410",
      longterm_tags: "1,2,3,4,5,6,9",
      middleterm_tags: "5,6,9",
      longterm_tags: "1,2,3,4,7",
      shortterm_tags: "10,11",
      current_route: "2",
      lat: "52.525849",
      lon: "13.368928",
      last_geo_timestamp: "1480804615"
    });*/

/*var data = querystring.stringify({
  route_setup: "1,2,3",
  current_route: "1",
  lat: "52.525889",
  lon: "13.368987",
  last_geo_timestamp: "1480804619"
})*/

  /*  var data = querystring.stringify({
          tag_name: "linux",
          x: 7.0,
          y: 9.0,
          general_class: 0
        });
        */

        /*var routes = querystring.stringify({
                tag_name: "linux",
                x: 7.0,
                y: 9.0,
                general_class: 0
              });*/

              var data = querystring.stringify({
                    type: "ST",
                    route_name : "U Görlitzer Bahnhof (Berlin)",
                    route_extid : "009014101",
                    time_start : "",
                    time_end : "",
                    main_tags : "",
                    tags : "",
                    tags_intensity : ""
                    });


function postTester() {
  const deferred = q.defer()

  var string_=JSON.stringify(data);

  string_=string_.replace(/{/g, "");
  string_=string_.replace(/}/g, "");
  string_=string_.replace(/:/g, "=")
  string_=string_.replace(/,/g, "&");
  string_=string_.replace(/"/g, "");


  var finalString = "http://localhost:8080/routeStuff/?" + string_;
  request(finalString, function (error, response, body) {
      deferred.resolve(response) // Show the HTML for the Google homepage.
  });

  return deferred.promise

}
