var
  url     = require('url'),
  fs      = require('fs'),
  qs      = require('qs');


var handleRequest = function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);
  var pathname = url.parse(request.url).pathname;
  if(router[pathname]){
    var handler = router[pathname];
    handler(request, response, pathname);
  } else {
    // 404
  }
};

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
  '/client/controller.js': jsFiles
};

exports.handleRequest = handleRequest;