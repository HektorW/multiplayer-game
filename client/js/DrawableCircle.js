define([
  'shared/BaseCircle',

  'colors'
], function(
  BaseCircle,

  Colors
) {
  
  var DrawableCircle = BaseCircle.extend({
    __init__: function(spriteBatch, x, y, radius) {
      this.supr(x, y, radius);

      this.spriteBatch = spriteBatch;
    },

    draw: function() {
      this.spriteBatch.drawCircle(this.position[0], this.position[1], this.radius, Colors.red, true);
    }
  });

  return DrawableCircle;
});