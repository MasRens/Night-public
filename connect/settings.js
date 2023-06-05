process.on('uncaughtException', console.error) //Safe Log Error 
const fs = require('fs')
const { modul } = require('../botnew');
const { speed } = modul;
let timestamp = speed()
let latensi = speed() - timestamp
const chalk = require('chalk')
const moment = require ('moment-timezone')
global.log = function log() {
	var args = [].slice.call(arguments);
	console.log.apply(console, args);
}
global.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let d = new Date(new Date + 3600000)
let locale = 'id'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
global.limitawal = {
    premium: "Infinity",
    free: 10
}
let wibh = moment.tz('Asia/Jakarta').format('HH')
let wibm = moment.tz('Asia/Jakarta').format('mm')
let wibs = moment.tz('Asia/Jakarta').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
global.botdate = `⫹⫺ DATE: ${week} ${date}\n⫹⫺ 𝗧𝗶𝗺𝗲: ${wktuwib}`
global.bottime = `T I M E : ${wktuwib}`
//Ubah Disini
global.owner = [
	//  ['6281234288573'],
	//['12546153210'],
	//['62895368900456'],
	['62895368900456', 'Resta X TKJ', true],
	['62895368900456','QEERTY']
	// [number, dia creator/owner?, dia developer?]
] // Put your number here
global.ownerName = 'Restaa x Team TKJ'
// Bot version
global.version = '10.4.0',
// Bot name
global.namaBot = '𝐍𝐢𝐠𝐡𝐭 𝐁𝐨𝐭'
global.creator = 'Restaa x Team TKJ'
global.wm = `© Night-bot v${global.version} (Public Bot)`
global.packname = '𝐍𝐢𝐠𝐡𝐭 𝐁𝐨𝐭' 
global.author = 'TKJ x RPL'
global.sessionName = 'botmd'
global.multiplier = 1000 
global.autoAI = false //Auto Prefix ? ubh ke true
//Message Nya Ubah Disini
global.mess = {
admin: '*ᴏɴʟʏ ᴀᴅᴍɪɴ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ',
botAdmin: 'This feature can only be used when the bot becomes admin!',
botOwner: '*ᴏɴʟʏ ᴅᴇᴠᴇʟᴏᴘᴇʀ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ',
group: 'This command can only be used in groups!\n\n Let s Join Group 𝐍𝐢𝐠𝐡𝐭 𝐁𝐨𝐭\nhttps://chat.whatsapp.com/G9scsXanjUT6xNa9A2Va1e',
private: 'Only Private Chat',
wait: '[ WAIT ] Retrieving data from server Wait a moment 1-5 minutes⏳',
endLimit: `Maaf Limit Kamu Telah Habis\n\nKamu dapat membeli premium user untuk mendapatkan limit unlimited, ketik #owner\n\nLimit akan diriset pada pukul 00:00 setiap harinya`,
prem: 'Sorry you are not a premium user. Please buy by typing #owner',
link: '[❗] The link you sent is invalid!', 
link1: 'The link you are using is error',
nsfw: 'Nsfw not yet activated in this group',
api : 'Maaf Seperti Ada Kesalahan Dalam Server',
regis: 'Sɪʟᴀʜᴋᴀɴ ᴅᴀғᴛᴀʀ ᴜɴᴛᴜᴋ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ ᴅᴇɴɢᴀɴ ᴄᴀʀᴀ ᴍᴇɴɢᴇᴛɪᴋ:\n\n*#verifikasi ɴᴀᴍᴀ.ᴜᴍᴜʀ*\n\nCᴏɴᴛᴏʜ: *#verifikasi Mᴀɴᴜꜱɪᴀ.16*',
done: `sιмᴘʟᴇ wнᴀтsᴀᴘᴘ ʙoт мoᴅᴇ ɴιԍнтッ\nSpeed: ${latensi.toFixed(4)} Second`
}
global.APIs = {
nrtm: 'https://nurutomo.herokuapp.com/',
ghst: 'https://ghostui-api.herokuapp.com/',
beni: 'https://rest-beni.herokuapp.com/',
fatih: 'https://api.fatiharridho.my.id/'
}
global.APIKeys = {
'https://ghostui-api.herokuapp.com/': 'anjayi'
}

/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
      string = string.toLowerCase()
      let emot = {
          Fox: "🦊",
          agility: "🤸‍♂️",
          anggur: "🍇",
          apel: "🍎",
          aqua: "🥤",
          arc: "🏹",
          armor: "🥼",
          bank: "🏦",
          batu: "🧱",
          berlian: "💎",
          bibitanggur: "🍇",
          bibitapel: "🍎",
          bibitjeruk: "🍊",
          bibitmangga: "🥭",
          bibitpisang: "🍌",
          botol: "🍾",
          bow: "🏹",
          bull: "🐃",
          cat: "🐈",
          centaur: "🎠",
          chicken: "🐓",
          coal: "⚱️",
          common: "📦",
          cow: "🐄",
          crystal: "🔮",
          darkcrystal: "♠️",
          diamond: "💎",
          dog: "🐕",
          dragon: "🐉",
          eleksirb: "🧪",
          elephant: "🐘",
          emasbatang: "🪙",
          emasbiasa: "🥇",
          emerald: "💚",
          exp: "✉️",
          fishingrod: "🎣",
          foodpet: "🍱",
          fox: "🦊",
          gardenboc: "🗳️",
          gardenboxs: "📦",
          gems: "🍀",
          giraffe: "🦒",
          gold: "👑",
          griffin: "🦒",
          health: "❤️",
          healtmonster: "❤‍🔥",
          horse: "🐎",
          intelligence: "🧠",
          iron: "⛓️",
          jeruk: "🍊",
          kaleng: "🥫",
          kardus: "📦",
          kayu: "🪵",
          ketake: "💿",
          keygold: "🔑",
          keyiron: "🗝️",
          knife: "🔪",
          koinexpg: "👛",
          kucing: "🐈",
          kuda: "🐎",
          kyubi: "🦊",
          legendary: "🗃️",
          level: "🧬",
          limit: "🌌",
          lion: "🦁",
          magicwand: "⚕️",
          makanancentaur: "🥗",
          makanangriffin: "🥙",
          makanankyubi: "🍗",
          makanannaga: "🍖",
          makananpet: "🥩",
          makananphonix: "🧀",
          mana: "🪄",
          mangga: "🥭",
          money: "💵",
          mythic: "🗳️",
          mythic: "🪄",
          naga: "🐉",
          pancingan: "🎣",
          pet: "🎁",
          petFood: "🍖",
          phonix: "🦅",
          pickaxe: "⛏️",
          pisang: "🍌",
          pointxp: "📧",
          potion: "🥤",
          rock: "🪨",
          rubah: "🦊",
          sampah: "🗑️",
          serigala: "🐺",
          snake: "🐍",
          stamina: "⚡",
          strength: "🦹‍♀️",
          string: "🕸️",
          superior: "💼",
          sword: "⚔️",
          tiger: "🐅",
          tiketcoin: "🎟️",
          trash: "🗑",
          umpan: "🪱",
          uncommon: "🎁",
          upgrader: "🧰",
          wood: "🪵"
      }
      let results = Object.keys(emot).map(v => [v, new RegExp(v, "gi")]).filter(v => v[1].test(string))
      if (!results.length) return ""
      else return emot[results[0][0]]
  }
}

//Sesuaikan
global.thumb1 = 'https://telegra.ph/file/669cdcdd10761aabc5c86.jpg'
global.loc = 'https://telegra.ph/file/669cdcdd10761aabc5c86.jpg'
global.erorurl =  'https://telegra.ph/file/df5397e6ed9ebcd05c0cb.jpg'

    function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})
