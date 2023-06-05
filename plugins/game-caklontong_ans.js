var similarity = require('similarity')
var threshold = 0.72
var handler = m => m
handler.before = async function(m) {
	var id = m.chat
	if (!m.quoted || !m.text || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*calo/i.test(m.quoted.contentText))
		return !0
	this.caklontong = this.caklontong ? this.caklontong : {}
	if (!(id in this.caklontong))
		return m.reply('Soal itu telah berakhir')
	if (m.quoted.id == this.caklontong[id][0].id) {
		var json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			db.data.users[m.sender].exp += this.caklontong[id][2]
			db.data.users[m.sender].money += this.caklontong[id][2]
			await this.sendButton(m.chat, `*Benar!* +${this.caklontong[id][2]} Exp & Money\n${json.deskripsi}`, author, null, [
				['Cak Lontong', '.caklontong']
			], m)
			clearTimeout(this.caklontong[id][3])
			delete this.caklontong[id]
		} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
			m.reply(`*Dikit Lagi!*`)
		else
			m.reply(`*Salah!*`)
	}
	return !0
}
module.exports = handler