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

    draw: function(color) {
      this.spriteBatch.drawCircle(this.position.x, this.position.y, this.radius, color || this.color, true);
    }
  });

  return DrawableCircle;
});