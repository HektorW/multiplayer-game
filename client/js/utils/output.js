define(['underscore', 'utils/colors'], function(_, Colors) {
  
  var Output = {
    init: function() {
      this.el = document.createElement('div');

      this.el.style.position = 'fixed';
      this.el.style.top = '0';
      this.el.style.left = '0';
      this.el.style.background = Colors.black;
      this.el.style.color = Colors.orange;


      document.body.appendChild(this.el);
    },

    fixed: function(name, value) {
      name = this._safeName(name);
      var el = this._getOrCreateElement(name);
      el.innerHTML = value;
    },

    removeFixed: function(name) {
      name = this._safeName(name);
      this.el.removeElement(this._getOrCreateElement(name, false));
    },

    _getOrCreateElement: function(name, create) {
      var el = this.el.querySelector('[data-'+name+']');
      if (!el && create !== false) {
        el = this.el.appendChild(document.createElement('div'))
        el.setAttribute('data-'+name, 'name');
      }
      return el;
    },

    _safeName: function(name) {
      return (name || '').split(/ \./).join('-');
    }
  };

  return Output;
});