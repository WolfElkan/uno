const K = 79
// const K = 60

const origin = {
	x: K*5,
	y: K*5,
}

function $$(arguments) {
	return $(arguments)[0]
}

const red    = "#ed1d25"
const yellow = "#fede00"
const green  = "#02a650"
const blue   = "#0095db"
const black  = "#000000"

function set_draw_pile(nCards) {
	console.log(`Draw pile contains ${nCards} cards.`)
	if (nCards) {
		$('#draw .card').html(`<img src="images/CardImages/_back.png">`)
	} else {
		$('#draw .card').html(``)
	}
	$('#draw span').text(nCards)
}

function set_play_pile(nCards, topCard) {
	console.log(`Play pile contains ${nCards} cards.`)
	console.log(`The top card is a ${topCard.name()}.`)
	if (nCards) {
		$('#play .card').html(`<img src="${topCard.image()}">`)
	} else {
		$('#play .card').html(``)
	}
	$('#play span').text(nCards)
}

function set_players(players) {
	// $$('#players').innerHTML = '<tr><td></td></tr>'
	// console.log($('#players'))

	for (var i = 0; i < players.length; i++) {
		for (var j = 0; j < players[i].hand.length; j++) {
			var player = players[i]

			var playerTR = document.createElement('TR')
			 var usernameTD = document.createElement('TD')
			  $(usernameTD).text(player.username)
			 playerTR.append(usernameTD)
			 var handTD = document.createElement('TD')
			  for (var j = 0; j < player.hand.length; j++) {
			  	var cardIMG = document.createElement('IMG')
			  	if (player.hand.__proto__.constructor == Array) {
			  		var card = new Card(player.hand[j])
			  	 	cardIMG.src = card.image()
			  	} else {
			  		cardIMG.src = "images/CardImages/_back.png"
			  	}
			  	handTD.append(cardIMG)
			  }
			 playerTR.append(handTD)
			// console.log(playerTR)
			// if (typeof(players[i].hand) == "number") {

			// } else {
			// 	new Card(players[i].hand[j]).image()
			// }
		}
		// players[i]
		console.log([playerTR])
		$$('#players').append(playerTR)
	}
}

// $('#svg').height(origin.y * 2)

// function RENDER(code=svg) {
// 	$('#svg').html(code)
// }

// class Point {
// 	constructor(x, y) {
// 		this.x = x
// 		this.y = y
// 	}
// 	seq() {
// 		return `${this.x},${this.y} `
// 	}
// 	plus(vector) {
// 		return new Vector(this.x + vector.x, this.y + vector.y)
// 	}
// 	rotate(about, degrees) {
// 		var dx = this.x - about.x
// 		var dy = this.y - about.y
// 		var sin = Math.sin(degrees * Math.PI / 180)
// 		var cos = Math.cos(degrees * Math.PI / 180)
// 		this.x = (dx * cos) - (dy * sin) + about.x
// 		this.y = (dy * cos) + (dx * sin) + about.y
// 		return this
// 	}
// }

// class Vector extends Point {
// 	times(coef) {
// 		return new Vector(this.x * coef, this.y * coef)
// 	}
// }

// class Origin extends Point {
// 	constructor(x, y) {
// 		super()
// 		this.x = x * K + origin.x
// 		this.y = y * K + origin.y
// 	}	
// }

// function pointSVGP(points) {
// 	var result = ''
// 	for (var i = 0; i < points.length; i++) {
// 		result += points[i].seq()
// 	}
// 	return result
// }

// function kwargSVGP(obj, isStyle=false) {
// 	var result = ''
// 	for (var key in obj) {
// 		var val = obj[key]
// 		if (key == 'points') {
// 			val = pointSVGP(val)
// 		}
// 		if (key == 'style') {
// 			val = kwargSVGP(val, true)
// 		}
// 		result += isStyle ? `${key}:${val}; ` : `${key}="${val}" `
// 	}
// 	return result
// }

// const ELEMENT_COUNTER = {
// 	// element
// }

// var table = "#e0b88e"

// class Element {
// 	constructor(name, options={}, content='') {
// 		this.name = name
// 		this.options = options
// 		this.content = content
// 	}
// 	svg() {
// 		return `<${this.name.toLowerCase()} ${kwargSVGP(this.options)}>${this.content}</${this.name.toLowerCase()}>\n`
// 	}
// 	render() {
// 		this.element = document.createElement(this.name.toUpperCase())
// 		board.appendChild(this.element)
// 		svg += this.svg()
// 		// RENDER()
// 	}
// }

// class Circle extends Element {
// 	constructor(center, radius, stroke={}) {
// 		super('circle', {
// 			'cx':center.x
// 		})
// 	}
// }

// class Polygon extends Element {
// 	constructor(points, options={}, content='') {
// 		options.points = points
// 		super('polygon', options, content)
// 		this.options = options
// 	}
// 	render() {
// 		svg += this.svg()
// 		// RENDER()
// 	}
// }

// class Hexagon extends Polygon {
// 	constructor(center, options={}, content='') {
// 		if (type(center) == Array) {
// 			center = new HexPoint(center[0], center[1])
// 		} else if (type(center) == Number) {
// 			center = new LabelPoint(center)
// 		}
// 		if (type(options) == String) {
// 			options = {'fill':options}
// 		}
// 		let lef = center.x - (Math.sqrt(3) * K / 2);
// 		let cen = center.x;
// 		let rig = center.x + (Math.sqrt(3) * K / 2);
// 		let top = center.y - K;
// 		let hiy = center.y - K / 2;
// 		let loy = center.y + K / 2;
// 		let bot = center.y + K;
// 		super([
// 			new Point(cen, top),
// 			new Point(rig, hiy),
// 			new Point(rig, loy),
// 			new Point(cen, bot),
// 			new Point(lef, loy),
// 			new Point(lef, hiy),
// 		],options,content)
// 		this.center = center
// 		this.name = 'Polygon'
// 	}
// }

// class Rectangle extends Polygon {
// 	constructor(x1, x2, y1, y2, options={}) {
// 		if (type(x1) == Array) {
// 			var lef = x1[0]
// 			var rig = x1[1]
// 			var bot = x1[2]
// 			var top = x1[3]
// 			options = x2
// 		} else {
// 			var lef = x1
// 			var rig = x2
// 			var bot = y1
// 			var top = y2
// 		}
// 		super([
// 			new Point(lef,bot),
// 			new Point(lef,top),
// 			new Point(rig,top),
// 			new Point(rig,bot)
// 		],options)
// 	}
// }

// $(document).ready(function() {
// 	$('#svg').width(800)	
// })
