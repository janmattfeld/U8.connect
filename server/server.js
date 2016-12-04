// -----------
// EXPRESS SETUP
// -----------
var path         = require('path');
var express      = require('express');
var bodyParser      = require('body-parser');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port         = isDeveloping ? 8080 : process.env.PORT;
var app          = express();
var router       = require('./private/router.js')(app)
const db         = require('./private/database/dbinterface')
// app.use(bodyParser.urlencoded({
//   extended: false
// }))

// app.use(bodyParser.json())

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

db.init()
  .then(() => {
    app.listen(port, '0.0.0.0', function onStart(err) {
      if (err) {
        console.error(err);
      }
      console.info('==> 🌎 Listening on port %s.', port);
    });
  })
