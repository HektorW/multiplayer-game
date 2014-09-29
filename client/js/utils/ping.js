define([
  'underscore',
  'events',

  'shared/Timestamp',

  'utils/colors',

  'managers/NetworkManager'
], function(
  _,
  Events,

  Timestamp,

  Colors,

  NetworkManager
) {
  
  var Ping = {

    intervalMS: 1000,

    init: function() {
      _.bindAll(this, 'send', 'onPong', 'onConnect', 'onDisconnect');

      // dom
      this.el = document.createElement('div');
      this.el.style.position = 'fixed';
      this.el.style.left = '0px';
      this.el.style.top = '0px';
      this.el.style.padding = '4px';
      this.el.style.background = Colors.black;
      this.el.style.color = Colors.yellow;

      this.el.innerHTML = 'ping: ';
      this.outputEl = this.el.appendChild(document.createElement('span'));
      this.outputEl.innerHTML = '-';



      document.body.appendChild(this.el);

      NetworkManager.onMessage('pong', this.onPong);

      NetworkManager.on('connect', this.onConnect);
      NetworkManager.on('disconnect', this.onDisconnect);

      return this;
    },


    onConnect: function() {
      this.el.style.color = Colors.lime;
      this.send();
    },

    onDisconnect: function() {
      this.el.style.color = Colors.red;
      this.outputEl.innerHTML = '-';
    },


    send: function() {
      NetworkManager.send('ping');
      this.pingTime = Timestamp.now();
    },

    onPong: function() {
      var ping = Timestamp.now() - this.pingTime;
      this.outputEl.innerHTML = ping + 'ms';

      this.trigger('ping', ping);

      setTimeout(this.send, this.intervalMS - ping);
    }
  };

  _.extend(Ping, Events);

  return Ping;
});