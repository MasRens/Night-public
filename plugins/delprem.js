
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }
  
  if (!text) return conn.reply(m.chat, `*❏ GET NUMBER*\n\n• ${usedPrefix}unprem number|days\n*Example:* ${usedPrefix}unprem 6289654360447|99\n\n• ${usedPrefix}unprem @tag|days\n*Example:* ${usedPrefix}unprem @6289654360447|99`, m)
  text = no(text) + "@s.whatsapp.net"
  global.db.data.users[text].premium = false
  global.db.data.users[text].premiumDate = 0
  conn.reply(m.chat,`*Berhasil menghapus akses premium untuk @${text.split('@')[0]}.*`,m,{ contextInfo: { mentionedJid: [text] } })

}
handler.help = ['dellprem']
handler.tags = ['owner']
handler.command = /^(dellprem)$/i
handler.owner = true
handler.fail = null
module.exports = handler