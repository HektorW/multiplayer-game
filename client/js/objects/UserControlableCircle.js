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

      NetworkManager.on('state.acknowledged', _.bind(this.onInputAckknowladged, this));
    },


    onInputAckknowladged: function(state) {
      console.log(state);
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


      if (!InputCommand.equals(this.lastInputCommand, inputCommand)) {
        NetworkManager.sendCommand('input', inputCommand);

        if (Settings.values.clientPrediction) {
          this.handleState(inputCommand);
        }
      }

      if (Settings.values.clientPrediction) {
        this.supr(timestamp);
      }

      this.lastInputCommand = inputCommand;
    },

    draw: function() {
      this.supr();
    }
  });


  return UserControlableCircle;
});