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
      this.position = {
        x: x || 0,
        y: y || 0
      };
      this.direction = {
        x: 0,
        y: 0
      };
      this.velocity = 0.0;
    },

    handleState: function(state) {
      if (state.position) {
        this.position.x = state.position.x;
        this.position.y = state.position.y;
      }

      if (state.direction) {
        this.direction.x = state.direction.x;
        this.direction.y = state.direction.y;

        var dirLen = Math.sqrt(Math.pow(this.direction.x, 2) + Math.pow(this.direction.y, 2));
        if (dirLen > 1) {
          this.direction.x /= dirLen;
          this.direction.y /= dirLen;
        }
      }

      if (state.velocity) {
        this.velocity = state.velocity;
      }
    },

    getState: function() {
      return {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        direction: {
          x: this.direction.x,
          y: this.direction.y
        },
        velocity: this.velocity
      };
    },

    update: function(timestamp) {
      this.position.x += this.direction.x * this.velocity * timestamp.tick;
      this.position.y += this.direction.y * this.velocity * timestamp.tick;
    }
  });

  return BaseObject;
}));