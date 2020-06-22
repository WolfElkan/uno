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

var hand

function set_draw_pile(nCards) {
	console.log(`Draw pile contains ${nCards} card${nCards == 1 ? '' : 's'}.`)
	if (nCards) {
		$('#draw .card').html(`<img src="images/CardImages/_back.png">`)
	} else {
		$('#draw .card').html(``)
	}
	$('#draw span').text(nCards)
}

function set_play_pile(nCards, topCard) {
	console.log(`Play pile contains ${nCards} card${nCards == 1 ? '' : 's'}.`)
	if (nCards) {
		console.log(`The top card is a ${topCard.name()}.`)
	}
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
	hand = []
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
			  		hand.push(card)
			  	 	cardIMG.src = card.image()
			  	 	$(cardIMG).addClass('card faceup inhand')
			  	 	$(cardIMG).addClass('s'+card.s)
			  	 	$(cardIMG).attr('id',card.cvs())
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
		arm_cards()
	}
}

function findex_card(cardIMG) {
	var card = new Card(cardIMG)
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].cvs() == card.cvs()) {
			return i
		}
	}
}

function arm_cards() {
	$('.inhand').click(function() {
		var index = findex_card(this)
		play(hand.splice(index,1)[0])
		this.remove()
	})
}
