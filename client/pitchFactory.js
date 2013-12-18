angular.module('mlbApp')
.factory('pitchTypeCount', function() {
	
	var service = {
		analyze: function(pitch) {
			var pitches = pitch.pitchtendencies.game.types.type;
			var count = 0;
			for (var i = 0; i < pitches.length; i++) {
				count += parseInt(pitches[i]['@num']);
			}
			return count;
		}
	};

	return service;

})
.factory('pitchMe', function() {

	var service = {
		analyze: function(pitch) {
			
			var pitchData = [];

			var counter = 0;

			var inning = pitch.game.inning;
			var order = '';
			if ( inning[0]['@home_team'] === 'sfn' ) {
				order = 'top';
			} else {
				order = 'bottom';
			}
			for (var i = 0; i < inning.length; i++) {
				var batters = inning[i][order].atbat;
				for (var a = 0; a < batters.length; a++) {
					var pitches = batters[a].pitch;
					for (var k = 0; k < pitches.length; k++) {
						pitchData[counter] = {};
						pitchData[counter].break_length = parseInt(pitches[k]['@break_length']);
						pitchData[counter].pitch_type = pitches[k]['@pitch_type'];
						pitchData[counter].result = pitches[k]['@type'];
						pitchData[counter].start_speed = parseInt(pitches[k]['@start_speed']);
						pitchData[counter].description = pitches[k]['@des'];
						counter++;
					}
				}
			}
			return pitchData;
		}
	};

	return service;

});