const {
	mediafireDl
} = require('../lib/mediafire.js')
let handler = async (m, {
	conn,
	text,
	args,
	isPrems,
	usedPrefix,
	command
}) => {
	if (!isPrems) throw m.reply(mess.prem)
	if (!text) return m.reply(`Kirim perintah ${usedPrefix + command} *link mediafire*`)
	if (!args[0].includes('mediafire.com')) return m.reply(mess.link)
	conn.sendMessage(m.chat, {react: {text: ('🕟'), key: m.key, }})
	let mdjon = args.join(' ')
	res = await mediafireDl(mdjon)
	result = `「 *MEDIAFIRE DOWNLOAD* 」
*Data Berhasil Didapatkan!*
🆔 Nama : ${res[0].nama}
📊 Ukuran : ${res[0].size}
💬 Link : ${res[0].link}
_Tunggu Proses Upload Media_`
	m.reply(result)
	conn.sendMessage(m.chat, {
		document: {
			url: res[0].link
		},
		fileName: `${res[0].nama}`,
		mimetype: res[0].mime
	}, {
		quoted: m
	})
}
handler.help = ['mediafire']
handler.command = ['mediafire']
handler.register = true
module.exports = handler