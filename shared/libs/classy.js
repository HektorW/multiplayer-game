/**
 * Classy.js
 *
 * https://github.com/hektorw/classy.js
 * @author Hektor
 *
 */

;(function(){
  // First decides whether functions get parsed to string correctly
  //    /xyz/.test(function(){xyz;}) 
  //    
  // Then assigns a regex to use when adding supr to functions
  //    /\bsupr\b/
  //
  // Resulting regex checks whether the function contains a reference to 
  // supr() or not
  var fnTest = /xyz/.test(function(){'xyz';}) ? /\bsupr\b/ : /.*/;

  var initializing = false;
  var _global = this;

  // Exposed method outside
  function Classy(obj){
    // Classy.extend(obj);
  }

  function isFn(f){
    return typeof f === 'function';
  }

  Classy.extend = function(obj){
    var supr = this.prototype;
    initializing = true;
    var new_prototype = new this();
    initializing = false;

    for(var prop in obj){

      var p = obj[prop];
      var sp = supr[prop];

      if(
        isFn(p) &&  // If the property on the new object is a function
        isFn(sp) && // Property on super is function
        fnTest.test(p)){ // Test if contains ref to supr()

        // Create a wrapper function to fix call of super's function corresponding
        new_prototype[prop] = (function(name, f){
          var fn = function(){
            var tmp = this.supr;

            this.supr = supr[name];

            // if getting undefined error here, super function doesn't exist
            var ret = f.apply(this, arguments);

            this.supr = tmp;

            return ret;
          };

          return fn;
        })(prop, p);
      }
      // If not all of the above we just add it
      else {
        new_prototype[prop] = p;
      }
    }

    function F(){
      if(!(this instanceof F))
        return new F(arguments);

      if(!initializing && this.__init__)
        this.__init__.apply(this, arguments);
    }

    F.prototype = new_prototype;

    F.prototype.constructor = F;

    F.extend = this.extend;

    F.constants = function(c){
      for(var prop in c){
        var p = {
          value: c[prop],
          writable: false,
          enumerable: true,
          configurable: true
        };

        // For now added to both prototype and object.
        // Enables singletons, but probably bad practice
        Object.defineProperty(F.prototype, prop, p);
        Object.defineProperty(F, prop, p);
      }

      return this;
    };

    return F;
  };

  if(typeof define !== 'undefined' && define.amd)
    define([], function() { return Classy; });
  else if(typeof module !== 'undefined' && module.exports)
    module.exports = Classy;
  else
    _global.Classy = Classy;


})();