var http  = require('http');
var url   = require('url');
var parseString = require('xml2js').parseString;
var cainStarts  = require('./cainSchedule').cainStarts;

var headers = {};
var cain = {};
var counter = 0;

headers['Content-Type'] = "application/json";

var gamedayRequest = function(request, response, path) {
	var id = url.parse(request.url, true).query.playerID;
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

var stats = function(request, response) {
	for (var i = 0; i < cainStarts.length; i++) {
	  var year = cainStarts[i].year;
	  var month = cainStarts[i].month;
	  var day = cainStarts[i].day;
	  var home = cainStarts[i].homeTeam;
	  var away = cainStarts[i].awayTeam;
	  var path = '/components/game/mlb/year_' + year + '/month_' + month + '/day_' + day + '/gid_' + year + '_' + month + '_' + day + '_' + away + '_' + home + '_1/inning/inning_all.xml';
		gamedayRequest(request, response, path);
	}
};

exports.stats = stats;

