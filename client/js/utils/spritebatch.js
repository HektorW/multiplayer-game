define([], function() {

  var TWO_PIE = Math.PI * 2;

  var SpriteBatch = function(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
  };

  SpriteBatch.prototype.resize = function(width, height) {
    this.width = this.canvas.width = width || window.innerWidth;
    this.height = this.canvas.height = height || window.innerHeight;
  };

  SpriteBatch.prototype.clear = function(color) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (color) {
      this.drawRectangle(0, 0, this.width, this.height, color, true);
    }
  };

  SpriteBatch.prototype.drawRectangle = function(x, y, w, h, color, fill) {
    var ctx = this.ctx;
    ctx.save();

    ctx.beginPath();

    ctx.rect(x, y, w, h);
    this._fillOrStroke(ctx, color, fill);

    ctx.restore();
  };

  SpriteBatch.prototype.drawCircle = function(x, y, radius, color, fill) {
    var ctx = this.ctx;
    ctx.save();

    ctx.beginPath();

    ctx.arc(x, y, radius, 0, TWO_PIE, false);

    this._fillOrStroke(ctx, color, fill);

    ctx.restore();
  };

  SpriteBatch.prototype._fillOrStroke = function(ctx, color, fill) {
    if (fill) {
      ctx.fillStyle = color || ctx.fillStyle;
      ctx.fill();
    } else {
      ctx.strokeStyle = color || ctx.strokeStyle;
      ctx.stroke();
    }
  };


  return SpriteBatch;
});