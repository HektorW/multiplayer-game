define([
	'underscore',
	'events',

	'dat.gui'
], function(
	_,
	Events,

	dat
) {


	var Settings = {
		values: {
			latency: 100,
			fps: 10
		},

		init: function() {
			_.bindAll(this, 'onValueChange');

			var gui = this.gui = new dat.GUI();

			gui.add(this.values, 'latency').min(0).max(1000).step(50).onFinishChange(this.onValueChange);
			gui.add(this.values, 'fps').min(1).max(60).step(5).onFinishChange(this.onValueChange);
		},

		onValueChange: function(value) {
			this.trigger('values.updated');
		}
	};


	_.extend(Settings, Events);

	return Settings;
});