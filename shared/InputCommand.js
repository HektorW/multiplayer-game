(function(basepaths, depencies, factory) {
  var i, args = [], basepath;

  if (typeof define !== 'undefined' && define.amd) {
    basepath = (typeof basepaths.define === 'string') ? basepaths.define + '/' : '';
    for (i = 0; i < depencies.length; i++) {
      depencies[i] = basepath + depencies[i];
    }
    define(depencies, factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    basepath = (typeof basepaths.commonjs === 'string') ? basepaths.commonjs + '/' : '';
    for (i = 0; i < depencies.length; i++) {
      args[i] = require('./' + basepath + depencies[i] + '.js');
    }
    module.exports = factory.apply(this, args);
  } else {
    for (i = 0; i < depencies.length; i++) {
      args[i] = window[depencies[i]];
    }
    window.InputCommand = factory.apply(this, args);
  }
}(





//
// InputCommand
//
{
  define: 'shared'
}, ['Timestamp'], function(Timestamp) {


  var InputCommand = {
    create: function() {
      return {
        timestamp: Timestamp.create(),
        direction: {
          x: 0,
          y: 0
        }
      };
    },

    equals: function(a, b) {
      return a.direction.x === b.direction.x &&
             a.direction.y === b.direction.y &&
             a.timestamp.time === b.timestamp.time;
    }
  };


  return InputCommand;
}));