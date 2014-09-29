
var _ = require('underscore');
var BaseCircle = require('../../shared/BaseCircle.js');

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
        x: data.screenWidth / 2,
        y: data.screenHeight / 2
      }
    });
  },

  update: function(timestamp) {
    this.supr(timestamp);
  }
});



module.exports = NetworkCircle;

