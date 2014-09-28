
var _ = require('underscore');

var Classy = require('../shared/libs/classy.js');
var BaseCircle = require('../shared/BaseCircle.js');
var Timestamp = require('../shared/Timestamp.js');



var Game = Classy.extend({
  __init__: function() {
    _.bindAll(this, 'update', 'start', 'stop', 'socketDisconnect');

    this.networkCircles = {};

    this.updateFrequencyMs = 1000 / 10;
    this.latency = 300;
  },

  socketConnect: function(socket) {
    this.networkCircles[socket.id] = new NetworkCircle(this, socket);

    socket.on('disconnect', _.bind(function() { this.socketDisconnect(socket); }, this));

    if (_.keys(this.networkCircles).length === 1) {
      this.start();
    }
  },

  socketDisconnect: function(socket) {
    delete this.networkCircles[socket.id];
    if (_.isEmpty(this.networkCircles)) {
      this.stop();
    }
  },


  start: function() {
    this.intervalId = setInterval(this.update, this.updateFrequencyMs);
  },

  stop: function() {
    clearInterval(this.intervalId);
  },


  update: function() {
    var timestamp = Timestamp.create(this.previousTimestamp);

    _.each(this.networkCircles, function(networkCircle, id) {

      networkCircle.update(timestamp);
      setTimeout(function() {
        networkCircle.socket.emit('state', {
          state: networkCircle.getState()
        });
      }, this.latency);

    }, this);

    this.previousTimestamp = timestamp;
  }
});



var NetworkCircle = BaseCircle.extend({

  __init__: function(game, socket) {
    _.bindAll(this, 'update', 'onInput', 'onSetup');
    this.supr(0, 0, 50);

    this.socket = socket;
    this.velocity = 100;

    socket.on('command.input', this.onInput);
    socket.on('setup', this.onSetup);
  },

  onInput: function(data) {
    this.handleState({
      direction: {
        x: data.x,
        y: data.y
      }
    });
  },

  onSetup: function(data) {
    this.handleState({
      position: {
        x: data.screenWidth / 2 - this.radius,
        y: data.screenHeight / 2 - this.radius
      }
    });
  },

  update: function(timestamp) {
    this.supr(timestamp);
  }
});



module.exports = new Game();