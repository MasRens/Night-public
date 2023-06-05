var { sticker } = require('../lib/sticker')
var uploadFile = require('../lib/uploadFile')
var handler = async (m, {
	conn,
	text,
	args
}) => {
	var pp = 'https://telegra.ph/file/ab2d8562be18ad26b1668.jpg'
	if (!args[0] && !m.quoted)
		return m.reply(`Please provide a text (Type or mention a message) !`)

	if (m.quoted) {
		try {
			userPfp = await conn.profilePictureUrl(m.quoted.sender, "image");
		} catch (e) {
			userPfp = pp;
		}
	} else {
		try {
			userPfp = await conn.profilePictureUrl(m.sender, "image");
		} catch (e) {
			userPfp = pp;
		}
	}
	var trimtext = text.length > 50 ? text.substring(0, 50 - 3) + "..." : text,
		trimqtext
	if (m.quoted && m.quoted.text) {
		trimqtext = m.quoted.text.length > 50 ? m.quoted.text.substring(0, 50 - 3) + "..." : m.quoted.text
	}
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	var media, img
	if (/image/.test(mime)) {
		img = await q.download?.()
		if (img) media = await uploadFile(img)
	}
	var obj = {
		"type": "quote",
		"format": "png",
		"backgroundColor": "#FFFFFF",
		"width": 512,
		"height": 768,
		"scale": 2,
		"messages": [{
			"entities": [],
			"avatar": true,
			...(media ? {
				"media": {
					"url": media
				}
			} : {}),
			"from": {
				"id": 1,
				"name": m.name,
				"photo": {
					"url": userPfp
				}
			},
			"text": trimtext,
			"replyMessage": m.quoted && m.quoted.text ? {
				name: m.quoted.name,
				text: trimqtext
			} : {}
		}]
	}
	try {
		var json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		var buffer = Buffer.from(json.data.result.image, 'base64')
		var stiker = await sticker(buffer, global.packname, global.author)
		if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
	} catch (e) {
		throw {
			body: e
		}
	}
}

handler.help = ['quotly']
handler.tags = ['stickerht']
handler.command = /^(qc|quoted|quotly)$/i

module.exports = handler