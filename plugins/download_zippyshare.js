var  { extract } = require ('zs-extract')
var { lookup } = require ('mime-types')

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw m.reply('Input URL')
  if (!args[0].includes('zippyshare.com/v')) m.reply('Invalid URL')
  await conn.sendMessage(m.chat, {react: {text: ('🕟'), key: m.key, }})
  for (let i = 0; i < args.length; i++) {
    if (!args[i].includes('zippyshare.com/v')) continue
    let res = await extract(args[i])
    let mimetype = await lookup(res.download)
    conn.sendMessage(m.chat, { document: { url: res.download }, fileName: res.filename, mimetype }, { quoted: m })
  }
}
handler.help = ['zippyshare']
handler.tags = ['downloader']
handler.alias = ['zs', 'zippy', 'zippydl', 'zippyshare']
handler.command = /^z(s|ippy(dl|share)?)$/i 
handler.register = false

module.exports = handler
