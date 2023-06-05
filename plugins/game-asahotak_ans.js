var similarity = require('similarity');
var threshold = 0.72
var handler = m => m
handler.before = async function(m) {
	var id = m.chat
	if (!m.quoted || !m.text || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*apok/i.test(m.quoted.text)) return !0
	this.asahotak = this.asahotak ? this.asahotak : {}
	if (!(id in this.asahotak)) return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, ['asahotak', '/asahotak'], m)
	if (m.quoted.id == this.asahotak[id][0].id) {
		var json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
		// m.reply(JSON.stringify(json, null, '\t'))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			db.data.users[m.sender].exp += this.asahotak[id][2]
			db.data.users[m.sender].money += this.asahotak[id][2]
			conn.sendButton(m.chat, `*Benar!*\n+${this.asahotak[id][2]} Exp & Money`, author, ['asahotak', '/asahotak'], m)
			clearTimeout(this.asahotak[id][3])
			delete this.asahotak[id]
		} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
		else m.reply(`*Salah!*`)
	}
	return !0
}

module.exports = handler