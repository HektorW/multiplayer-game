
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var Game = require('./game.js');


var expressApp = express();
var server = http.Server(expressApp);
var io = socketio(server);

// server static files from client
expressApp.use(express.static('../client'));
expressApp.use('/shared', express.static('../shared'));




io.on('connection', function(socket) {
  Game.newConnection(socket);
});





server.listen(8080);