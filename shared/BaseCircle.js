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
// BaseCircle
//
['BaseObject'], function(BaseObject) {

  var BaseCircle = BaseObject.extend({
    __init__: function(x, y, radius) {
      this.supr(x, y);

      this.radius = radius || 20;
    },


    handleState: function(state) {
      this.supr(state);

      if (state.radius) {
        this.radius = state.radius;
      }
    },

    getState: function() {
      var state = this.supr();
      state.radius = this.radius;
      return state;
    }
  });

  return BaseCircle;
}));