/**
 * Events
 *
 * @author HektorW
 * @mail hektorw@gmail.com
 */

/* global define:true, module:true */

(function(factory) {
  if (typeof define !== 'undefined' && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    window.Events = factory();
  }
}(function() {
  'use strict';

  var slice = Array.prototype.slice;

  var Events = {

    // listen to an event
    on: function(event, callback, context) {
      if (!event || !callback) return this;
      this._events || (this._events = {});
      (this._events[event] || (this._events[event] = [])).unshift({ // insert in reverse order
        callback: callback,
        _context: context, // need to save original to remove correct in off
        ctx: context || this
      });
      return this;
    },

    // event that only fires once
    once: function(event, callback, context) {
      this.on(event, function fn() {
        this.off(event, fn, context);
        callback.apply(this, arguments);
      }, context);
    },

    // if no event is supplied it will reset all events
    // doesn't allow to remove by only function and/or context
    off: function(event, callback, context) {
      var i, events, ev;
      if (!this._events) return this; // no events on object
      if (!event) { // no event, reset events
        this._events = {};
        return this;
      }
      events = this._events[event] || [];
      for (i = events.length; i--;) {
        ev = events[i];
        if (callback == ev.callback && (!context || context == ev._context))
          events.splice(i, 1);
      }
      if (!events.length) delete this._events[event];
      return this;
    },

    trigger: function(event) {
      if (!event || !this._events) return this;
      var args = slice.call(arguments, 1); // rest of arguments sent to function
      var events = this._events[event];
      if (events) _triggerEvents(events, args);
      return this;
    }
  };

  function _triggerEvents(events, args) {
    var i, ev;
    for (i = events.length; i--;) {
      (ev = events[i]).callback.apply(ev.ctx, args);
    }
  }

  return Events;
}));