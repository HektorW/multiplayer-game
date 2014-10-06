(function(depencies, factory) {
  var i, args = [];
  if (typeof define !== 'undefined' && define.amd) {
    for (i = 0; i < depencies.length; i++) {
      depencies[i] = 'shared/' + depencies[i];
    }
    define(depencies, factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    for (i = 0; i < depencies.length; i++) {
      args[i] = require('./' + basepath + depencies[i] + '.js');
    }
    module.exports = factory.apply(this, args);
  }
}(




//
// InputCommand
//
['Timestamp'], function(Timestamp) {

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
      if (!a || !b) return false;

      return a.direction.x === b.direction.x &&
             a.direction.y === b.direction.y; // &&
             // a.timestamp.time === b.timestamp.time;
    }
  };


  return InputCommand;
}));