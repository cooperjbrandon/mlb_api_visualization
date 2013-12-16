var
  url     = require('url'),
  router  = require('./router').router;


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

exports.handleRequest = handleRequest;