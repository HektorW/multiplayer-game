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
// BaseObject
//
['libs/classy'], function(Classy) {

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


      this.pendingStates = [];
    },


    handleInputCommand: function(cmd) {
      
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