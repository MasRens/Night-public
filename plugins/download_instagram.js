
var handler = async (m,{ command, conn, text})=> {
if (!text) return m.reply(`Use example ${command} https://www.instagram.com/p/CMeFrnTp8as`)
require('../lib/api3'). igdl(text).then(result => {
conn.sendMessage(m.chat, {react: {text: ('🕐'), key: m.key, }})
for(let ini of result.url) {
 conn.sendFile(m.chat, ini, '', `*Title :* ${result.title}\n\n${mess.done}`, m)
}
})
}
handler.tags = handler.command = ['igdl', 'igfoto', 'igvideo', 'ig', 'instagram']
handler.limit = true
handler.register = false

module.exports = handler
