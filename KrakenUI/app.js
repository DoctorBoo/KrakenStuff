"use strict";
var express = require('express');
var routes = require('./routes/index');
var http = require('http');
var path = require('path');
var app = express();
// curl -k https://localhost:8000/
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('routes/key.pem', 'utf8'),
    cert: fs.readFileSync('routes/key-cert.pem', 'utf8')
};
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/bb', routes.bb);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
https.createServer(options, app, function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end();
}).listen(44304);
//# sourceMappingURL=app.js.map