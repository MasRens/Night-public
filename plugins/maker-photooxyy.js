const photooxy = require('../lib/photooxy')

var handler = async (m, {
    usedPrefix,
	conn,
	command,
	text
}) => {
	if (!text) return m.reply(`Example : ${usedPrefix+command} ${namaBot}`)
	conn.sendMessage(m.chat, {react: {text: ('🕟'), key: m.key, }})
	let linp
	if (/stonetext/.test(command)) linp = 'https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html'
	if (/writeart/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html'
	if (/summertext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html'
	if (/wolfmetaltext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html'
	if (/nature3dtext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html'
	if (/rosestext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html'
	if (/naturetypography/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/create-vector-nature-typography-355.html'
	if (/quotesunder/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html'
	if (/shinetext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html'
	if (/shadow/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html'
	if (/write/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html'
	if (/romantic/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html'
	if (/burnpaper/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html'
	if (/smoke/.test(command)) linp = 'https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html'
	if (/narutobanner/.test(command)) linp = 'https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html'
	if (/love/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html'
	if (/undergrass/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html'
	if (/doublelove/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/love-text-effect-372.html'
	if (/coffecup/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html'
	if (/underwaterocean/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html'
	if (/smokyneon/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html'
	if (/starstext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html'
	if (/rainboweffect/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html'
	if (/balloontext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/royal-look-text-balloon-effect-173.html'
	if (/metalliceffect/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html'
	if (/embroiderytext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html'
	if (/flamingtext/.test(command)) linp = 'https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html'
	if (/csgo/.test(command)) linp = 'https://photooxy.com/cs-go/great-cs-go-banner-131.html'
	if (/metaldark/.test(command)) linp = 'https://photooxy.com/other-design/create-dark-metal-text-with-special-logo-160.html'
	dehe = await photooxy.photoOxy(linp, text)
    conn.sendMessage(m.chat, { image: { url: dehe }, caption: `${mess.done}`}, {quoted: m})
     }
handler.register = true
handler.limit = true
handler.help = ['metaldark', 'csgo', 'stonetext', 'writeart', 'summertext', 'wolfmetaltext', 'nature3dtext', 'rosestext', 'naturetypography', 'quotesunder', 'shinetext', 'shadow',  'write', 'romantic', 'burnpaper', 'smoke', 'narutobanner', 'love', 'undergrass', 'doublelove', 'coffecup', 'underwaterocean', 'smokyneon', 'starstext', 'rainboweffect', 'balloontext', 'metalliceffect', 'embroiderytext', 'flamingtext']
handler.tags = ['maker']
handler.command = ['metaldark', 'csgo', 'stonetext', 'writeart', 'summertext', 'wolfmetaltext', 'nature3dtext', 'rosestext', 'naturetypography', 'quotesunder', 'shinetext', 'shadow',  'write', 'romantic', 'burnpaper', 'smoke', 'narutobanner', 'love', 'undergrass', 'doublelove', 'coffecup', 'underwaterocean', 'smokyneon', 'starstext', 'rainboweffect', 'balloontext', 'metalliceffect', 'embroiderytext', 'flamingtext']
module.exports = handler