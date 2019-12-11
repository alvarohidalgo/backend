var http = require('http');
var path = require('path');
var express = require('express');
var Routing = require('./requestRouting.js');

var PORT = 8080;
var app = express();

var Server = http.createServer(app);

app.use(express.static(__dirname + "/../public"));
app.use('/', Routing);

Server.listen(PORT, function() {
  console.log('Server is listening ON port: ' + PORT);
});
