define([
  'underscore',

  'spritebatch',
  'colors',

  'DrawableCircle'
], function(
  _,

  SpriteBatch,
  Colors,

  DrawableCircle
) {

  var App = {
    spriteBatch: null,

    run: function() {
      this._init();

      this.update(performance.now());
    },

    _init: function() {
      _.bindAll(this, 'update', 'stateReceived');

      this.spriteBatch = new SpriteBatch(document.getElementById('canvas'));


      // Socket
      var socket = this.socket = io.connect();
      socket.on('connect', _.bind(function() { socket.emit('setup', { screenWidth: this.spriteBatch.width, screenHeight: this.spriteBatch.height }); }, this));
      socket.on('state', this.stateReceived);
    },

    stateReceived: function(data) {
      if (!this.circle) {
        this.circle = new DrawableCircle(this.spriteBatch, 0, 0, 0, Colors.green);
      }

      this.circle.handleState(data);
    },

    update: function(time) {
      requestAnimationFrame(this.update);

      this.spriteBatch.clear(Colors.aqua);

      if (this.circle) {
        this.circle.draw();
      }
    }
  };

  return App;
});