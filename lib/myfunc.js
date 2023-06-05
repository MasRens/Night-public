/**
 * Create By Dika Ardnt.
 * Recode By Naze Dev
 * Contact Me on wa.me/6282113821188
 * Follow https://github.com/nazedev
 */

const {
	proto,
	delay,
	downloadContentFromMessage,
	jidDecode,
	areJidsSameUser,
	generateForwardMessageContent,
	generateWAMessageFromContent,
	extractMessageContent,
	getContentType,
	toReadable
} = require('@adiwajshing/baileys')
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const {
	sizeFormatter
} = require('human-readable')
const util = require('util')
const Jimp = require('jimp')
const {
	defaultMaxListeners
} = require('stream')


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
	let tag = (0, exports.unixTimestampSeconds)().toString();
	if (epoch)
		tag += '.--' + epoch; // attach epoch if provided
	return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

Number.prototype.toTimeString = function toTimeString() {
	// var milliseconds = this % 1000
	var seconds = Math.floor((this / 1000) % 60)
	var minutes = Math.floor((this / (60 * 1000)) % 60)
	var hours = Math.floor((this / (60 * 60 * 1000)) % 24)
	var days = Math.floor((this / (24 * 60 * 60 * 1000)))
	return (
		(days ? `${days} day(s) ` : '') +
		(hours ? `${hours} hour(s) ` : '') +
		(minutes ? `${minutes} minute(s) ` : '') +
		(seconds ? `${seconds} second(s)` : '')
	).trim()
}
Number.prototype.getRandom =
	String.prototype.getRandom =
	Array.prototype.getRandom = function getRandom() {
		if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
		return Math.floor(Math.random() * this)
	}


exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.fetchJson = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: 'GET',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
			},
			...options
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
	let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
	let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
	let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
	return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum’at', 'Sabtu'];
	var tgl = new Date(numer);
	var day = tgl.getDate()
	bulan = tgl.getMonth()
	var thisDay = tgl.getDay(),
		thisDay = myDays[thisDay];
	var yy = tgl.getYear()
	var year = (yy < 1000) ? yy + 1900 : yy;
	const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
	let d = new Date
	let locale = 'id'
	let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
	let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]

	return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
	std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
	return JSON.stringify(string, null, 2)
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.generateProfilePicture = async (buffer) => {
	const jimp = await Jimp.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
	}
}

exports.bytesToSize = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
	return new Promise((resolve, reject) => {
		if (/http/.test(path)) {
			axios.get(path)
				.then((res) => {
					let length = parseInt(res.headers['content-length'])
					let size = exports.bytesToSize(length, 3)
					if (!isNaN(length)) resolve(size)
				})
		} else if (Buffer.isBuffer(path)) {
			let length = Buffer.byteLength(path)
			let size = exports.bytesToSize(length, 3)
			if (!isNaN(length)) resolve(size)
		} else {
			reject('error gatau apah')
		}
	})
}

exports.parseMention = (text = '') => {
	return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participants) => {
	let admins = []
	for (let i of participants) {
		i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
	}
	return admins || []
}

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */

exports.serialize = (conn, m, hasParent) => {
	if (!m) return m
	/**
	 * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
	 */
	var M = proto.WebMessageInfo
	m = M.fromObject(m)
	Object.defineProperty(m, 'conn', {
		enumerable: false,
		writable: true,
		value: conn
	})
	var protocolMessageKey
	if (m.message) {
		if (m.mtype == 'protocolMessage' && m.msg.key) {
			protocolMessageKey = m.msg.key
			if (protocolMessageKey == 'status@broadcast') protocolMessageKey.remoteJid = m.chat
			if (!protocolMessageKey.participant || protocolMessageKey.participant == 'status_me') protocolMessageKey.participant = m.sender
			protocolMessageKey.fromMe = areJidsSameUser(protocolMessageKey.participant, conn.user.id)
			if (!protocolMessageKey.fromMe && areJidsSameUser(protocolMessageKey.remoteJid, conn.user.id)) protocolMessageKey.remoteJid = m.sender
		}
		if (m.quoted)
			if (!m.quoted.mediaMessage) delete m.quoted.download
	}
	if (!m.mediaMessage) delete m.download

	try {
		if (protocolMessageKey && m.mtype == 'protocolMessage') conn.ev.emit('messages.delete', {
			keys: [protocolMessageKey]
		})
	} catch (e) {
		console.error(e)
	}
	return m
}
function nullish(args) {
	return !(args !== null && args !== undefined)
}
exports.smsg = () => {
	var MediaType = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage']
	log(this)
		return Object.defineProperties(proto.WebMessageInfo.prototype, {
		conn: {
			value: global.conn,
			enumerable: false,
			writable: true
		},
		id: {
			get() {
				return this.key?.id
			}
		},
		isBaileys: {
			get() {
				return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 12 || false
			}
		},
		chat: {
			get() {
				var senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId
				return (
					this.key?.remoteJid ||
					(senderKeyDistributionMessage &&
						senderKeyDistributionMessage !== 'status@broadcast'
					) || ''
				).decodeJid()
			}
		},
		isGroup: {
			get() {
				return this.chat.endsWith('@g.us')
			},
			enumerable: true
		},
		sender: {
			get() {
				return this.conn?.decodeJid(this.key?.fromMe && this.conn?.user.id || this.participant || this.key.participant || this.chat || '')
			},
			enumerable: true
		},
		fromMe: {
			get() {
				return this.key?.fromMe || areJidsSameUser(this.conn?.user.id, this.sender) || false
			}
		},
		mtype: {
			get() {
				if (!this.message) return ''
				return getContentType(this.message)
			},
			enumerable: true
		},
		msg: {
			get() {
				if (!this.message) return null
				if (this.mtype?.startsWith('viewOnce')) {
					return this.message[this.mtype].message.imageMessage || this.message[this.mtype].message.videoMessage
				} else {
					return this.message[this.mtype]
				}
			}
		},
		mediaMessage: {
			get() {
				if (!this.message) return null
				var data
				if (this.mtype?.startsWith('viewOnce')) {
					data = this.message[this.mtype].message || this.message[this.mtype].message
				}
				var Message = ((this.msg?.url || this.msg?.directPath) ? data ? {
					...data
				} : {
					...this.message
				} : extractMessageContent(this.message)) || null
				if (!Message) return null
				var mtype = Object.keys(Message)[0]
				return MediaType.includes(mtype) ? Message : null
			},
			enumerable: true
		},
		mediaType: {
			get() {
				var message
				if (!(message = this.mediaMessage)) return null
				return Object.keys(message)[0]
			},
			enumerable: true,
		},
		quoted: {
			get() {
				/** @type {ReturnType<typeof makeWASocket>} */
				var self = this
				var msg = self.msg
				var contextInfo = msg?.contextInfo
				var quoted = contextInfo?.quotedMessage
				if (!msg || !contextInfo || !quoted) return null
				var type = getContentType(quoted)
				var q = quoted[type]
				var text = typeof q === 'string' ? q : q.text
				return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === 'string' ? {
					text: q
				} : q)), {
					mtype: {
						get() {
							return type
						},
						enumerable: true
					},
					mediaMessage: {
						get() {
							var Message = ((q.url || q.directPath) ? {
								...quoted
							} : extractMessageContent(quoted)) || null
							if (!Message) return null
							var mtype = Object.keys(Message)[0]
							return MediaType.includes(mtype) ? Message : null
						},
						enumerable: true
					},
					mediaType: {
						get() {
							var message
							if (!(message = this.mediaMessage)) return null
							return Object.keys(message)[0]
						},
						enumerable: true,
					},
					id: {
						get() {
							return contextInfo.stanzaId
						},
						enumerable: true
					},
					chat: {
						get() {
							return contextInfo.remoteJid || self.chat
						},
						enumerable: true
					},
					isBaileys: {
						get() {
							return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 12 || false
						},
						enumerable: true
					},
					sender: {
						get() {
							return (contextInfo.participant || this.chat || '').decodeJid()
						},
						enumerable: true
					},
					fromMe: {
						get() {
							return areJidsSameUser(this.sender, self.conn?.user.jid)
						},
						enumerable: true,
					},
					text: {
						get() {
							return text || this.caption || this.contentText || this.selectedDisplayText || this.title || ''
						},
						enumerable: true
					},
					mentionedJid: {
						get() {
							return q.contextInfo?.mentionedJid || self.getQuotedObj()?.mentionedJid || []
						},
						enumerable: true
					},
					name: {
						get() {
							var sender = this.sender
							return sender ? self.conn?.getName(sender) : null
						},
						enumerable: true

					},
					vM: {
						get() {
							return proto.WebMessageInfo.fromObject({
								key: {
									fromMe: this.fromMe,
									remoteJid: this.chat,
									id: this.id
								},
								message: quoted,
								...(self.isGroup ? {
									participant: this.sender
								} : {})
							})
						}
					},
					fakeObj: {
						get() {
							return this.vM
						}
					},
					download: {
						value(saveToFile = false) {
							var mtype = this.mediaType
							return self.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), {
								saveToFile
							})
						},
						enumerable: true,
						configurable: true,
					},
					reply: {
						/**
						 * Reply to quoted message
						 * @param {String|Object} text
						 * @param {String|false} chatId
						 * @param {Object} options
						 */
						value(text, chatId, options) {
							return self.conn?.reply(chatId ? chatId : this.chat, text, this.vM, options)
						},
						enumerable: true,
					},
					copy: {
						/**
						 * Copy quoted message
						 */
						value() {
							var M = proto.WebMessageInfo
							return smsg(conn, M.fromObject(M.toObject(this.vM)))
						},
						enumerable: true,
					},
					forward: {
						/**
						 * Forward quoted message
						 * @param {String} jid
						 *  @param {Boolean} forceForward
						 */
						value(jid, force = false, options) {
							return self.conn?.sendMessage(jid, {
								forward: this.vM,
								force,
								...options
							}, {
								...options
							})
						},
						enumerable: true,
					},
					copyNForward: {
						/**
						 * Exact Forward quoted message
						 * @param {String} jid
						 * @param {Boolean|Number} forceForward
						 * @param {Object} options
						 */
						value(jid, forceForward = false, options) {
							return self.conn?.copyNForward(jid, this.vM, forceForward, options)
						},
						enumerable: true,

					},
					cMod: {
						/**
						 * Modify quoted Message
						 * @param {String} jid
						 * @param {String} text
						 * @param {String} sender
						 * @param {Object} options
						 */
						value(jid, text = '', sender = this.sender, options = {}) {
							return self.conn?.cMod(jid, this.vM, text, sender, options)
						},
						enumerable: true,

					},
					delete: {
						/**
						 * Delete quoted message
						 */
						value() {
							return self.conn?.sendMessage(this.chat, {
								delete: this.vM.key
							})
						},
						enumerable: true,

					},
					react: {
						value(text) {
							return self.conn?.sendMessage(this.chat, {
								react: {
									text,
									key: this.vM.key
								}
							})
						},
						enumerable: true,
					}
				})
			},
			enumerable: true
		},
		_text: {
			value: null,
			writable: true,
		},
		text: {
			get() {
				var msg = this.msg
				var text = (typeof msg === 'string' ? msg : msg?.text) || msg?.caption || msg?.contentText || ''
				return typeof this._text === 'string' ? this._text : '' || (typeof text === 'string' ? text : (
					text?.selectedDisplayText ||
					text?.hydratedTemplate?.hydratedContentText ||
					text
				)) || ''
			},
			set(str) {
				return this._text = str
			},
			enumerable: true
		},
		mentionedJid: {
			get() {
				return this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || []
			},
			enumerable: true
		},
		name: {
			get() {
				return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender)
			},
			enumerable: true
		},
		download: {
			value(saveToFile = false) {
				var mtype = this.mediaType
				return this.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), {
					saveToFile
				})
			},
			enumerable: true,
			configurable: true
		},
		reply: {
			value(text, chatId, options) {
				return this.conn?.reply(chatId ? chatId : this.chat, text, this, options)
			}
		},
		copy: {
			value() {
				var M = proto.WebMessageInfo
				return smsg(this.conn, M.fromObject(M.toObject(this)))
			},
			enumerable: true
		},
		forward: {
			value(jid, force = false, options = {}) {
				return this.conn?.sendMessage(jid, {
					forward: this,
					force,
					...options
				}, {
					...options
				})
			},
			enumerable: true
		},
		copyNForward: {
			value(jid, forceForward = false, options = {}) {
				return this.conn?.copyNForward(jid, this, forceForward, options)
			},
			enumerable: true
		},
		cMod: {
			value(jid, text = '', sender = this.sender, options = {}) {
				return this.conn?.cMod(jid, this, text, sender, options)
			},
			enumerable: true
		},
		getQuotedObj: {
			value() {
				if (!this.quoted.id) return null
				var q = proto.WebMessageInfo.fromObject(this.conn?.loadMessage(this.quoted.sender, this.quoted.id) || this.conn?.loadMessage(this.quoted.id) || this.quoted.vM)
				return smsg(this.conn, q)
			},
			enumerable: true
		},
		getQuotedMessage: {
			get() {
				return this.getQuotedObj
			}
		},
		delete: {
			value() {
				return this.conn?.sendMessage(this.chat, {
					delete: this.key
				})
			},
			enumerable: true
		},
		react: {
			value(text) {
				return this.conn?.sendMessage(this.chat, {
					react: {
						text,
						key: this.key
					}
				})
			},
			enumerable: true
		}
	})
}
let {
	fromBuffer: fileTypeFromBuffer
} = require('file-type')
exports.protoType = () => {
	/**
	 * @returns {ArrayBuffer}
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
		var ab = new ArrayBuffer(this.length);
		var view = new Uint8Array(ab);
		for (var i = 0; i < this.length; ++i) {
			view[i] = this[i];
		}
		return ab;
	}
	/**
	 * @returns {ArrayBuffer}
	 */
	Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
		return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
	}
	/**
	 * @returns {Buffer}
	 */
	ArrayBuffer.prototype.toBuffer = function toBuffer() {
		var buf = Buffer.alloc(this.byteLength)
		var view = new Uint8Array(this)
		for (var i = 0; i < buf.length; ++i) {
			buf[i] = view[i]
		}
		return buf;
	}
	/**
	 * @returns {Promise<import('file-type').FileTypeResult | undefined>}
	 */
	Uint8Array.prototype.getFileType =
		ArrayBuffer.prototype.getFileType =
		Buffer.prototype.getFileType = function getFileType() {
			return fileTypeFromBuffer(this)
		}
	/**
	 * @returns {Boolean}
	 */
	String.prototype.isNumber =
		Number.prototype.isNumber = function isNumber() {
			var int = parseInt(this)
			return typeof int === 'number' && !isNaN(int)
		}
	/**
	 * @returns {String}
	 */
	String.prototype.capitalize = function capitalize() {
		return this.charAt(0).toUpperCase() + this.slice(1, this.length)
	}
	/**
	 * @returns {String}
	 */
	String.prototype.capitalizeV2 = function capitalizeV2() {
		var str = this.split(' ')
		return str.map(v => v.capitalize()).join(' ')
	}
	String.prototype.decodeJid = function decodeJid() {
		if (/:\d+@/gi.test(this)) {
			var decode = jidDecode(this) || {}
			return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
		} else return this.trim()
	}
	/**
	 * Number must be milliseconds
	 * @returns {string}
	 */
	Number.prototype.toTimeString = function toTimeString() {
		// var milliseconds = this % 1000
		var seconds = Math.floor((this / 1000) % 60)
		var minutes = Math.floor((this / (60 * 1000)) % 60)
		var hours = Math.floor((this / (60 * 60 * 1000)) % 24)
		var days = Math.floor((this / (24 * 60 * 60 * 1000)))
		return (
			(days ? `${days} day(s) ` : '') +
			(hours ? `${hours} hour(s) ` : '') +
			(minutes ? `${minutes} minute(s) ` : '') +
			(seconds ? `${seconds} second(s)` : '')
		).trim()
	}
	Number.prototype.getRandom =
		String.prototype.getRandom =
		Array.prototype.getRandom = function getRandom() {
			if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
			return Math.floor(Math.random() * this)
		}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})