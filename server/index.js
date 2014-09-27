
var express = require('express');
// var io = require('socket.io');

var BaseCircle = require('../shared/BaseCircle.js');
new BaseCircle();

var app = express();


// server static files from client
app.use(express.static('../client'));
app.use('/shared', express.static('../shared'));

app.listen(8080);