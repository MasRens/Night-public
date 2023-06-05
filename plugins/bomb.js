const BigBossGenerator = require('lib/generator/BigBoss')
let handler = async (m, { conn, text, args, usedPrefix, command }) => {

if (!text) return conn.reply(isPrefix, command, 'ini bapack budi')
         conn.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let Generator = new BigBossGenerator({
            font: 'arch',
            color: 'black',
            size: 19
         })
         Generator.image = 'book'
         await Generator.loadImage()
         await Generator.write(text)
         const image = await Generator.buffers[0]
         conn.sendFile(m.chat, image, 'image.jpg', `🍟 *Processed* : ${((new Date - old) * 1)} ms`, m)
      } catch (e) {
         return conn.reply(m.chat, (e), m)
      }
      }
handler.command = handler.help = ['nulis']
module.exports = handler