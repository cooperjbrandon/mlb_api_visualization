var
  url     = require('url'),
  fs      = require('fs'),
  path    = require('path'),
  qs      = require('qs');


var handleRequest = function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);
  var pathname = url.parse(request.url).pathname;
  if(router[pathname]){
    var handler = router[pathname];
    handler(request, response);
  } else {
    // 404
  }
};

var headers = {};

var basicFiles = function(request, response){
  var ext = path.extname(asset);
	headers['Content-Type'] = "text/html";
  response.writeHead(200, headers);
  fs.readFile("../index.html", function (err, data) {
      console.log("Read index.html");
      if (err) {
        response.writeHead(500, headers);
        return response.end('Error loading index.html');
      }
      response.end(data);
    });
};

var router = {
  '/': basicFiles
};

exports.handleRequest = handleRequest;