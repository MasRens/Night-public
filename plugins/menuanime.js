let { fetchJson } = require('../lib/myfunc')
var handler = async (m, {command, conn, usedPrefix }) => {

try {
switch (command) {
case 'akira': case 'boruto': case 'akira':
     case 'chitoge': case 'deidara': case 'doraemon': case 'elaina':
     case 'emilia': case 'erza': case 'gremory': case 'hestia':
     case 'hinata': case 'inori': case 'isuzu': case 'itachi':
     case 'itori': case 'kaga': case 'doraemon': case 'kagura':
     case 'kakasih': case 'kaori': case 'kotori': case 'keneki':
     case 'madara': case 'megumin': case 'nekonime': case 'sagiri':
     case 'asuna': case 'ayuzawa': case 'akiyama': case 'toukachan': case 'loli':
               conn.sendMessage(m.chat, {react: {text: ('🕟'), key: m.key, }})
               anu = await fetchJson(`https://raw.githubusercontent.com/Restaa/databasegames/master/anime/${command}.json`)
               result = pickRandom(anu)
               conn.sendMessage(m.chat, { image: { url: result }, caption: `Random Anime ${command}` }, { quoted: m })
	           break
default:
}
} catch (err) {
		m.reply("Error\n\n\n" + err.stack)
	}
}
handler.help = ['akira', 'boruto', 'chitoge', 'deidara', 'doraemon', 'elaina', 'emilia', 'erza', 'gremory', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kakasih', 'kaori', 'kotori', 'keneki', 'madara', 'megumin', 'nekonime', 'sagiri', 'asuna', 'ayuzawa', 'akiyama', 'toukachan', 'loli']
handler.command = ['akira', 'boruto', 'chitoge', 'deidara', 'doraemon', 'elaina', 'emilia', 'erza', 'gremory', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kakasih', 'kaori', 'kotori', 'keneki', 'madara', 'megumin', 'nekonime', 'sagiri', 'asuna', 'ayuzawa', 'akiyama', 'toukachan', 'loli']       
handler.limit = true
handler.register = true
module.exports = handler

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
		     }