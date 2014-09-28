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
      var now = Timestamp.now();
      var previousNow = previous && previous.time || 0;

      return {
        time: now,
        delta: (previousNow - now) / 1000.0
      };
    }
  };

  return Timestamp;
}));