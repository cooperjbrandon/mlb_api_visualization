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
			
			var pitchData = {};
			pitchData.break_length = [];
			pitchData.pitch_type = [];
			pitchData.result = [];
			pitchData.start_speed = [];

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
						pitchData.break_length[counter] = pitches[k]['@break_length'];
						pitchData.pitch_type[counter] = pitches[k]['@pitch_type'];
						pitchData.result[counter] = pitches[k]['@type'];
						pitchData.start_speed[counter] = pitches[k]['@start_speed'];
						counter++;
					}
				}
			}
			return pitchData;
		}
	};

	return service;

});