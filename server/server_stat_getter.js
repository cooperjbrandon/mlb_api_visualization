var http  = require('http');

var headers = {};

headers['Content-Type'] = "application/json";

var stats = function(request, response, pathname) {
  var data = '';
  var options = {
    host: 'gd2.mlb.com',
    path: '/components/game/mlb/year_2013/month_08/day_16/gid_2013_08_16_kcamlb_detmlb_1/boxscore.json'
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

exports.stats = stats;