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
    window.BaseCircle = factory.apply(this, args);
  }
}(





//
// BaseObject
//
{
  // Base paths
  define: 'shared'
}, [
  // Dependencies
  'BaseObject'
], function(
  // Local variables of dependencies
  BaseObject
) {
  var BaseCircle = BaseObject.extend({
    __init__: function(x, y, radius) {
      this.supr(x, y);

      this.radius = radius || 20;
    }
  });

  return BaseCircle;
}));