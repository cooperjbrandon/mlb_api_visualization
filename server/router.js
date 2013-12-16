var
  fs    = require('fs'),
  http  = require('http');

var headers = {};

var readFile = function(response, pathname) {
  response.writeHead(200, headers);
  pathname = '..' + pathname;
  fs.readFile(pathname, function (err, data) {
    if (err) {
      response.writeHead(500, headers);
      return response.end('Error loading' + pathname);
    }
    response.end(data);
  });
}

var htmlFiles = function(request, response, pathname){
	headers['Content-Type'] = "text/html";
  if (pathname === '/') { pathname = '/index.html'; }
  readFile(response, pathname);
};

var jsFiles = function(request, response, pathname) {
  headers['Content-Type'] = "application/javascript";
  readFile(response, pathname);
};

var stats = function() {
  var data = '';
  var options = {
    host: 'gd2.mlb.com',
    path: '/components/game/mlb/year_2008/month_04/day_07/master_scoreboard.xml'
  };
  http.get(options, function(result) {
    result.on("data", function(chunk) {
      data += chunk;
    });
    result.on('end', function() {
      console.log(data);
    });
  }).on('error', function(e) {
      console.log("Error: " + options.host + "\n" + e.message); 
      console.log( e.stack );
  });
};

var router = {
  '/': htmlFiles,
  '/templates/main.html': htmlFiles,
  '/templates/MLB.html': htmlFiles,
  '/client/app.js': jsFiles,
  '/client/controller.js': jsFiles,
  '/stats': stats
};

exports.router = router;
