(function(basepaths, depencies, factory) {
  var i, args = [], basepath;

  if (typeof define !== 'undefined' && define.amd) {
    basepath = (typeof basepaths.define === 'string') ? basepaths.define + '/' : '';
    for (i = 0; i < depencies.length; i++) depencies[i] = basepath + depencies[i];
    define(depencies, factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    basepath = (typeof basepaths.commonjs === 'string') ? basepaths.commonjs + '/' : '';
    for (i = 0; i < depencies.length; i++) args[i] = require('./' + basepath + depencies[i] + '.js');
    module.exports = factory.apply(this, args);
  } else {
    for (i = 0; i < depencies.length; i++) args[i] = window[depencies[i]];
    window.Timestamp = factory.apply(this, args);
  }
}(





//
// Timestamp
//
{
  define: 'shared'
}, [], function() {
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