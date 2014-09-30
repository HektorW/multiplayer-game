define([
  'underscore',
  
  'controls/keyboard',

  'utils/settings',

  'managers/NetworkManager',

  'shared/InputCommand',

  'objects/DrawableCircle'
], function(
  _,

  Keyboard,

  Settings,

  NetworkManager,

  InputCommand,

  DrawableCircle
) {
  window.Settings = Settings;
  
  var UserControlableCircle = DrawableCircle.extend({
    __init__: function(spriteBatch, x, y, radius, color) {
      this.supr(spriteBatch, x, y, radius, color);

      this.pendingStates = [];

      NetworkManager.on('inputcommand.ackknowladged', _.bind(this.onInputAckknowladged, this));
    },


    handleState: function(state) {
      this.supr(state);

      if (Settings.values.reconciliation) {
        this.pendingStates.push(state);
      }
    },


    update: function(timestamp) {
      var keyboard = Keyboard.getInstance();

      var inputCommand = InputCommand.create();

      if (keyboard.isButtonDown('left')) {
        inputCommand.direction.x -= 1;
      }
      if (keyboard.isButtonDown('right')) {
        inputCommand.direction.x += 1;
      }
      if (keyboard.isButtonDown('up')) {
        inputCommand.direction.y -= 1;
      }
      if (keyboard.isButtonDown('down')) {
        inputCommand.direction.y += 1;
      }

      NetworkManager.sendCommand('input', inputCommand);

      if (Settings.values.clientPrediction) {
        if (Settings.values.reconciliation) {



        } else {
          this.handleState(inputCommand);
          this.supr(timestamp);
        }
      }
    }
  });


  return UserControlableCircle;
});