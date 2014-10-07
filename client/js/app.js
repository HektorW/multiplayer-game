define([
  'underscore',

  'utils/spritebatch',
  'utils/colors',
  'utils/settings',
  'utils/ping',

  'shared/Timestamp',


  'managers/NetworkManager',

  'controls/keyboard',

  'objects/UserControlableCircle'
], function(
  _,

  SpriteBatch,
  Colors,
  Settings,
  Ping,

  Timestamp,


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
      _.bindAll(this, 'update', 'resize', 'onState', 'onConnect', 'onDisconnect', 'onGameStart');

      this.spriteBatch = new SpriteBatch(document.getElementById('canvas'));

      Settings.init();
      Settings.on('values.updated', function() {
        NetworkManager.send('settings', Settings.values);
      });

      NetworkManager.init();
      NetworkManager.on('connect', this.onConnect);
      NetworkManager.on('disconnect', this.onDisconnect);
      NetworkManager.on('state', this.onState);
      NetworkManager.on('game.start', this.onGameStart);

      Ping.init();

      this.initDOM();

      Settings.trigger('values.updated');
    },

    initDOM: function() {
      window.addEventListener('resize', this.resize);
    },

    onConnect: function() {
      this.circle = new UserControlableCircle(this.spriteBatch, 0, 0, 0, Colors.navy);
      NetworkManager.send('setup', {
        screenWidth: this.spriteBatch.width,
        screenHeight: this.spriteBatch.height
      });

      Settings.gui.open();
    },
    onDisconnect: function() {
      this.circle = null;
      Settings.gui.close();
    },

    onState: function(state) {
      this.circle.handleState(state);
    },

    onGameStart: function() {
      this.previousTimestamp = Timestamp.create();
    },


    resize: function() {
      this.spriteBatch.resize();
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