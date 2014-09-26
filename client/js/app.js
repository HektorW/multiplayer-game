define([
  'spritebatch'
], function(
  SpriteBatch
) {

  var App = {
    spriteBatch: null,

    run: function() {
      this._init();

      this.update(performance.now());
    },

    _init: function() {
      // bind functions
      this.update = this.update.bind(this);

      var canvas = document.getElementById('canvas');
      this.spriteBatch = new SpriteBatch(canvas);
    },


    update: function(time) {
      requireAnimationFrame(this.update);

    }

  };

  return App;
});