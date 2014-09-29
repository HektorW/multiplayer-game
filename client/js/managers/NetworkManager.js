define([
  'underscore',
  'events',

  'socket.io',

  'utils/settings'
], function(
  _,
  Events,

  io,

  Settings
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
      socket.on('disconnect', _.bind(this.onDisconnect, this));
      socket.on('state', _.bind(this.onState, this));
      socket.on('time.reset', _.bind(this.onTimeReset, this));
    },

    onConnect: function() {
      console.log('connected');
      this.trigger('connect');
    },

    onDisconnect: function() {
      console.log('disconnected');
      this.trigger('disconnect');
    },

    onState: function(data) {
      this.trigger('state', data.state);
    },

    onTimeReset: function(data) {
      this.trigger('time.reset', data);
    },

    sendCommand: function(type, command) {
      setTimeout(_.bind(function() {
        this.socket.emit('command.' + type, command);
      }, this), Settings.values.latency);
    },

    send: function(event, data) {
      this.socket.emit(event, data);
    },

    onMessage: function(event, callback) {
      this.socket.on(event, callback);
    }
  };

  _.extend(NetworkManager, Events);

  return NetworkManager;
});