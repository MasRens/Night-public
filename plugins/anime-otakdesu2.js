var noapi = require('../lib/api')
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text) throw m.reply(`Use example ${usedPrefix}${command} Anime`)
    let result = await noapi.otakudesu(text)
    let datathumb = await(await fetch(result.img)).buffer()
    let otaku = `
*JUDUL:* ${result.judul}
*JEPANG:* ${result.jepang}
*RATE:* ${result.rate}
*PRODUSER:* ${result.produser}
*TIPE:* ${result.tipe}
*STATUS:* ${result.status}
*EPISODE:* ${result.episode}
*DURASI:* ${result.durasi}
*RILIS:* ${result.rilis}
*STUDIO:* ${result.studio}
*GENRE:* ${result.genre}
*DESC:* ${result.desc}
*BATCH:* ${result.batch}
`
await conn.sendImage(m.chat, datathumb, otaku, m)
}

handler.help = ['otakudesu2'].map(v => v + ' <Apa>')
handler.tags = ['anime']
handler.command = /^(otakudesu2)$/i

module.exports = handler
