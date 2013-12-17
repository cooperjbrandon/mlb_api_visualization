var 
	http  				= require('http'),
	url   				= require('url'),
	parseString 	= require('xml2js').parseString,
	libxmljs = require("libxmljs"),
	cainStarts  	= require('./cainSchedule').cainStarts;

var headers = {};
var cain = {};
var counter = 0;
var year, month, day, home, away;

headers['Content-Type'] = "text/xml";

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
			response.writeHead(200, headers);
			response.end(data);
		});
	}).on('error', function(e) {
		console.log("Error: " + options.host + "\n" + e.message); 
		console.log( e.stack );
	});

};

var stats = function(request, response) {
	for (var i = 0; i < 1; i++) {
	  year = cainStarts[i].year;
	  month = cainStarts[i].month;
	  day = cainStarts[i].day;
	  home = cainStarts[i].homeTeam;
	  away = cainStarts[i].awayTeam;
	  var path = '/components/game/mlb/year_' + year + '/month_' + month + '/day_' + day + '/gid_' + year + '_' + month + '_' + day + '_' + away + '_' + home + '_1/inning/inning_all.xml';
		gamedayRequest(request, response, path);
	}
};

var pitchCount = function(request, response) {
	var id = url.parse(request.url, true).query.playerID;
	for (var i = 0; i < 1; i++) {
	  year = cainStarts[i].year;
	  month = cainStarts[i].month;
	  day = cainStarts[i].day;
	  home = cainStarts[i].homeTeam;
	  away = cainStarts[i].awayTeam;
	  var path = '/components/game/mlb/year_' + year + '/month_' + month + '/day_' + day + '/gid_' + year + '_' + month + '_' + day + '_' + away + '_' + home + '_1/premium/pitchers/' + id + '/pitchtendencies_game.xml';
		gamedayRequest(request, response, path);
	}
};

exports.stats = stats;
exports.pitchCount = pitchCount;

