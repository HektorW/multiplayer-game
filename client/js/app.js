define([
  'underscore',

  'spritebatch',
  'colors',

  'managers/NetworkManager',

  'controls/keyboard',

  'objects/UserControlableCircle'
], function(
  _,

  SpriteBatch,
  Colors,

  NetworkManager,

  Keyboard,

  UserControlableCircle
) {

  var App = {
    spriteBatch: null,

    run: function() {
      this._init();

      this.update(performance.now());
    },

    _init: function() {
      _.bindAll(this, 'update', 'onState');

      this.spriteBatch = new SpriteBatch(document.getElementById('canvas'));

      NetworkManager.init();

      NetworkManager.on('state', this.onState);
    },

    onState: function(state) {
      if (!this.circle) {
        this.circle = new UserControlableCircle(this.spriteBatch, 0, 0, 0, Colors.navy);
        NetworkManager.emit('setup', {
          screenWidth: this.spriteBatch.width,
          screenHeight: this.spriteBatch.height
        });
      }

      this.circle.handleState(state);
    },

    update: function(time) {
      requestAnimationFrame(this.update);

      Keyboard.getInstance().update();

      this.spriteBatch.clear(Colors.olive);

      if (this.circle) {
        this.circle.update();
        this.circle.draw();
      }
    }
  };

  return App;
});