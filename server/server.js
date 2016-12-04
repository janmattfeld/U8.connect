// -----------
// EXPRESS SETUP
// -----------
var path         = require('path');
var express      = require('express');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port         = isDeveloping ? 8082 : process.env.PORT;
var app          = express();
var router       = require('./private/router.js')(app)
const db         = require('./private/database/dbinterface')

// db.init()
//   .then(() => {
    app.listen(port, '0.0.0.0', function onStart(err) {
      if (err) {
        console.error(err);
      }
      console.info('==> 🌎 Listening on port %s.', port);
    });
  // })
