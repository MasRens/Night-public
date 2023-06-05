var timeout = 120000
var poin = 3000
var handler = async (m, {
	conn,
	usedPrefix
}) => {
	conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
	var id = m.chat
	if (id in conn.tebakkimia) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkimia[id][0])
		throw false
	}
	var res = require("../src/database/unsurkimia.json")
	var json = res[Math.floor(Math.random() * res.length)]
	log(json)
	var caption = `
Nama unsur dari lambang ${json.lambang} adalah...

Timeout *${(timeout / 1000).toFixed(2)} detik*
Clue: ${json.nama.replace(/[a-zA-Z]/g, ' _')}
nomer_atom: ${json.nomer_atom}
Ketik ${usedPrefix}teki untuk bantuan
Bonus: + ${poin} Exp & Money
`.trim()
	conn.tebakkimia[id] = [
		await conn.reply(m.chat, caption, m),
		json, poin,
		setTimeout(() => {
			if (conn.tebakkimia[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.nama}*`, conn.tebakkimia[id][0])
			delete conn.tebakkimia[id]
		}, timeout)
	]
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i

module.exports = handler