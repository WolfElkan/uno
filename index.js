// Require the export of `server.js`
var server = require('./server')

// This is used for inspecting objects
var util = require('util')

// Extract variables that will actually be needed
var io = server.io
var socket = server.socket
// var circle = require('./public/circle')

// Run this code for each new socket connection

var Game = require('./public/game')

var game = new Game()

io.on('connection', function(socket) {
	// console.log(game.draw(7))
	// console.log(game.draw_pile.length)
	console.log("Connected")

	socket.emit('deal',game.draw(7))

	socket.on('say', function(data) {
		console.log(data)
		socket.emit('echo', 'Data recieved: ' + data)
	})

});
