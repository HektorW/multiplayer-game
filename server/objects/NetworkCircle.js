
var _ = require('underscore');
var BaseCircle = require('../../shared/BaseCircle.js');

var NetworkCircle = BaseCircle.extend({

  __init__: function(game, socket) {
    _.bindAll(this, 'update', 'onInput', 'onSetup');
    this.supr(0, 0, 50);

    this.game = game;

    this.socket = socket;
    this.velocity = 100;

    this.screenWidth = 0;
    this.screenHeight = 0;


    this.pendingStates = [];


    socket.on('command.input', this.onInput);
    socket.on('setup', this.onSetup);

    socket.on('ping', function() { socket.emit('pong'); });
  },

  setup: function() {
    this.handleState({
      position: {
        x: this.screenWidth / 2,
        y: this.screenHeight / 2
      }
    });
  },

  onInput: function(data) {

    if (this.game.reconciliation) {
      this.socket.emit('state.acknowledged', data);
    }


    this.handleState(data);
  },

  onSetup: function(data) {
    this.screenWidth = data.screenWidth;
    this.screenHeight = data.screenHeight;

    this.setup();
  },

  update: function(timestamp) {
    this.supr(timestamp);
  }
});



module.exports = NetworkCircle;

