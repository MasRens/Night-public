var handler = m => m
handler.before = async function(m) {
	if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
	var id = m.chat
	// if (!m.quoted || m.quoted.sender != conn.user.jid || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
	conn.math = conn.math ? conn.math : {}
	try {
		if (!(id in conn.math) && /^Berapa hasil dari/i.test(m.quoted.text)) return m.reply('Soal itu telah berakhir')
		// if (m.quoted.id == conn.math[id][0].id) {
		var math = JSON.parse(JSON.stringify(conn.math[id][1]))
		if (m.text == math.result) {
			db.data.users[m.sender].exp += math.bonus
			db.data.users[m.sender].money += math.bonus
			clearTimeout(conn.math[id][3])
			delete conn.math[id]
			await conn.sendButton(m.chat, `*Jawaban Benar!*\n+${math.bonus} Exp & Money`, author, null, [
				['again', `/math ${math.mode}`]
			], m)
		} else {
			if (--conn.math[id][2] == 0) {
				clearTimeout(conn.math[id][3])
				delete conn.math[id]
				await conn.sendButton(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, author, null, [
					['again', `/math ${math.mode}`]
				], m)
			} else m.reply(`*Jawaban Salah!*\nMasih ada ${conn.math[id][2]} kesempatan`)
		}
	} catch (e) {
		return
	}
	// }
	return !0
}

module.exports = handler