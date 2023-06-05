const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw m.reply(`Kamu sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`)
  if (!Reg.test(text)) throw m.reply(`contoh:\n*${usedPrefix + command} manusia.16*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw m.reply('Nama tidak boleh kosong (Night)')
  if (!age) throw m.reply('Umur tidak boleh kosong (Angka)')
  age = parseInt(age)
  if (age > 50) throw m.reply('Umur terlalu tua')
  if (age < 5) throw m.reply('Bayi bisa ngetik sesuai format bjir ._., tapi gatau juga bocil skrg epic² pasti anak ngen ngep:v')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let prefix = usedPrefix
  let sn = createHash('md5').update(m.sender).digest('hex')
  conn.sendText(m.chat, `
┌─「 *daftar berhasil* 」
├ Nama: ${name}
├ Umur: ${age}
├ User: ${namaBot}
└────  

*SN* (Serial Number) di kirim di chat pribadi dan digunakan untuk daftar ulang, jika lupa *SN* silahkan ketik *${usedPrefix}ceksn* untuk mengecek *SN* kamu!
`.trim(), m) 
conn.sendMessage(m.sender, {text: `*SN (Serial Number:*) Anda ${sn}`}, m)
}
handler.help = ['verifikasi', 'register'].map(v => v + ' <name>.<age>')
handler.tags = ['xp']

handler.command = /^(verifikasi|reg(is(ter))?)$/i

module.exports = handler