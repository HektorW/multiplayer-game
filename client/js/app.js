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
      _.bindAll(this, 'update');

      this.spriteBatch = new SpriteBatch(document.getElementById('canvas'));

      this.circle = new DrawableCircle(this.spriteBatch, 200, 200);
    },


    update: function(time) {
      requestAnimationFrame(this.update);

      this.spriteBatch.clear(Colors.aqua);

      this.circle.draw();
    }

  };

  return App;
});