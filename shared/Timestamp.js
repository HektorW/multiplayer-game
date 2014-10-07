(function(depencies, factory) {
  var i, args = [];
  if (typeof define !== 'undefined' && define.amd) {
    for (i = 0; i < depencies.length; i++) {
      depencies[i] = 'shared/' + depencies[i];
    }
    define(depencies, factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    for (i = 0; i < depencies.length; i++) {
      args[i] = require('./' + depencies[i] + '.js');
    }
    module.exports = factory.apply(this, args);
  }
}(




//
// Timestamp
//
[], function() {
  var Timestamp = {
    now: function() {
      return Date.now();
    },

    /*create: function(previous) {
      var now = Timestamp.now();

      if (!previous) {
        previous = {
          time: now,
          tick: 0,
          elapsedMs: 0,
          total: 0
        };
      }
      var elapsedMs = now - previous.time;
      var total = previous.total + elapsedMs;

      return {
        time: now,
        tick: (elapsedMs) / 1000.0,
        elapsedMs: elapsedMs,
        total: total
      };
    },*/

    create: function(from, to) {
      if (!to) {
        to = {
          time: Timestamp.now(),
          tick: 0,
          elapsedMs: 0,
          total: 0
        };
      }
      if (!from) return to;

      var elapsedMs = to.time - from.time;
      return {
        time: to.time,
        total: from.total + elapsedMs,
        elapsedMs: elapsedMs,
        tick: (elapsedMs / 1000)
      };
    }
  };

  return Timestamp;
}));