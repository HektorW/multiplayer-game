define([
  'underscore',

  'utils/spritebatch',
  'utils/colors',
  'utils/settings',
  'utils/ping',
  'utils/output',

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
  Output,

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
      _.bindAll(this, 'update', 'resize', 'onState', 'onConnect', 'onDisconnect', 'onGameStart', 'requestRestart');

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

      // Ping.init();
      Output.init();

      this.initDOM();

      Settings.on('restart', this.requestRestart);
      Settings.trigger('values.updated');
    },

    initDOM: function() {
      window.addEventListener('resize', this.resize);
    },

    requestRestart: function() {
      NetworkManager.send('restart');
    },

    onConnect: function() {
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
      this.circle.handleServerState(state);
    },

    onGameStart: function() {
      this.previousTimestamp = Timestamp.create();
      this.circle = new UserControlableCircle(this.spriteBatch, 0, 0, 0, Colors.navy);
    },


    resize: function() {
      this.spriteBatch.resize();
    },

    update: function() {
      requestAnimationFrame(this.update);

      var timestamp = Timestamp.create(this.previousTimestamp);

      if (timestamp.elapsedMs < (1000 / Settings.values.clientfps)) return;

      Output.fixed('totaltime', 'totaltime: ' + (timestamp.total / 1000).toFixed(2));

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