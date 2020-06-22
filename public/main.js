var socket = io();

function say(data) {
	socket.emit('say',data)
}

function join_game(username) {
	socket.emit('join_game', {'username':username})
}

function start_game() {
	socket.emit('start_game')
}

// function play(card) {
// 	socket.emit('play', card)
// }

socket.emit('snapshot')


socket.on('echo', function(data) {
	console.log(data)
})

socket.on('hecho', function(data) {
	console.log(data.head, data.data)
})

socket.on('reset', function() {
	$('#hand').empty()
})

socket.on('deal', function(cards) {
	for (var i = 0; i < cards.length; i++) {
		card = cards[i]
		card = new Card(card)
		$('#hand').append(`<img src="${card.image()}">`)
	}
})

socket.on('snapshot', function(data) {
	set_draw_pile(data.draw.nCards)
	set_play_pile(data.play.nCards, new Card(data.play.topCard))
	// console.log(data)
	set_players(data.players)
})