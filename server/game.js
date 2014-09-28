
var Classy = require('../shared/libs/classy.js');
var _ = require('underscore');



var Game = Classy.extend({
  __init__: function() {},

  newConnection: function(socket) {
    new Connection(socket);
  }
});



var Connection = Classy.extend({
  __init__: function(socket) {
    _.bindAll(this, 'update', 'onDisconnect', 'onSetup');

    this.socket = socket;
    this.interval = 500;

    this.socket.on('setup', this.onSetup);
  },

  onSetup: function(data) {
    this.screenWidth = data.screenWidth;
    this.screenHeight = data.screenHeight;
    this.intervalId = setInterval(this.update, this.interval);
  },

  onDisconnect: function() {
    clearInterval(this.intervalId);
  },

  update: function() {
    this.socket.emit('state', {
      radius: 50,
      x: (Math.random() * this.screenWidth),
      y: (Math.random() * this.screenHeight)
    });
  },
});



module.exports = new Game();