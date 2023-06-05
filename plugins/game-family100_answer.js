var similarity = require('similarity')
var threshold = 0.72
var handler = m => m
handler.before = async function(m) {
	conn.game = conn.game ? conn.game : {}
	var id = 'family100_' + m.chat
	if (!(id in conn.game))
		return !0
	var room = conn.game[id]
	var text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
	var isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
	if (!isSurrender) {
		var index = room.jawaban.indexOf(text)
		if (index < 0) {
			if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => similarity(jawaban, text))) >= threshold)
				m.reply('Dikit lagi!')
			return !0
		}
		if (room.terjawab[index])
			return !0
		var users = db.data.users[m.sender]
		room.terjawab[index] = m.sender
		users.exp += room.winScore
		users.money += room.winScore
	}
	var isWin = room.terjawab.length === room.terjawab.filter(v => v).length
	var caption = `
*Soal:* ${room.soal}
Terdapat *${room.jawaban.length}* jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
` : ''}
${isWin ? `*SEMUA JAWABAN TERJAWAB*` : isSurrender ? '*MENYERAH!*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
        return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
    }).filter(v => v).join('\n')}
${isSurrender ? '' : `+${room.winScore} Exp & Money tiap jawaban benar`}
    `.trim()
	var msg = await conn.sendButton(m.chat, caption, author, null, [
		[`${(isWin || isSurrender) ? '.Family100' : 'Nyerah'}`, `${(isWin || isSurrender) ? '.Family100' : 'nyerah'}`]
	], null, {
		mentions: conn.parseMention(caption)
	})
	room.msg = msg
	if (isWin || isSurrender)
		delete conn.game[id]
	return !0
}

module.exports = handler