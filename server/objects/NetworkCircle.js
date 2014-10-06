
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

    this.lastKnownState = null;


    socket.on('command.input', this.onInput);
    socket.on('setup', this.onSetup);

    socket.on('ping', function() { socket.emit('pong'); });
  },

  setup: function() {
    var state = this.lastKnownState = {
      position: {
        x: this.screenWidth / 2,
        y: this.screenHeight / 2
      }
    };

    this.handleState(state);
  },

  onInput: function(data) {
    if (this.game.reconciliation) {
      // first we set a state to the last known
      var lastState = this.lastKnownState;
      var elapsedTime = Timestamp.create(lastState.timestamp, data.timestamp);

      this.handleState(lastState);
      this.update(elapsedTime);

      // now we have the state where we apply the input
      var onInputState = this.getState();
      elapsedTime = Timestamp.create(data.timestamp, this.game.lastTimestamp);
      this.handleState(data);
      this.update(elapsedTime);

      var acknowledgedState = onInputState;
      acknowledgedState.timestamp = data.timestamp;

      this.socket.emit('state.acknowledged', acknowledgedState);
    } else {
      this.handleState(data);
    }
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

