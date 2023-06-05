var handler = async(m, { conn, args, text } ) => {
m.reply(mess.wait)
await conn.sendFile(m.chat, Buffer.isBuffer(text) ? text : await getbuffer(text), '.jpg', '',null)
}
handler.command = ['get']
module.exports = handler