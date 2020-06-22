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

const dangerous = ['nsp','server','adapter','client','conn']

io.on('connection', function(socket) {
	// socket.emit("reset")
	// console.log("Connected")
	// socket.emit('echo', socket._events)

	socket.on('join_game', function(data) {
		game.push(socket, data)
		console.log('Player joined:',data.username)
		// for (var m in socket) {
		// 	// console.log(m)
		// 	if (!dangerous.includes(m)) {
		// 		socket.emit('hecho',{
		// 			'head':m,
		// 			'data':socket[m],
		// 		})
		// 	}
		// }
		// console.log(socket)
		// var socket2 = {}
		// Object.assign(socket2,socket)
		// socket2.emit = undefined
		// socket.emit('echo', socket2)
	})

	socket.on('start_game', function() {
		game.start()
		console.log("Game started")
	})

	// socket.emit('deal',game.draw(7))

	// socket.on('say', function(data) {
	// 	console.log(data)
	// 	socket.emit('echo', 'Data recieved: ' + data)
	// })

	socket.on('snapshot', function() {
		socket.emit('snapshot',game.snapshot())
		// socket.broadcast.emit('snapshot',game.snapshot())
	})

});
