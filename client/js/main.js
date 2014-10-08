require.config({
  paths: {
    'underscore': '../node_modules/underscore/underscore',
    'shared': '../shared',
    'socket.io': '/socket.io/socket.io',
    'events': '../shared/libs/events',
    'dat.gui': 'libs/dat.gui'
  },

  shim: {
    'dat.gui': {
      exports: 'dat'
    }
  }
});


require(['app'], function(App) {
  App.run();
});


// Prefixes
(function() {
  var w = window;
  
  // performance.now
  var p = w.performance = w.performance || {};
  p.now =
    p.now ||
    p.webkitNow ||
    p.mozNow ||
    p.msNow ||
    function() {
      return (new Date()).getTime();
    };
 
  // requestAnimationFrame
  var raf = 'equestAnimationFrame';
  w['r'+raf] =
    w['r'+raf] ||
    w['webkitR'+raf] ||
    w['mozR'+raf] ||
    w['msR'+raf] ||
    function(cb) {
      return setTimeout(function(){
        cb(p.now());
      }, 17);
    };
 
  // cancelAnimationFrame
  var caf = 'ancelAnimationFrame';
  w['c'+caf] =
    w['c'+caf] ||
    w['webkitC'+caf] ||
    w['mozC'+caf] ||
    w['msC'+caf] ||
    function(id) {
      return clearTimeout(id);
    };
 
}());