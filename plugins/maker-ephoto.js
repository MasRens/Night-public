let fs = require('fs');
const  noapi = require('../lib/api')

var handler = async (m, { usedPrefix, conn, command, text}) => {
	
if (!text) return m.reply(`Example : ${usedPrefix+command} ${namaBot}`)
conn.sendMessage(m.chat, {react: {text: ('🕟'), key: m.key, }})
let linp
if (/glitchtext/.test(command)) link = 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html'
if (/writetext/.test(command)) link = 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html'
if (/advancedglow/.test(command)) link = 'https://en.ephoto360.com/advanced-glow-effects-74.html'
if (/typographytext/.test(command)) link = 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html'
if (/pixelglitch/.test(command)) link = 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html'
if (/neonglitch/.test(command)) link = 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html'
if (/flagtext/.test(command)) link = 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html'
if (/flag3dtext/.test(command)) link = 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html'
if (/deletingtext/.test(command)) link = 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html'
if (/blackpinkstyle/.test(command)) link = 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html'
if (/glowingtext/.test(command)) link = 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html'
if (/underwatertext/.test(command)) link = 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html'
if (/logomaker/.test(command)) link = 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html'
if (/cartoonstyle/.test(command)) link = 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html'
if (/papercutstyle/.test(command)) link = 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html'
if (/watercolortext/.test(command)) link = 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html'
if (/effectclouds/.test(command)) link = 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html'
if (/blackpinklogo/.test(command)) link = 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html'
if (/gradienttext/.test(command)) link = 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html'
if (/summerbeach/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html'
if (/luxurygold/.test(command)) link = 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html'
if (/multicoloredneon/.test(command)) link = 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html'
if (/sandsummer/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html'
if (/galaxywallpaper/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html'
if (/1917style/.test(command)) link = 'https://en.ephoto360.com/1917-style-text-effect-523.html'
if (/makingneon/.test(command)) link = 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html'
if (/royaltext/.test(command)) link = 'https://en.ephoto360.com/royal-text-effect-online-free-471.html'
if (/freecreate/.test(command)) link = 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html'
if (/galaxystyle/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html'
if (/lighteffects/.test(command)) link = 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
let haldwhd = await noapi.ephoto(link, text)
conn.sendMessage(m.chat, { image: { url: haldwhd }, caption: `${mess.done}`}, {quoted: m})
 }
 handler.help = ['glitchtext', 'writetext', 'advancedglow', 'typographytext', 'pixelglitch', 'neonglitch', 'flagtext', 'flag3dtext', 'deletingtext', 'blackpinkstyle', 'glowingtext', 'underwatertext', 'logomaker', 'cartoonstyle', 'papercutstyle', 'watercolortext', 'effectclouds', 'blackpinklogo',  'gradienttext', 'summerbeach', 'luxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper', '1917style', 'makingneon', 'royaltext', 'freecreate', 'galaxystyle', 'lighteffects']
 handler.tags = ['maker']
 handler.command = ['glitchtext', 'writetext', 'advancedglow', 'typographytext', 'pixelglitch', 'neonglitch', 'flagtext', 'flag3dtext', 'deletingtext', 'blackpinkstyle', 'glowingtext', 'underwatertext', 'logomaker', 'cartoonstyle', 'papercutstyle', 'watercolortext', 'effectclouds', 'blackpinklogo',  'gradienttext', 'summerbeach', 'luxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper', '1917style', 'makingneon', 'royaltext', 'freecreate', 'galaxystyle', 'lighteffects']
 handler.register = true
 handler.limit = true

module.exports = handler