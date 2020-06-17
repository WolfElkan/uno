// Set up basic express server
var express = require('express');
var app     = express();
var path    = require('path');
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);
var port    = process.env.PORT || 80;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

module.exports = {
	'express': express,
	'app'    : app,
	'path'   : path,
	'server' : server,
	'io'     : io,
	'port'   : port,
}