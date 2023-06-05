
let timeout = 120000
let poin = 500
let handler = async (m, { conn, quoted, usedPrefix }) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
  let id = m.chat
  if (id in conn.tebakbendera) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let cbaption = `
  Bendera apakah ini?
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tebe untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.tebakbendera[id] = [
  await conn.sendMessage(m.chat, { image : { url: json.img }, caption: cbaption + `\nKetik ${usedPrefix}tebe *Untuk Mendapatkan Bantuan*` }, { quoted: m }),
    ,
    json, poin,
    setTimeout(async () => {
      if (conn.tebakbendera[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, wm, ['tebakbendera', '/tebakbendera'], conn.tebakbendera[id][0])
      delete conn.tebakbendera[id]
    }, timeout)
  ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i

module.exports = handler