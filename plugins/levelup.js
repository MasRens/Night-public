let { canLevelUp, xpRange } = require ( '../lib/levelling.js')

//import { getRandomHwaifu } from '../lib/functions.js'

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    return m.reply(`
📊 Level ${user.level}
${user.exp - min} / ${xp}
Kurang ${max - user.exp} lagi! ✨
`)
  }

  let before = user.level * 1
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

  if (before !== user.level) {
    let teks = `Selamat ${conn.getName(m.sender)} naik level 🎉`
    let str = `Selamat ${conn.getName(m.sender)} naik level\n\n🎉 C O N G R A T S 🎉\n${before} ➔ ${user.level} [ ${user.role} ]\n📊 Level Sebelumnya: ${before}\n📈 Level Baru: ${user.level}\n🕒 Pada Jam: ${new Date().toLocaleString('id-ID')}\n\nNote: Semakin sering berinteraksi dengan bot, semakin tinggi level kamu.`

    let knights = require ('knights-canvas')
    let image = await new knights.Up()
      .setAvatar(hwaifu.getRandom())
      .toAttachment()
    let data = image.toBuffer()

    try {
      conn.sendFile(teks, user.level)
      conn.sendFile(m.chat, str, m)
    } catch (e) {
      conn.sendFile(m.chat, str, m)
     
    }
  }
}

handler.help = ['levelup']
handler.tags = ['xp']
handler.command = /^level(|up)$/i

module.exports = handler 