var similarity = require('similarity');
var threshold = 0.72
var handler = m => m
handler.before = async function(m) {
	var id = m.chat
	if (!m.quoted || !m.text || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tebe/i.test(m.quoted.text)) return !0
	this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}
	if (!(id in this.tebakbendera)) return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, ['tebakbendera', '/tebakbendera'], m)
	if (m.quoted.id == this.tebakbendera[id][0].id) {
		var json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			db.data.users[m.sender].exp += this.tebakbendera[id][2]
			db.data.users[m.sender].money += this.tebakbendera[id][2]
			conn.sendButton(m.chat, `*Benar!*\n+${this.tebakbendera[id][2]} Exp & Money`, wm, ['tebakbendera', '/tebakbendera'], m)
			clearTimeout(this.tebakbendera[id][3])
			delete this.tebakbendera[id]
		} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
		else m.reply(`*Salah!*`)
	}
	return !0
}

module.exports = handler