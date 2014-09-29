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
			fps: 10,
			clientPrediction: false
		},

		init: function() {
			_.bindAll(Settings, 'valuesChanged');

			var gui = Settings.gui = new dat.GUI();

			gui.add(Settings.values, 'latency').min(0).max(1000).step(50).onFinishChange(Settings.valuesChanged);
			gui.add(Settings.values, 'fps').min(1).max(60).step(5).onFinishChange(Settings.valuesChanged);
			gui.add(Settings.values, 'clientPrediction');

			// Settings.valuesChanged();
		},

		valuesChanged: function(value) {
			Settings.trigger('values.updated');
		}
	};


	_.extend(Settings, Events);

	return Settings;
});