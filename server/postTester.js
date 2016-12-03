var http = require("http");
var querystring = require('querystring');

module.exports = {
  postTester: postTester
}

var options = {
  hostname: 'localhost',
  port: 8080,
  path: '/user',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var data = querystring.stringify({
      first_name: "Alex",
      last_name: "Banane",
      email: "alexander.jagaciak@banane.de",
      longterm_tags: "1,2,3,4,5,6,9"
    });

function postTester(userId) {
var req = http.request(options, function(res) {
  console.log('Status: ' + res.statusCode);
  console.log('Headers: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (body) {
    console.log('Body: ' + body);
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write(data);
req.end();
}
