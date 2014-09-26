define([
  'underscore',

  'controls/controls'
], function(
  _,

  Controls
) {

  function Gamepad() {
    // vars
    this.lastButtonState = [];
    this.lastAxesState = [];
    this.epsilon = 0.2;

    this.leftStickX = 0.0;
    this.leftStickY = 0.0;

    this.rightStickX = 0.0;
    this.rightStickY = 0.0;

    this.connected = false;
  }

  Gamepad.prototype = new Controls();
  Gamepad.prototype.constructor = Gamepad;


  Gamepad.prototype.update = function() {
    Controls.prototype.update.call(this); // super

    var pad = (window.navigator.getGamepads ? window.navigator.getGamepads() : {})[0];

    if (pad) {
      this.connected = true;

      var axes = pad.axes;
      this.updateAnalogStick(axes, 'LEFT');
      this.updateAnalogStick(axes, 'RIGHT');
      this.updateButtons(pad.buttons);
    } else {
      this.connected = false;
    }
  };

  Gamepad.prototype.updateAnalogStick = function(axes, side) {
    var abs = Math.abs,
      epsilon = this.epsilon;

    var x = axes[AXES[side + '_ANALOGUE_HOR']];
    var y = axes[AXES[side + '_ANALOGUE_VERT']];

    if (abs(x) < epsilon) {
      x = 0.0;
    }
    if (abs(y) < epsilon) {
      y = 0.0;
    }

    if (side === 'LEFT') {
      this.leftStickX = x;
      this.leftStickY = y;
    } else {
      this.rightStickX = x;
      this.rightStickY = y;
    }
  };

  Gamepad.prototype.updateButtons = function(buttons) {
    var t = performance.now();

    var index, button;
    for (var btn in BUTTONS) {
      if (!BUTTONS.hasOwnProperty(btn)) {
        continue;
      }

      index = BUTTONS[btn];
      button = buttons[index];

      this.pressedKeyDuration[btn] = (button.pressed || button.value > 0.0) ? t : 0.0;
    }
  };

  Gamepad.prototype.getLeftStick = function() {
    return [this.leftStickX, this.leftStickY];
  };
  Gamepad.prototype.getLeftStickX = function() {
    return this.leftStickX;
  };
  Gamepad.prototype.getLeftStickY = function() {
    return this.leftStickY;
  };

  Gamepad.prototype.getRightStick = function() {
    return [this.rightStickX, this.rightStickY];
  };
  Gamepad.prototype.getRightStickX = function() {
    return this.rightStickX;
  };
  Gamepad.prototype.getRightStickY = function() {
    return this.rightStickY;
  };

  Gamepad.prototype.isConnected = function() {
    return this.connected;
  };


  ///////////////
  // Constants //
  ///////////////
  var BUTTONS = {
    FACE_1: 0, // Face (main) buttons
    FACE_2: 1,
    FACE_3: 2,
    FACE_4: 3,
    LEFT_SHOULDER: 4, // Top shoulder buttons
    RIGHT_SHOULDER: 5,
    LEFT_SHOULDER_BOTTOM: 6, // Bottom shoulder buttons
    RIGHT_SHOULDER_BOTTOM: 7,
    SELECT: 8,
    START: 9,
    LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
    RIGHT_ANALOGUE_STICK: 11,
    PAD_TOP: 12, // Directional (discrete) pad
    PAD_BOTTOM: 13,
    PAD_LEFT: 14,
    PAD_RIGHT: 15
  };
  var AXES = {
    LEFT_ANALOGUE_HOR: 0,
    LEFT_ANALOGUE_VERT: 1,
    RIGHT_ANALOGUE_HOR: 2,
    RIGHT_ANALOGUE_VERT: 3
  };

  return Gamepad;
});