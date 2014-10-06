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

    create: function(previous) {
      if (!previous) {
        previous = {
          time: 0,
          tick: 0,
          elapsedMs: 0,
          total: 0
        };
      }
      var now = Timestamp.now();
      var elapsedMs = now - previous.time;
      var total = previous.total + elapsedMs;

      return {
        time: now,
        tick: (elapsedMs) / 1000.0,
        elapsedMs: elapsedMs,
        total: total
      };
    }
  };

  return Timestamp;
}));