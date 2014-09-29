define([
  'underscore',
  'events',

  'socket.io'
], function(
  _,
  Events,

  io
) {
  
  var NetworkManager = {
    init: function() {
      this.latency = 300;

      this.socket = io.connect();

      this.setupSocket();
    },

    setupSocket: function() {
      var socket = this.socket;

      socket.on('connect', _.bind(this.onConnect, this));
      socket.on('state', _.bind(this.onState, this));
    },

    onConnect: function() {
      console.log('connected');
      this.trigger('connect');
    },

    onState: function(data) {
      this.trigger('state', data.state);
    },

    sendCommand: function(type, command) {
      setTimeout(_.bind(function() {
        this.socket.emit('command.' + type, command);
      }, this), this.latency);
    },

    send: function(event, data) {
      this.socket.emit(event, data);
    }
  };

  _.extend(NetworkManager, Events);

  return NetworkManager;
});