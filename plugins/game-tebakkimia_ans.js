var handler = m => m
handler.before = async function(m) {
	var id = m.chat
	if (!m.quoted || !m.quoted.fromMe || !m.text || !m.quoted.isBaileys || !/Ketik.*teki/i.test(m.quoted.text)) return !0
	conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
	if (!(id in conn.tebakkimia)) return m.reply('Soal itu telah berakhir')
	if (m.quoted.id == conn.tebakkimia[id][0].id) {
		var json = JSON.parse(JSON.stringify(conn.tebakkimia[id][1]))
		// m.reply(JSON.stringify(json, null, '\t'))
		if (m.text.toLowerCase() == json.nama.toLowerCase().trim()) {
			db.data.users[m.sender].money += conn.tebakkimia[id][2]
			db.data.users[m.sender].exp += conn.tebakkimia[id][2]
			m.reply(`*Benar!*\nhadiah: ${conn.tebakkimia[id][2]} money & exp\n\nnama: *${json.nama}*\nlambang: *${json.lambang}*\nnomor atom: *${json.nomer_atom}*`)
			clearTimeout(conn.tebakkimia[id][3])
			delete conn.tebakkimia[id]
		} else if (m.text.toLowerCase().endsWith(json.nama.split` ` [1])) m.reply(`*Dikit Lagi!*`)
		else m.reply(`*Salah!*`)
	}
	return !0
}
handler.exp = 6

module.exports = handler