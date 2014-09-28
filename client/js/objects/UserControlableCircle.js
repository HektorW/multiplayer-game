define([
  'controls/keyboard',

  'managers/NetworkManager',

  'shared/InputCommand',

  'objects/DrawableCircle'
], function(
  Keyboard,

  NetworkManager,

  InputCommand,

  DrawableCircle
) {
  
  var UserControlableCircle = DrawableCircle.extend({
    __init__: function(spriteBatch, x, y, radius, color) {
      this.supr(spriteBatch, x, y, radius, color);
    },

    update: function(time) {
      var keyboard = Keyboard.getInstance();

      var inputCommand = InputCommand.create();

      if (keyboard.isButtonDown('left')) {
        inputCommand.x += 1;
      }
      if (keyboard.isButtonDown('right')) {
        inputCommand.x -= 1;
      }
      if (keyboard.isButtonDown('up')) {
        inputCommand.y += 1;
      }
      if (keyboard.isButtonDown('down')) {
        inputCommand.y -= 1;
      }

      NetworkManager.sendCommand('input', inputCommand);
    }
  });


  return UserControlableCircle;
});