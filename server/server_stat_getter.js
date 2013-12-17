var http  = require('http');

var headers = {};

headers['Content-Type'] = "text/xml";

var stats = function(request, response, pathname) {
  var data = '';
  var options = {
    host: 'gd2.mlb.com',
    path: '/components/game/mlb/year_2012/month_08/day_22/gid_2012_08_22_sfnmlb_lanmlb_1/inning/inning_all.xml'
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