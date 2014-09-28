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
    window.BaseObject = factory.apply(this, args);
  }
}(





//
// BaseObject
//
{
  // Base paths
  define: 'shared'
}, ['libs/classy'], function(Classy) {

  var BaseObject = Classy.extend({
    __init__: function(x, y) {
      this.position = [x || 0, y || 0];
    },

    handleState: function(state) {
      this.position[0] = state.x;
      this.position[1] = state.y;
    }
  });

  return BaseObject;
}));