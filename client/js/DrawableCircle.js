define([
  'shared/BaseCircle'
], function(
  BaseCircle
) {
  
  var DrawableCircle = BaseCircle.extend({
    __init__: function(spriteBatch, x, y, radius, color) {
      this.supr(x, y, radius);

      this.spriteBatch = spriteBatch;
      this.color = color;
    },

    draw: function() {
      this.spriteBatch.drawCircle(this.position[0], this.position[1], this.radius, this.color, true);
    }
  });

  return DrawableCircle;
});