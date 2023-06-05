var timeout = 120000
var poin = 3000
var handler = async (m, { conn, usedPrefix }) => {
	conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
	var {
		siapakahaku
	} = await import('@bochilteam/scraper');
	var id = m.chat
	if (id in conn.siapakahaku) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
		throw false
	}
	var json = await siapakahaku()
	var caption = `
Siapakah aku? ${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} Exp & Money
`.trim()
	conn.siapakahaku[id] = [
		await conn.sendButton(m.chat, caption, author, ['hint', `${usedPrefix}who`], m),
		json, poin,
		setTimeout(() => {
			if (conn.siapakahaku[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, ['siapahaku', '/siapakahaku'], conn.siapakahaku[id][0])
			delete conn.siapakahaku[id]
		}, timeout)
	]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

module.exports = handler