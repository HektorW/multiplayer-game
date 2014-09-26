
var express = require('express');
// var io = require('socket.io');

var app = express();


// server static files from client
app.use(express.static('../client'));

app.listen(8080);