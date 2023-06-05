var Facebook = require('../lib/fb')
var handler = async (m, {
    command,
    conn,
    text
}) => {
    if (!text) return m.reply(`Use example ${command} linkfb`)
    const json = await Facebook(text)
    conn.sendMessage(m.chat, {react: {text: ('🕟'), key: m.key, }})
    let result = json.data.find(v => v.type == 'HD' && v.response == 200)
    conn.sendFile(m.chat, result.url, 'mp4', `◦ *Quality* : ${result.type}`, m)
    if (result) {
     } else {
     let result = json.data.find(v => v.type == 'SD' && v.response == 200)
     if (!result) return conn.reply(m.chat, mess.link1, m)
     conn.sendFile(m.chat, result.url, 'mp4', `◦ *Quality* : ${result.type}`, m)
    }
}
handler.tags = handler.command = ['fb', 'fbdl', 'facebook']
handler.limit = true
handler.register = false

module.exports = handler