define([
  'underscore'
], function(
  _
) {

  function Controls() {
    this.pressedKeyDuration = {};
    this.lastPressedKeyDuration = {};
  }


  Controls.prototype.init = function() {}

  Controls.prototype.update = function() {
    var lastPressedKeyDuration = this.lastPressedKeyDuration;

    _.each(this.pressedKeyDuration, function(value, key) {
      lastPressedKeyDuration[key] = value;
    });
  };

  Controls.prototype.___keyDown = function(key) {
    var t = performance.now();
    this.pressedKeyDuration[key] = t;
  };
  Controls.prototype.___keyUp = function(key) {
    this.pressedKeyDuration[key] = 0.0;
  };

  // return true if buttons is currently down
  Controls.prototype.isButtonDown = function(btn) {
      return this.pressedKeyDuration[btn] > 0.0;
  };

  Controls.prototype.isButtonDownLast = function(btn) {
    return this.lastPressedKeyDuration[btn] > 0.0;
  };

  // return true if button is up but was down last frame
  Controls.prototype.hasButtonPressed = function(btn) {
    return !this.isButtonDown(btn) && this.isButtonDownLast(btn);
  };

  Controls.prototype.buttonDownDuration = function(btn) {
    var t = this.pressedKeyDuration[btn];
    return t > 0.0 ? performance.now() - t : 0.0;
  };


  Controls.prototype.getKeysDown = function() {
    var keys = [];

    for (var key in this.pressedKeyDuration) {
      if (!this.pressedKeyDuration.hasOwnProperty(key)) {
        continue;
      }

      if (this.isButtonDown(key)) {
        keys.push(key);
      }
    }

    return keys;
  };

  return Controls;

});