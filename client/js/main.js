require.config({
  paths: {
    'underscore': 'node_modules/underscore/underscore'
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
  var rAF = 'equestAnimationFrame';
  w['r'+rAF] =
    w['r'+rAF] ||
    w['webkitR'+rAF] ||
    w['mozR'+rAF] ||
    w['msR'+rAF] ||
    function(cb) {
      return setTimeout(function(){
        cb(p.now());
      }, 17);
    };
 
  // cancelAnimationFrame
  var cAF = 'ancelAnimationFrame';
  w['c'+cAF] =
    w['c'+cAF] ||
    w['webkitC'+cAF] ||
    w['mozC'+cAF] ||
    w['msC'+cAF] ||
    function(id) {
      return clearTimeout(id);
    };
 
}());