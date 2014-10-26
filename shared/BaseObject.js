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


    setPosition: function(position) {
      this.position.x = position.x;
      this.position.y = position.y;
    },


    setDirection: function(direction) {
      this.direction.x = direction.x;
      this.direction.y = direction.y;

      var dirLen = Math.sqrt(Math.pow(this.direction.x, 2) + Math.pow(this.direction.y, 2));
      if (dirLen > 1) {
        this.direction.x /= dirLen;
        this.direction.y /= dirLen;
      }
    },


    setState: function(state) {
      if (state.position) {
        this.setPosition(state.position);  
      }

      if (state.direction) {
        this.setDirection(direction);
      }

      if (state.velocity) {
        this.velocity = state.velocity;
      }
    },


    handleState: function(state) {
      this.setState(state);
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





    step: function(timestamp) {
      this.position.x += this.direction.x * this.velocity * timestamp.tick;
      this.position.y += this.direction.y * this.velocity * timestamp.tick;
    },

    update: function(timestamp) {
      this.step(timestamp);
    }
  });

  return BaseObject;
}));