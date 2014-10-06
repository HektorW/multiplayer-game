'use strict'

var _ = require('underscore');

var Classy = require('../shared/libs/classy.js');
var Timestamp = require('../shared/Timestamp.js');

var NetworkCircle = require('./objects/NetworkCircle.js');



var Game = Classy.extend({
  __init__: function() {
    _.bindAll(this, 'update', 'start', 'stop', 'socketDisconnect', 'onSettings');

    this.networkCircles = {};

    this.updateFrequencyMs = 1000 / 1;
    this.latency = 300;
    this.reconciliation = false;
  },

  socketConnect: function(socket) {
    this.networkCircles[socket.id] = new NetworkCircle(this, socket);

    socket.on('disconnect', _.bind(function() { this.socketDisconnect(socket); }, this));
    socket.on('settings', this.onSettings);
    socket.on('restart', this.start);

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

  onSettings: function(data) {
    this.updateFrequencyMs = 1000 / Math.max(data.serverfps, 1);
    this.latency = data.latency;
    this.reconciliation = data.reconciliation;

    this.start();

    console.log('settings updated. restarting loop with new settings.', JSON.stringify(data));
  },


  start: function() {
    this.stop();
    this.intervalId = setInterval(this.update, this.updateFrequencyMs);

    _.each(this.networkCircles, function(networkCircle) {
      networkCircle.setup();
      networkCircle.socket.emit('game.start', {
        time: 0
      });
    });
  },

  stop: function() {
    clearInterval(this.intervalId);
  },


  update: function() {
    var timestamp = Timestamp.create(this.lastTimestamp);

    _.each(this.networkCircles, function(networkCircle, id) {

      networkCircle.update(timestamp);

      setTimeout(function() {

        networkCircle.socket.emit('state', {
          state: networkCircle.getState(),
          timestamp: timestamp
        });

      }, this.latency);

    }, this);

    this.lastTimestamp = timestamp;
  }
});


module.exports = new Game();