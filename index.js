// Require the export of `server.js`
var server = require('./server')

// This is used for inspecting objects
var util = require('util')

// Extract variables that will actually be needed
var io = server.io
var socket = server.socket
// var circle = require('./public/circle')

// Run this code for each new socket connection

io.on('connection', function(socket) {
	console.log("Connected")

	// When `hack` message recieved:
	socket.on('socket', function(data) {
		console.log(data)
		socket.emit('Data recieved: ' + data)
	})

});
