define([
  'underscore',

  'controls/keyboard',

  'utils/settings',
  'utils/output',
  'utils/colors',

  'managers/NetworkManager',

  'shared/InputCommand',
  'shared/Timestamp',

  'objects/DrawableCircle'
], function(
  _,

  Keyboard,

  Settings,
  Output,
  Colors,

  NetworkManager,

  InputCommand,
  Timestamp,

  DrawableCircle
) {
  window.Settings = Settings;
  
  var UserControlableCircle = DrawableCircle.extend({
    __init__: function(spriteBatch, x, y, radius, color) {
      this.supr(spriteBatch, x, y, radius, color);

      this.lastAcknowledgedState = {};

      NetworkManager.on('state.acknowledged', _.bind(this.onInputAcknowladged, this));
    },


    onInputAcknowladged: function(state) {
      var pendingState;
      var i = 0, len = this.pendingStates.length;
      for ( ; i < len; ++i) {
        pendingState = this.pendingStates[i];

        if (state.timestamp.time >= pendingState.timestamp.time) {
          break;
        }
      }

      this.pendingStates.splice(0, i + 1);

      // Set state from server which we start from
      var timestamp = state.timestamp;
      this.handleState(state);


      for (i = 0, len = this.pendingStates.length; i < len; i++) {
        pendingState = this.pendingStates[i];

        timestamp = Timestamp.create(timestamp, pendingState.timestamp);
        this.handleState(pendingState);
        this.update(timestamp, true);
      }

      this.lastAcknowledgedState = state;
    },

    handleServerState: function(state) {
      if (!Settings.values.reconciliation) {
        this.handleState(state);
      }
    },


    handleState: function(state, push) {
      this.supr(state);

      if (Settings.values.reconciliation && push === true) {
        this.pendingStates.push(state);
      }
    },


    // Could change name in base to -> step
    update: function(timestamp, justState) {
      if (justState) {
        this.supr(timestamp);
      } else {
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
            this.handleState(inputCommand, true);
          }
        }

        if (Settings.values.clientPrediction) {
          this.supr(timestamp);
        }

        this.lastInputCommand = inputCommand;

        Output.fixed('pendingstates', 'pendingstates: ' + this.pendingStates.length);
      }
    },

    draw: function() {
      if (Settings.values.reconciliation) {
        var state = this.getState();

        this.handleState(this.lastAcknowledgedState, false);
        this.supr(Colors.red);

        this.handleState(state, false);
        this.supr();

      } else {
        this.supr();
      }
    }
  });


  return UserControlableCircle;
});