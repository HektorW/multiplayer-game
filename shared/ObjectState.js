(function(basepaths, depencies, factory) {
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
// ObjectState
//
[
  // Dependencies
  'Timestamp'
], function(
  // Local variables of dependencies
  Timestamp
) {
  var ObjectState = {
    create: function() {
    	timestamp: Timestamp.create(),
    	position: {
    		x: 0,

    	}
    }
  };

  return ObjectState;
}));