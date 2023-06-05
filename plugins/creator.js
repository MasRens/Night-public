var handler = function(m) {
	var data = global.owner.filter(([id, isCreator, Rowner]) => id && Rowner)
	conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler