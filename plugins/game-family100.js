var winScore = 2000
async function handler(m,{conn}) {
	var {
		family100
	} = await import('@bochilteam/scraper');
	conn.game = conn.game ? conn.game : {}
	var id = 'family100_' + m.chat
	if (id in conn.game) {
		conn.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', conn.game[id].msg)
		throw false
	}
	var json = await family100()
	log(json.jawaban)
	var caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} Exp & Money tiap jawaban benar
	`.trim()
	conn.game[id] = {
		id,
		msg: await conn.sendButton(m.chat, caption, author, null, [
			['Nyerah', 'nyerah']
		], m),
		...json,
		terjawab: Array.from(json.jawaban, () => false),
		winScore,
	}
}
handler.help = ['family100']
handler.tags = ['game']
handler.limit = true
handler.command = /^family100$/i

module.exports = handler