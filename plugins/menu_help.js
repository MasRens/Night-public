srl = '┠❥'
ctc = '╿'
tetks = '*Text*'
lijnk = '*Links*'
query = '*Query*'
npo = '*Number*'
mv = '*Image/Video*'
im = '*Image*'
sd = '*Sound*'
lep2 = '╭─❒'
ttp = '\`\`\`'
sk = '*Sticker*'
kd = '*Kode Nagara*'
tmg = '*Image [ text | text ]*'
emp = '⫹⫺'
tag = '*62xxx*'
vd ='*Video*'
emo = '*Emoji*'
pep = '┷┯'
plp = '┯┷'
rs = '╰╼❥ '
qp = '┏'
var handler = async (m, {command, conn, usedPrefix }) => {
	
text =`
${qp}  *${emp + wm + emp}* 
${ctc}
${ctc}
${srl} Name : ${db.data.users[m.sender].name} / Umur : ${db.data.users[m.sender].age}
${srl} Premium : ${db.data.users[m.sender].premium ? '✅' : '❌'}
${srl} Limit : ${db.data.users[m.sender].limit}
${ctc}
${pep}☾ Other Command ☽
   ${ctc}
   ${srl} ${usedPrefix}botstatus
   ${srl} ${usedPrefix}verifikasi ${tetks}
   ${srl} ${usedPrefix}unreg ${tetks}
   ${srl} ${usedPrefix}afk ${tetks}
   ${srl} ${usedPrefix}openai ${tetks}
   ${srl} ${usedPrefix}ai-image ${tetks}
   ${srl} ${usedPrefix}simi ${tetks}
   ${srl} ${usedPrefix}tts ${kd} ${tetks}
   ${srl} ${usedPrefix}ceksn
   ${srl} ${usedPrefix}sewabot
   ${srl} ${usedPrefix}inews
   ${srl} ${usedPrefix}limit
   ${srl} ${usedPrefix}pantun
   ${srl} ${usedPrefix}kataanime
   ${srl} ${usedPrefix}randomgore
   ${srl} ${usedPrefix}hentaivid
   ${srl} ${usedPrefix}asupan
   ${srl} ${usedPrefix}asupanloli
   ${srl} ${usedPrefix}asupanbocil
   ${srl} ${usedPrefix}asupangeayubi
   ${srl} ${usedPrefix}asupansantuy
   ${srl} ${usedPrefix}asupanukhty
   ${ctc}
${plp} ☾ Anime Command ☽
${ctc}
${srl} ${usedPrefix}akira 
${srl} ${usedPrefix}boruto 
${srl} ${usedPrefix}akira
${srl} ${usedPrefix}chitoge 
${srl} ${usedPrefix}deidara 
${srl} ${usedPrefix}doraemon 
${srl} ${usedPrefix}elaina
${srl} ${usedPrefix}emilia 
${srl} ${usedPrefix}erza 
${srl} ${usedPrefix}gremory 
${srl} ${usedPrefix}hestia
${srl} ${usedPrefix}hinata 
${srl} ${usedPrefix}inori 
${srl} ${usedPrefix}isuzu 
${srl} ${usedPrefix}itachi
${srl} ${usedPrefix}itori 
${srl} ${usedPrefix}kaga 
${srl} ${usedPrefix}doraemon 
${srl} ${usedPrefix}kagura
${srl} ${usedPrefix}kakasih 
${srl} ${usedPrefix}kaori 
${srl} ${usedPrefix}kotori 
${srl} ${usedPrefix}keneki
${srl} ${usedPrefix}madara 
${srl} ${usedPrefix}megumin 
${srl} ${usedPrefix}nekonime 
${srl} ${usedPrefix}sagiri
${srl} ${usedPrefix}asuna 
${srl} ${usedPrefix}ayuzawa
${srl} ${usedPrefix}akiyama 
${srl} ${usedPrefix}toukachan 
${srl} ${usedPrefix}loli
${ctc}
${pep} ☾ Converter Command ☽
   ${ctc}
   ${srl} ${usedPrefix}sticker ${im}
   ${srl} ${usedPrefix}stickergif ${vd}
   ${srl} ${usedPrefix}quotly ${tetks}
   ${srl} ${usedPrefix}attp ${tetks}
   ${srl} ${usedPrefix}ttp ${tetks}
   ${srl} ${usedPrefix}toimg ${im}
   ${srl} ${usedPrefix}wasted ${im}
   ${srl} ${usedPrefix}comrade ${im}
   ${srl} ${usedPrefix}horny ${im}
   ${srl} ${usedPrefix}blur ${im}
   ${srl} ${usedPrefix}pixelate ${im}
   ${srl} ${usedPrefix}simpcard ${im}
   ${srl} ${usedPrefix}lolice ${im}
   ${srl} ${usedPrefix}gay ${im}
   ${srl} ${usedPrefix}jail ${im}
   ${srl} ${usedPrefix}stickerwm ${tmg}
   ${srl} ${usedPrefix}stickermeme ${tmg}
   ${srl} ${usedPrefix}emojimix ${emo}
   ${srl} ${usedPrefix}emojimix2 ${emo}
   ${srl} ${usedPrefix}tourl ${mv}
   ${srl} ${usedPrefix}tomp3 ${sd}
   ${srl} ${usedPrefix}tinyurl ${lijnk}
   ${srl} ${usedPrefix}bass ${sd}
   ${srl} ${usedPrefix}blown ${sd}
   ${srl} ${usedPrefix}deep ${sd}
   ${srl} ${usedPrefix}audio8d ${sd}
   ${srl} ${usedPrefix}earrape ${sd}
   ${srl} ${usedPrefix}fast ${sd}
   ${srl} ${usedPrefix}fat ${sd}
   ${srl} ${usedPrefix}nightcore ${sd}
   ${srl} ${usedPrefix}reverse ${sd}
   ${srl} ${usedPrefix}robot ${sd}
   ${srl} ${usedPrefix}slow ${sd}
   ${srl} ${usedPrefix}smooth ${sd}
   ${srl} ${usedPrefix}chipmunk ${sd}
   ${srl} ${usedPrefix}vibra ${sd}
   ${ctc}
${plp} ☾ Downloader Command ☽
${ctc}
${srl} ${usedPrefix}mediafire ${lijnk}
${srl} ${usedPrefix}ytmp4 ${lijnk}
${srl} ${usedPrefix}ytmp3 ${lijnk}
${srl} ${usedPrefix}facebook ${lijnk}
${srl} ${usedPrefix}cocofun ${lijnk}
${srl} ${usedPrefix}likevideo ${lijnk}
${srl} ${usedPrefix}gitclone ${lijnk}
${srl} ${usedPrefix}igvideo ${lijnk}
${srl} ${usedPrefix}igfoto ${lijnk}
${srl} ${usedPrefix}tiktok ${lijnk}
${srl} ${usedPrefix}spotify ${lijnk}
${srl} ${usedPrefix}twitter ${lijnk}
${srl} ${usedPrefix}twittermp3 ${lijnk}
${srl} ${usedPrefix}tiktoknowm ${lijnk}
${srl} ${usedPrefix}tiktokmusic ${lijnk}
${srl} ${usedPrefix}soundcloud ${lijnk}
${srl} ${usedPrefix}getmusic *( search yts )*
${srl} ${usedPrefix}getvideo *( search yts )*
${ctc}
${pep} ☾ Kerang Command ☽
   ${ctc}
   ${srl} ${usedPrefix}tembakpasangan 
   ${srl} ${usedPrefix}terimapasangan 
   ${srl} ${usedPrefix}putuspasangan 
   ${srl} ${usedPrefix}tolakpasangan 
   ${srl} ${usedPrefix}ikhlasinpasangan 
   ${srl} ${usedPrefix}cekpasangan
   ${ctc}
${plp} ☾ Group Command ☽
${ctc}
${srl} ${usedPrefix}antivionce *( enable / disable)*
${srl} ${usedPrefix}welcomegroup *( enable / disable)*
${srl} ${usedPrefix}antilinkgroup *( enable / disable)* 
${srl} ${usedPrefix}antilinknokick *( enable / disable)* 
${srl} ${usedPrefix}linkgroup *( enable / disable)*
${srl} ${usedPrefix}group  *( enable / disable)*
${srl} ${usedPrefix}revoke ( reset link group ) 
${srl} ${usedPrefix}kick ${tag} 
${srl} ${usedPrefix}add ${tag}
${srl} ${usedPrefix}promote ${tag}
${srl} ${usedPrefix}demote ${tag} 
${srl} ${usedPrefix}setsubject ${tetks} 
${srl} ${usedPrefix}setdesc ${tetks}
${srl} ${usedPrefix}hidetag ${tetks}
${srl} ${usedPrefix}setppgroup ${im}
${srl} ${usedPrefix}ephemeral
${srl} ${usedPrefix}tagall
${ctc}
${pep} ☾ Search Command ☽
   ${ctc}
   ${srl} ${usedPrefix}play ${query}
   ${srl} ${usedPrefix}lirik ${query}
   ${srl} ${usedPrefix}stickersearch ${query}
   ${srl} ${usedPrefix}sfilesearch ${query}
   ${srl} ${usedPrefix}google ${query}
   ${srl} ${usedPrefix}whatmusic ${sd}
   ${srl} ${usedPrefix}pinterest ${query}
   ${srl} ${usedPrefix}android1 ${query}
   ${srl} ${usedPrefix}ytsearch ${query}
   ${srl} ${usedPrefix}katabijak ${query}
   ${srl} ${usedPrefix}cerpen ${query}
   ${srl} ${usedPrefix}konachan ${query}
   ${srl} ${usedPrefix}kiryu ${query}
   ${srl} ${usedPrefix}komiku ${query}
   ${srl} ${usedPrefix}anime ${query}
   ${srl} ${usedPrefix}character ${query}
   ${srl} ${usedPrefix}genshin ${query}
   ${srl} ${usedPrefix}otakudesu ${query}
   ${srl} ${usedPrefix}otakudesu2 ${query}
   ${srl} ${usedPrefix}otakudesuinfo ${lijnk}
   ${ctc}
${plp} ☾ Islami Command ☽
${ctc}
${srl} ${usedPrefix}jadwalsholat ${query}
${srl} ${usedPrefix}alquran ${query}
${srl} ${usedPrefix}alkitab ${query}
${ctc}
${pep} ☾ Fun Game Command ☽
   ${ctc}
   ${srl} ${usedPrefix}caklontong
   ${srl} ${usedPrefix}family100
   ${srl} ${usedPrefix}math *mode*
   ${srl} ${usedPrefix}siapakahaku
   ${srl} ${usedPrefix}asahotak
   ${srl} ${usedPrefix}susunkata
   ${srl} ${usedPrefix}tebakkata
   ${srl} ${usedPrefix}tebakkimia
   ${srl} ${usedPrefix}menfes ${tag}
   ${srl} ${usedPrefix}stopmenfes
   ${ctc}
${plp} ☾ Photooxy Command ☽
${ctc}
${srl} ${usedPrefix}stonetext ${tetks}
${srl} ${usedPrefix}writeart ${tetks}
${srl} ${usedPrefix}summertext ${tetks}
${srl} ${usedPrefix}wolfmetaltext ${tetks}
${srl} ${usedPrefix}nature3dtext ${tetks}
${srl} ${usedPrefix}naturetypography ${tetks}
${srl} ${usedPrefix}quotesunder ${tetks}
${srl} ${usedPrefix}shinetext ${tetks}
${srl} ${usedPrefix}shadow ${tetks}
${srl} ${usedPrefix}write ${tetks}
${srl} ${usedPrefix}romantic ${tetks}
${srl} ${usedPrefix}burnpaper ${tetks}
${srl} ${usedPrefix}smoke ${tetks}
${srl} ${usedPrefix}narutobanner ${tetks}
${srl} ${usedPrefix}love ${tetks}
${srl} ${usedPrefix}undergrass ${tetks}
${srl} ${usedPrefix}coffecup ${tetks}
${srl} ${usedPrefix}underwaterocean ${tetks}
${srl} ${usedPrefix}starstext ${tetks}
${srl} ${usedPrefix}rainboweffect ${tetks}
${srl} ${usedPrefix}balloontext ${tetks}
${srl} ${usedPrefix}metalliceffect ${tetks}
${srl} ${usedPrefix}embroiderytext ${tetks}
${srl} ${usedPrefix}flamingtext ${tetks}
${srl} ${usedPrefix}csgo ${tetks}
${srl} ${usedPrefix}darkmetal ${tetks}
${ctc}
${pep} ☾ Textpro Command ☽
   ${ctc}
   ${srl} ${usedPrefix}candy ${tetks}
   ${srl} ${usedPrefix}christmas ${tetks}
   ${srl} ${usedPrefix}3dchristmas ${tetks}
   ${srl} ${usedPrefix}sparklechristmas ${tetks}
   ${srl} ${usedPrefix}deepsea ${tetks}
   ${srl} ${usedPrefix}scifi ${tetks}
   ${srl} ${usedPrefix}rainbow ${tetks}
   ${srl} ${usedPrefix}waterpipe ${tetks}
   ${srl} ${usedPrefix}spooky ${tetks}
   ${srl} ${usedPrefix}pencil ${tetks}
   ${srl} ${usedPrefix}circuit ${tetks}
   ${srl} ${usedPrefix}discovery ${tetks}
   ${srl} ${usedPrefix}metalic ${tetks}
   ${srl} ${usedPrefix}fiction ${tetks}
   ${srl} ${usedPrefix}demon ${tetks}
   ${srl} ${usedPrefix}transformer ${tetks}
   ${srl} ${usedPrefix}berry ${tetks}
   ${srl} ${usedPrefix}thunder ${tetks}
   ${srl} ${usedPrefix}3dstone2 ${tetks}
   ${srl} ${usedPrefix}neonlight ${tetks}
   ${srl} ${usedPrefix}glitch ${tetks}
   ${srl} ${usedPrefix}harrypotter ${tetks}
   ${srl} ${usedPrefix}brokenglass ${tetks}
   ${srl} ${usedPrefix}papercut ${tetks}
   ${srl} ${usedPrefix}watercolor ${tetks}
   ${srl} ${usedPrefix}multicolor ${tetks}
   ${srl} ${usedPrefix}neondevil ${tetks}
   ${srl} ${usedPrefix}underwater ${tetks}
   ${srl} ${usedPrefix}graffitibike ${tetks}
   ${srl} ${usedPrefix}snow ${tetks}
   ${srl} ${usedPrefix}cloud ${tetks}
   ${srl} ${usedPrefix}honey ${tetks}
   ${srl} ${usedPrefix}ice ${tetks}
   ${srl} ${usedPrefix}fruitjuice ${tetks}
   ${srl} ${usedPrefix}biscuit ${tetks}
   ${srl} ${usedPrefix}wood ${tetks}
   ${srl} ${usedPrefix}chocolate ${tetks}
   ${srl} ${usedPrefix}strawberry ${tetks}
   ${srl} ${usedPrefix}matrix ${tetks}
   ${srl} ${usedPrefix}blood ${tetks}
   ${srl} ${usedPrefix}dropwater ${tetks}
   ${srl} ${usedPrefix}toxic ${tetks}
   ${srl} ${usedPrefix}lava ${tetks}
   ${srl} ${usedPrefix}rock ${tetks}
   ${srl} ${usedPrefix}bloodglas ${tetks}
   ${srl} ${usedPrefix}halloween ${tetks}
   ${srl} ${usedPrefix}darkgold ${tetks}
   ${srl} ${usedPrefix}joker ${tetks}
   ${srl} ${usedPrefix}wicker ${tetks}
   ${srl} ${usedPrefix}firework ${tetks}
   ${srl} ${usedPrefix}skeleton ${tetks}
   ${srl} ${usedPrefix}blackpink ${tetks}
   ${srl} ${usedPrefix}sand ${tetks}
   ${srl} ${usedPrefix}glue ${tetks}
   ${srl} ${usedPrefix}1917 ${tetks}
   ${srl} ${usedPrefix}leaves ${tetks}
   ${ctc}
${plp} ☾ Ephoto360 Command ☽
${ctc}
${srl} ${usedPrefix}glitchtext ${tetks}
${srl} ${usedPrefix}writetext ${tetks}
${srl} ${usedPrefix}advancedglow ${tetks}
${srl} ${usedPrefix}typographytext ${tetks}
${srl} ${usedPrefix}pixelglitch ${tetks}
${srl} ${usedPrefix}neonglitch ${tetks}
${srl} ${usedPrefix}flagtext ${tetks}
${srl} ${usedPrefix}flag3dtext ${tetks}
${srl} ${usedPrefix}deletingtext ${tetks}
${srl} ${usedPrefix}blackpinkstyle ${tetks}
${srl} ${usedPrefix}glowingtext ${tetks}
${srl} ${usedPrefix}underwatertext ${tetks}
${srl} ${usedPrefix}logomaker ${tetks}
${srl} ${usedPrefix}cartoonstyle ${tetks}
${srl} ${usedPrefix}papercutstyle ${tetks}
${srl} ${usedPrefix}watercolortext ${tetks}
${srl} ${usedPrefix}effectclouds ${tetks}
${srl} ${usedPrefix}blackpinklogo ${tetks}
${srl} ${usedPrefix}gradienttext ${tetks}
${srl} ${usedPrefix}summerbeach ${tetks}
${srl} ${usedPrefix}luxurygold ${tetks}
${srl} ${usedPrefix}multicoloredneon ${tetks}
${srl} ${usedPrefix}sandsummer ${tetks}
${srl} ${usedPrefix}galaxywallpaper ${tetks}
${srl} ${usedPrefix}1917style ${tetks}
${srl} ${usedPrefix}makingneon ${tetks}
${srl} ${usedPrefix}royaltext ${tetks}
${srl} ${usedPrefix}freecreate ${tetks}
${srl} ${usedPrefix}galaxystyle ${tetks}
${srl} ${usedPrefix}lighteffects ${tetks}
${ctc}
${pep} ☾ Primbon Command ☽
   ${ctc}
   ${srl} ${usedPrefix}artinama ${tetks}
   ${srl} ${usedPrefix}zodiak ${npo}
   ${srl} ${usedPrefix}artimimpi ${npo}
   ${srl} ${usedPrefix}ramaljodoh ${npo}
   ${srl} ${usedPrefix}suamiistri ${npo}
   ${srl} ${usedPrefix}ramalanjodohbali ${npo}
   ${srl} ${usedPrefix}ramalcinta ${npo}
   ${srl} ${usedPrefix}kecocokanpasangan ${npo}
   ${srl} ${usedPrefix}kecocokannama ${npo}
   ${srl} ${usedPrefix}sifatusaha ${npo}
   ${srl} ${usedPrefix}jadiannikah ${npo}
   ${srl} ${usedPrefix}pekerjaan ${npo}
   ${srl} ${usedPrefix}rezeki ${npo}
   ${srl} ${usedPrefix}potensipenyakit ${npo}
   ${srl} ${usedPrefix}ramalnasib ${npo}
   ${srl} ${usedPrefix}fengshui ${npo}
   ${srl} ${usedPrefix}artitarot ${npo}
   ${srl} ${usedPrefix}harisangar ${npo}
   ${srl} ${usedPrefix}haribaik ${npo}
   ${srl} ${usedPrefix}harinaga ${npo}
   ${srl} ${usedPrefix}harisial ${npo}
   ${srl} ${usedPrefix}peruntungan ${npo}
   ${srl} ${usedPrefix}arahrezeki ${npo}
   ${srl} ${usedPrefix}karakter ${npo}
   ${srl} ${usedPrefix}wetonjawa ${npo}
   ${srl} ${usedPrefix}masasubur ${npo}
   ${srl} ${usedPrefix}memancing ${npo}
   ${ctc}
   ${ctc} Total Fitur Plugins : *${Object.values(global.plugins).length}*
   ${ctc} Total Pengguna ${namaBot} : *${Object.keys(global.db.data.users).length}*
   ${ctc}
   ${ctc}
   ${rs} Kirim perintah *${usedPrefix}readme* untuk mengetahui fungsi dan cara penggunaan perintah di atas, WAJIB BACA!!.
   
${mess.done}`
conn.reply(m.chat, text, m, {contextInfo: {externalAdReply: await thumbloc(global.loc, [wm,botdate])}})
}

handler.command = handler.help = ['menu', 'help']
handler.register = true

module.exports = handler