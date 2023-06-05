let fs = require('fs')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw m.reply(`uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} menu`)
    if (!m.quoted.text) throw m.reply(`balas pesan nya!`)
    let path = `${text}`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`tersimpan di ${path}`)
}
handler.help = ['sfp'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^sfp$/i

handler.owner = true
module.exports = handler
