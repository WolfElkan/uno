var socket = io();

function say(data) {
	socket.emit('say',data)
}

socket.on('echo', function(data) {
	console.log(data)
})

socket.on('deal', function(cards) {
	for (var i = 0; i < cards.length; i++) {
		card = cards[i]
		card = new Card(card)
		console.log(card)
		$('#hand').append(`<img src="${card.image()}">`)
		// `<img src="${card.image()}">`
	}
})