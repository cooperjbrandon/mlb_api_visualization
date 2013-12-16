var
	http           = require("http"),
	port           = 8080,
	ip             = '127.0.0.1',
	handleRequest  = require("./request-handler").handleRequest;

var server = http.createServer(handleRequest);
server.listen(port, ip);


console.log("Listening on http://" + ip + ":" + port);