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
			'R':"Red",
			'Y':"Yellow",
			'G':"Green",
			'B':"Blue",
			'W':"Wild",
		}[this.c]
	}
	value() {
		if (this.v == 'D') {
			return this.c == 'W' ? "Draw Four" : "Draw Two"
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
		this.draw_pile = this.getDeck()
		this.play_pile = [this.draw()]
	}
	getDeck() {
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
}
Game.Card = Card


// console.log(new Game().getDeck().length)

module.exports = Game