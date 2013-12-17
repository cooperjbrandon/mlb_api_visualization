var
  fs           = require('fs'),
  stats        = require('./server_stat_getter').stats;
  pitchCount   = require('./server_stat_getter').pitchCount;

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

var router = {
  '/': htmlFiles,
  '/templates/main.html': htmlFiles,
  '/templates/MLB.html': htmlFiles,
  '/client/app.js': jsFiles,
  '/client/controller.js': jsFiles,
  '/client/httpStats.js': jsFiles,
  '/client/parseXML.js': jsFiles,
  '/stats': stats,
  '/pitchCount': pitchCount
};

exports.router = router;
