function type(obj) {
	if (obj) {
		return obj.__proto__.constructor
	}
}

const nums = [
	"Zero",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
]

class Card {
	constructor(c, v) {
		if (typeof(c) == "object" && !v) {
			this.c = c.c
			this.v = String(c.v)
		} else {
			this.c = c
			this.v = String(v)
		}
	}
	color() {
		return {
			'R':"Red",    // #ed1d25
			'Y':"Yellow", // #fede00
			'G':"Green",  // #02a650
			'B':"Blue",   // #0095db
			'W':"Wild",   // #000000
		}[this.c]
	}
	value() {
		if (this.v == 'D') {
			return this.c == 'W' ? " Draw Four" : " Draw Two"
		} else if (isNaN(this.v)) {
			return {
				'S':" Skip",
				'R':" Reverse",
				'I':"",
			}[this.v]
		} else {
			return " " + nums[Number(this.v)]
		}
	}
	name() {
		return this.color() + this.value()
	}
	image() {
		return `images/CardImages/${this.c}${this.v}.png`
	}
	isPlayable(that) {
		if (this.c == "W") {
			return true
		}
		return this.c == that.c || this.v == that.v
	}
	// duplicate(nCopies) {
	// 	var r = []
	// 	for (var i = 0; i < nCopies; i++) {
	// 		r.push(new Card(this.c, this.v))
	// 	}
	// 	return r
	// }
 }
 Card.getDeck = function() {
	var deck = []

	for (var cnum in colors) {
		var c = colors[cnum]
		deck.push(new Card(c, 0))
		for (var v = 1; v <= 9; v++) {
			deck.push(new Card(c, v))
			deck.push(new Card(c, v))
		}
		for (var i = 0; i < action.length; i++) {
			deck.push(new Card(c, action[i]))
			deck.push(new Card(c, action[i]))
		}
	}
	for (var i = 0; i < 4; i++) {
		deck.push(new Card('W','I'))
		deck.push(new Card('W','D'))
	}

	return shuffle(deck)
}

class Player {
	constructor(socket, username) {
		this.socket = socket
		this.username = username
		this.hand = []
	}
	push(card) {
		console.log(card)
		console.log(type(card))
		if (type(card) == Array) {
			for (var i = 0; i < card.length; i++) {
				this.hand.push(card[i])
			}
		} else {
			this.hand.push(card)
		}
	}
	emit(header, data) {
		this.socket.emit(header, data)
	}
	info(me) {
		var data = {
			'username':this.username,
		}
		if (me) {
			data.hand = this.hand
		} else {
			data.hand = {'length':this.hand.length}
		}
		return data
	}
}

function shuffle(arr) {
	if (arr.length == 1) {return arr}
	var index = Math.floor(Math.random() * arr.length) + 1
	var back = arr.splice(index)
	var selected = arr.pop()
	arr = arr.concat(back)
	arr = shuffle(arr)
	arr.push(selected)
	return arr
}

const colors = "RYGB"
const action = "SRD"

class Game {
	constructor() {
		this.draw_pile = Card.getDeck()
		this.play_pile = []
		this.players = []
		this.turn = null
	}
	start() {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].push(this.draw(7))
		}
		this.play_pile.push(this.draw())
		for (var i = 0; i < this.players.length; i++) {
			this.snapshot(this.players[i])
		}
		this.turn = 0
	}
	draw(num) {
		if (num === undefined) {
			return this.draw_pile.pop()
		} else {
			var r = []
			for (var i = 0; i < num; i++) {
				r.push(this.draw_pile.pop())
			}
			return r
		}
	}
	snapshot(player) {
		var data = {
			'draw': {
				'nCards':this.draw_pile.length,
			},
			'play': {
				'nCards':this.play_pile.length,
				'topCard':this.play_pile[this.play_pile.length-1],
			},
			'players': [],
		}
		if (player) {
			for (var i = 0; i < this.players.length; i++) {
				var me = this.players[i].socket.id == player.socket.id
				data.players.push(this.players[i].info(me))
			}
			player.socket.emit('snapshot', data)
		} else {
			data.players = this.players
		}
		return data
	}
	push(socket, data) {
		var socket_index = this.findSocket(socket)
		// check if player has already joined game
		if (socket_index === null) {
			var player = new Player(socket, data.username)
			this.players.push(player)
		} else {
			var player = this.players[socket_index]
			player.socket = socket
		}
		return player
	}
	nPlayers() {
		return this.players.length
	}
	findSocket(socket) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].socket.id == socket.id) {
				return i
			}
		}
		return null
	}
}

Game.Card = Card


// console.log(new Game().getDeck().length)

module.exports = Game