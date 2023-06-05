var similarity = require('similarity');
var threshold = 0.72
var handler = m => m
handler.before = async function(m) {
	var id = m.chat
	if (!m.quoted || !m.text || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*suka/i.test(m.quoted.text)) return !0
	this.susunkata = this.susunkata ? this.susunkata : {}
	if (!(id in this.susunkata)) return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, ['susunkata', '/susunkata'], m)
	if (m.quoted.id == this.susunkata[id][0].id) {
		var json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			db.data.users[m.sender].exp += this.susunkata[id][2]
			db.data.users[m.sender].money += this.susunkata[id][2]
			conn.sendButton(m.chat, `*Benar!*\n+${this.susunkata[id][2]} Exp & Money`, author, ['susunkata', '/susunkata'], m)
			clearTimeout(this.susunkata[id][3])
			delete this.susunkata[id]
		} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
		else m.reply(`*Salah!*`)
	}
	return !0
}

module.exports = handler