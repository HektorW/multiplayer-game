define([
  'underscore',

  'spritebatch',
  'colors',

  'shared/Timestamp',

  'settings',

  'managers/NetworkManager',

  'controls/keyboard',

  'objects/UserControlableCircle'
], function(
  _,

  SpriteBatch,
  Colors,

  Timestamp,

  Settings,

  NetworkManager,

  Keyboard,

  UserControlableCircle
) {

  var App = {
    spriteBatch: null,

    run: function() {
      this.init();

      this.update(performance.now());
    },

    init: function() {
      _.bindAll(this, 'update', 'onState');

      this.spriteBatch = new SpriteBatch(document.getElementById('canvas'));
      Settings.init();

      NetworkManager.init();

      NetworkManager.on('state', this.onState);
    },

    onState: function(state) {
      if (!this.circle) {
        this.circle = new UserControlableCircle(this.spriteBatch, 0, 0, 0, Colors.navy);
        NetworkManager.send('setup', {
          screenWidth: this.spriteBatch.width,
          screenHeight: this.spriteBatch.height
        });
      }

      this.circle.handleState(state);
    },

    update: function() {
      requestAnimationFrame(this.update);

      var timestamp = Timestamp.create(this.previousTimestamp);

      Keyboard.getInstance().update();

      this.spriteBatch.clear(Colors.olive);

      if (this.circle) {
        this.circle.update(timestamp);
        this.circle.draw();
      }

      this.previousTimestamp = timestamp;
    }
  };

  return App;
});