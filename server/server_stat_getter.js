var 
	http  				= require('http'),
	url   				= require('url'),
	parseString 	= require('xml2js').parseString,
	cainStarts  	= require('./cainSchedule').cainStarts;

var headers = {};
var cain = {};
var counter = 0;
var year, month, day, home, away;

headers['Content-Type'] = "application/json";

var gamedayRequest = function(request, response, path) {
	console.log('sending request out for path: ' + path);
	var data = '';

	var options = {
		host: 'gd2.mlb.com',
		path: path
	};

	http.get(options, function(result) {
		result.on("data", function(chunk) {
			data += chunk;
		});
		result.on('end', function() {
			parseString(data, function (err, result) {
				cain[counter] = result;
				counter++;
				console.log(counter);
				if (counter === cainStarts.length) {
					counter = 0;
					response.writeHead(200, headers);
					response.end(JSON.stringify(cain));
				}
			});
		});
	}).on('error', function(e) {
		console.log("Error: " + options.host + "\n" + e.message); 
		console.log( e.stack );
	});

};

var setCainSchedule = function() {
	for (var i = 0; i < cainStarts.length; i++) {
	  year = cainStarts[i].year;
	  month = cainStarts[i].month;
	  day = cainStarts[i].day;
	  home = cainStarts[i].homeTeam;
	  away = cainStarts[i].awayTeam;
};

var loopRequest = function(request, response, path) {
	for (var i = 0; i < cainStarts.length; i++) {
		gamedayRequest(request, response, path);
	}
}


var stats = function(request, response) {
		setCainSchedule();
	  var path = '/components/game/mlb/year_' + year + '/month_' + month + '/day_' + day + '/gid_' + year + '_' + month + '_' + day + '_' + away + '_' + home + '_1/inning/inning_all.xml';
		loopRequest(request, response, path);
};

var pitchCount = function(request, response) {
		setCainSchedule();
		var id = url.parse(request.url, true).query.playerID;
	  var path = '/components/game/mlb/year_' + year + '/month_' + month + '/day_' + day + '/gid_' + year + '_' + month + '_' + day + '_' + away + '_' + home + '_1/premium/pitchers/' + id + '/pitchtendencies_game.xml';
		loopRequest(request, response, path);
};

exports.stats = stats;
exports.pitchCount = pitchCount

