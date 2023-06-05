process.on('uncaughtException', console.error) //Safe Log Error 
global.cheerio = require ('cheerio')
require('./connect/settings')
const {
	default: RestaConnect,
	useMultiFileAuthState,
	DisconnectReason,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	jidDecode,
	proto,
	toReadable
} = require("@adiwajshing/baileys")
const pino = require('pino')
const {
	Boom
} = require('@hapi/boom')
const fs = require('fs')
const figlet = require("figlet");
var Jimp = require('jimp')
const lolcatjs = require('lolcatjs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const moment = require("moment-timezone")
global.axios = require('axios')
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { infolog, mylog, color, bgcolor } = require('./lib/color')
const {
	toAudio,
	toPTT,
	toVideo
} = require('./lib/converter')
const PhoneNumber = require('awesome-phonenumber')
const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid
} = require('./lib/exif')
const {
	smsg,
	serialize,
	isUrl,
	protoType,
	generateMessageTag,
	getBuffer,
	getSizeMedia,
	fetchJson,
	await,
	sleep
} = require('./lib/myfunc')
global.getbuffer = getBuffer
const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
const wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
var pretty = require('pino-pretty');
let {
	fromBuffer: fileTypeFromBuffer,
	stream: fileTypeStream,
	fromStream: fileTypeFromStream
} = require('file-type')
var stream = pretty({
	colorize: true
})
var logger = pino({
	timestamp: () => `,"time":"${new Date().toJSON()}"`,
	//level: 'silent'
}, stream).child({
	class: 'baileys'
})
var low
try {
	low = require('lowdb')
} catch (e) {
	low = require('./lib/lowdb')
}

const {
	Low,
	JSONFile
} = low
const mongoDB = require('./lib/mongoDB')
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
	...query,
	...(apikeyqueryname ? {
		[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
	} : {})
})) : '')
const store = makeInMemoryStore({
	logger: pino().child({
		level: 'info',
		stream: 'store'
	})
})
global.former = require('form-data')

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
	/https?:\/\//.test(opts['db'] || '') ?
	new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
	new mongoDB(opts['db']) :
	new JSONFile(`src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
	if (global.db.READ) return new Promise((resolve) => setInterval(function() {
		(!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null)
	}, 1 * 1000))
	if (global.db.data !== null) return
	global.db.READ = true
	await global.db.read()
	global.db.READ = false
	global.db.data = {
		users: {},
		pasangan: {},
		chats: {},
		game: {},
		menfes: {},
		...(global.db.data || {})
	}
	global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
	if (global.db.data) await global.db.write()
}, 30 * 1000)
//-----> Plugins 
let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    console.log(e)
    delete global.plugins[filename]
  }
}
global.reload = (_event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) console.log(color(`Done Update plugins '${filename}'`, 'aqua'))
      else {
        console.log(color(`deleted plugin '${filename}'`, 'yellow'))
        return delete global.plugins[filename]
      }
    } else console.log(color(`requiring new plugin '${filename}'`, 'lime'))
    let err = syntaxerror(fs.readFileSync(dir), fs.existsSync(dir) ? filename : 'Execution Function')
    if (err) console.log(color(`syntax error while loading '${filename}'\n${err}`, 'red'))
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      console.log(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
//----> END
async function startResta() {
	const {
		state,
		saveCreds
	} = await useMultiFileAuthState(`./${sessionName}`)

	function nullish(args) {
		return !(args !== null && args !== undefined)
	}
	const Resta = RestaConnect({
		logger: pino({
			level: 'error'
		}),
		printQRInTerminal: true,
		browser: ['Resta Multi Device', 'Safari', '1.0.0'],
		patchMessageBeforeSending: (message) => {

			const requiresPatch = !!(
				message.buttonsMessage ||
				message.templateMessage ||
				message.listMessage
			);
			if (requiresPatch) {
				message = {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadataVersion: 2,
								deviceListMetadata: {},
							},
							...message,
						},
					},
				};
			}
			return message;
		},
		auth: state
	})

	Resta.public = true
	store.bind(Resta.ev)

	var {
		plugins,
		loadPluginFiles,
		reload,
		pluginFolder,
		pluginFilter
	} = (await import('./handler/plugins.mjs'))
	var Helper = (await import('./handler/helper.mjs')).default;
	global.plugins = plugins
	
	// Anti Call
	Resta.ev.on('call', async (fatihh) => {
		let botNumber = await Resta.decodeJid(Resta.user.id)
		console.log(fatihh)
		for (let tihh of fatihh) {
			if (tihh.isGroup == false) {
				if (tihh.status == "offer") {
					let pa7rick = await Resta.sendTextWithMentions(tihh.from, `*${Resta.user.name}* tidak bisa menerima panggilan ${tihh.isVideo ? `video` : `suara`}. Maaf @${tihh.from.split('@')[0]} kamu akan diblockir. Jika tidak sengaja silahkan hubungi Owner untuk dibuka !`)
					Resta.sendContact(tihh.from, global.owner, pa7rick)
					await sleep(8000)
					await Resta.updateBlockStatus(tihh.from, "block")
				}
			}
		}
	})
	global.conn = Resta
     loadPluginFiles(pluginFolder, pluginFilter, {
			logger: Resta.logger,
			recursiveRead: false
		}).then(_ => console.log(Object.keys(plugins)))
		.catch(console.error)
	Resta.ev.on('messages.upsert', async chatUpdate => {
		//console.log(JSON.stringify(chatUpdate, undefined, 2))
		try {
			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (!Resta.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
			if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			if (mek.key.id.startsWith('FatihArridho_')) return
			m = serialize(Resta, mek)
			require("./connect/botnigth")(Resta, m, chatUpdate, store)
		} catch (err) {
			console.log(err)
		}
	})

	// Group Update
	Resta.ev.on('groups.update', async pea => {
		//console.log(pea)
		try {
			for (let ciko of pea) {
				// Get Profile Picture Group
				try {
					ppgc = await Resta.profilePictureUrl(ciko.id, 'image')
				} catch {
					ppgc = 'https://tinyurl.com/yx93l6da'
				}
				let wm_fatih = {
					url: ppgc
				}
				if (ciko.announce == true) {
					Resta.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`, `Group Settings Change Message`, wm_fatih, [])
				} else if (ciko.announce == false) {
					Resta.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`, `Group Settings Change Message`, wm_fatih, [])
				} else if (ciko.restrict == true) {
					Resta.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`, `Group Settings Change Message`, wm_fatih, [])
				} else if (ciko.restrict == false) {
					Resta.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`, `Group Settings Change Message`, wm_fatih, [])
				} else {
					Resta.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nGroup Subject telah diganti menjadi *${ciko.subject}*`, `Group Settings Change Message`, wm_fatih, [])
				}
			}
		} catch (err) {
			console.log(err)
		}
	})

	Resta.ev.on('group-participants.update', async (anu) => {
		console.log(anu)
		try {
			if (global.db.data.chats[anu.id].welcome) {
			let metadata = await Resta.groupMetadata(anu.id)
			let participants = anu.participants
			for (let num of participants) {
				// Get Profile Picture User
				try {
					ppuser = await Resta.profilePictureUrl(num, 'image')
				} catch {
					ppuser = 'https://tinyurl.com/yx93l6da'
				}

				// Get Profile Picture Group
				try {
					ppgroup = await Resta.profilePictureUrl(anu.id, 'image')
				} catch {
					ppgroup = 'https://tinyurl.com/yx93l6da'
				}

				if (anu.action == 'add') {
				Resta.sendTextWithMentions(anu.id, `Welcome To ${metadata.subject}\n@${num.split("@")[0]}\n Jangan Lupa Intro\n❏ *Nama* :\n❏ *Umur :*\n❏ *Askot :*`)
				} else if (anu.action == 'remove') {
			    Resta.sendTextWithMentions(anu.id, `@${num.split("@")[0]} Leave To Group\n ${metadata.subject}`)
				} else if (anu.action == 'promote') {
					Resta.sendMessage(anu.id, {
						image: {
							url: ppuser
						},
						mentions: [num],
						caption: `@${num.split('@')[0]} Promote From ${metadata.subject}`
					})
				} else if (anu.action == 'demote') {
					Resta.sendMessage(anu.id, {
						image: {
							url: ppuser
						},
						mentions: [num],
						caption: `@${num.split('@')[0]} Demote From ${metadata.subject}`
					})
				}
			}
			}
		} catch (err) {
			console.log(err)
		}
	})

	// Setting
	Resta.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	Resta.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = Resta.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})
	const unhandledRejections = new Map()
	process.on('unhandledRejection', (reason, promise) => {
		unhandledRejections.set(promise, reason)
		console.log('Unhandled Rejection at:', promise, 'reason:', reason)
	})
	process.on('rejectionHandled', (promise) => {
		unhandledRejections.delete(promise)
	})
	process.on('Something went wrong', function(err) {
		console.log('Caught exception: ', err)
	})
	Resta.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

	Resta.parseMention = (text = '') => {
		return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	}
	Resta.getName = (jid, withoutContact = false) => {
		id = Resta.decodeJid(jid)
		withoutContact = Resta.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = Resta.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
				id,
				name: 'WhatsApp'
			} : id === Resta.decodeJid(Resta.user.id) ?
			Resta.user :
			(store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}
	var PhoneNumber = require('awesome-phonenumber')
	var botUser = conn.user || {}
	Object.assign(botUser, conn.authState.creds.me || {})
	Resta.user = {
		...botUser,
		jid: Resta.decodeJid(botUser.id) || botUser.id,
	}
     Resta.generateProfilePicture = async (buffer) => {
		var jimp_1 = await Jimp.read(buffer);
		var resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
		var jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
		return {
			img: await resz.getBufferAsync(Jimp.MIME_JPEG)
		}
	}
	Resta.sendContact = async (jid, data, quoted, options) => {
		if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
		var contacts = []
		for (var [number, name] of data) {
			number = number.replace(/[^0-9]/g, '')
			var njid = number + '@s.whatsapp.net'
			var biz = await Resta.getBusinessProfile(njid).catch(_ => null) || {}
			var vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}${biz.description ? `
X-WA-BIZ-NAME:${(Resta.getName(njid) || name).replace(/\n/, '\\n')}
X-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}
`.trim() : ''}\nEMAIL;type=INTERNET: arikarayarikaray@gmail.com\nURL:https://instagram.com/Rw_bot\nADR:;;Indonesia;;;;
END:VCARD
`.trim()
			contacts.push({
				vcard,
				displayName: name
			})

		}
		return await Resta.sendMessage(jid, {
			...options,
			contacts: {
				...options,
				displayName: (contacts.length >= 2 ? `${contacts.length} kontak` : contacts[0].displayName) || null,
				contacts,
			}
		}, {
			quoted,
			...options
		})
	}
	Resta.setStatus = (status) => {
		Resta.query({
			tag: 'iq',
			attrs: {
				to: '@s.whatsapp.net',
				type: 'set',
				xmlns: 'status',
			},
			content: [{
				tag: 'status',
				attrs: {},
				content: Buffer.from(status, 'utf-8')
			}]
		})
		return status
	}

	Resta.serializeM = (m) => serialize(Resta, m)

	Resta.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        startResta();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        startResta();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startResta();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        startResta();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        startResta();
      }
    } else if (connection === "open") {
      console.log(color("Bot success conneted to server", "green"));
      console.log(color("Donate for creator https://saweria.co/sansekai", "yellow"));
      console.log(color("Type /menu to see menu"));
    }
    // console.log('Connected...', update)
  });

	Resta.ev.on('creds.update', saveCreds)

	// Add Other

	/** Resize Image
	 *
	 * @param {Buffer} Buffer (Only Image)
	 * @param {Numeric} Width
	 * @param {Numeric} Height
	 */
	Resta.reSize = async (image, width, height) => {
		let jimp = require('jimp')
		var oyy = await jimp.read(image);
		var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
		return kiyomasa
	}
	// Siapa yang cita-citanya pakai resize buat keliatan thumbnailnya


	/**
	 *
	 * @param {*} jid
	 * @param {*} url
	 * @param {*} caption
	 * @param {*} quoted
	 * @param {*} options
	 */
	Resta.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		let mime = '';
		let res = await axios.head(url)
		mime = res.headers['content-type']
		if (mime.split("/")[1] === "gif") {
			return Resta.sendMessage(jid, {
				video: await getBuffer(url),
				caption: caption,
				gifPlayback: true,
				...options
			}, {
				quoted: quoted,
				...options
			})
		}
		let type = mime.split("/")[0] + "Message"
		if (mime === "application/pdf") {
			return Resta.sendMessage(jid, {
				document: await getBuffer(url),
				mimetype: 'application/pdf',
				caption: caption,
				...options
			}, {
				quoted: quoted,
				...options
			})
		}
		if (mime.split("/")[0] === "image") {
			return Resta.sendMessage(jid, {
				image: await getBuffer(url),
				caption: caption,
				...options
			}, {
				quoted: quoted,
				...options
			})
		}
		if (mime.split("/")[0] === "video") {
			return Resta.sendMessage(jid, {
				video: await getBuffer(url),
				caption: caption,
				mimetype: 'video/mp4',
				...options
			}, {
				quoted: quoted,
				...options
			})
		}
		if (mime.split("/")[0] === "audio") {
			return Resta.sendMessage(jid, {
				audio: await getBuffer(url),
				caption: caption,
				mimetype: 'audio/mpeg',
				...options
			}, {
				quoted: quoted,
				...options
			})
		}
	}

	Resta.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
	var file = await Resta.getFile(path)
	var mtype = '',
	stream = file.data,
	mimetype = options.mimetype || file.mime,
	toBuffer = file.toBuffer,
	convert
				var opt = {}
				if (quoted) opt.quoted = quoted
				if (!file.ext === 'bin') options.asDocument = true
				log({
					type: file
				})
				if (file.res !== null) {
					mimetype = file.res.headers.get('content-type')
				} else {
					mimetype = options.mimetype || file.mime
				}
				if (/webp/.test(file.mime) || (/image/.test(file.mime) && options.asSticker)) mtype = 'sticker'
				else if (/image/.test(file.mime) || (/webp/.test(file.mime) && options.asImage)) mtype = 'image'
				else if (/video/.test(file.mime)) mtype = 'video'
				else if (/audio/.test(file.mime))(
					convert = ptt ? await toAudio(stream, file.ext) : false,
					convert ? stream = convert.data : convert = false,
					convert ? toBuffer = convert.toBuffer : convert = false,
					mtype = 'audio',
					mimetype = ptt ? 'audio/ogg; codecs=opus' : mimetype
				)
				else mtype = 'document'
				if (options.asDocument) mtype = 'document'

				delete options.asSticker
				delete options.asLocation
				delete options.asVideo
				delete options.asDocument
				delete options.asImage

				var message = {
					...options,
					caption,
					ptt,
					[mtype]: {
						stream
					},
					mimetype,
					fileName: filename || ''
				}
				log({
					mimetype
				})
				var error = false
				try {
					return await Resta.sendMessage(jid, message, {
						...opt,
						...options
					})
				} catch (e) {
					console.error(e)
					return await Resta.sendMessage(jid, {
							...message,
							[mtype]: await toBuffer()
						}, {
							...opt,
							...options
						})
						.catch(e => (error = e))
				} finally {
					file.clear()
					if (convert) convert.clear()
					if (error) throw error
				}
			}

	Resta.getFile = async (PATH, saveToFile = false) => {
				var res,
					filename,
					/** @type {Readable | Buffer} */
					data
				if (Buffer.isBuffer(PATH) || Helper.isReadableStream(PATH)) data = PATH
				// Convert ArrayBuffer to buffer using prototype function
				else if (PATH instanceof ArrayBuffer) data = PATH.toBuffer()
				else if (/^data:.*?\/.*?;base64,/i.test(PATH)) data = Buffer.from(PATH.split`,` [1], 'base64')
				else if (/^https?:\/\//.test(PATH)) {
					res = await fetch(PATH)
					data = res.body
				} else if (fs.existsSync(PATH)) {
					filename = PATH
					data = fs.createReadStream(PATH)
				} else data = Buffer.alloc(0)

				var isStream = Helper.isReadableStream(data)
				if (!isStream || Buffer.isBuffer(data)) {
					if (!Buffer.isBuffer(data)) throw new TypeError('Converting buffer to stream, but data have type' + typeof data, data)
					data = toReadable(data)
					isStream = true
				}
				var streamWithType = await fileTypeStream(data) || {
					...data,
					mime: 'application/octet-stream',
					ext: 'bin'
				}
				filename = res ? res.headers ? res.headers.get("content-disposition") ? res.headers.get('content-disposition').split("filename=")[1].replaceAll(/(\")/g, "") : Date.now() + '.' + streamWithType.fileType?.ext : Date.now() + '.' + streamWithType.fileType?.ext : Date.now() + '.' + streamWithType.fileType?.ext
				log(filename)
				if (data && saveToFile && !filename) {
					filename = path.join(__dirname, `../tmp/${filename}`)
					await Helper.saveStreamToFile(data, filename)
				}
				res ? res : res = null
				return {
					res,
					filename,
					...streamWithType.fileType,
					data: streamWithType,
					async toBuffer() {
						var buffers = []
						for await (var chunk of streamWithType) buffers.push(chunk)
						return Buffer.concat(buffers)
					},
					async clear() {
						// if (res) /** @type {Response} */ (res).body
						streamWithType.destroy()
						if (filename) await fs.promises.unlink(filename)
					}
				}
			}
    Resta.sendList = async (jid, title, text, footer, buttonText, listSections, quoted, options) => {
				if (!options) options = {}
				// send a list message!
				var sections = listSections.map(([title, rows]) => ({
					title: !nullish(title) && title || !nullish(rowTitle) && rowTitle || '',
					rows: rows.map(([rowTitle, rowId, description]) => ({
						title: !nullish(rowTitle) && rowTitle || !nullish(rowId) && rowId || '',
						rowId: !nullish(rowId) && rowId || !nullish(rowTitle) && rowTitle || '',
						description: !nullish(description) && description || ''
					}))
				}))

				var listMessage = {
					text,
					footer,
					title,
					buttonText,
					sections
				}
				return conn.sendMessage(jid, listMessage, {
					quoted,
					upload: conn.waUploadToServer,
					...options
				})
				
			}
	Resta.downloadM = async (m, type, opts) => {
		var filename
		if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
		var stream = await downloadContentFromMessage(m, type)
		if (opts.asStream) {
			// TODO: Support return as stream
			// return stream
		}
		// Use push to fix performance issue
		var buffers = []
		for await (var chunk of stream) buffers.push(chunk)
		buffers = Buffer.concat(buffers)

		// Destroy the stream
		stream.destroy()

		// If saveToFile is true, call getFile function to save file and then get filename
		if (opts.saveToFile)({
			filename
		} = await conn.getFile(buffers, true))
		return opts.saveToFile && fs.existsSync(filename) ? filename : buffers

	}
	Resta.sendButton = async (jid, text = '', footer = '', buffer, buttons, quoted, options) => {
		var file,
			toBuffer
		if (Array.isArray(buffer))(
			options = quoted,
			quoted = buttons,
			buttons = buffer,
			buffer = null
		)
		else if (buffer) {
			try {
				file = await Resta.getFile(buffer)
				buffer = file.data
				toBuffer = file.toBuffer
			} catch (e) {
				console.error(e)
				file = buffer = null
			}
		}
		if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string') buttons = [buttons]
		if (!options) options = {}
		var message = {
			...options,
			[buffer ? 'caption' : 'text']: text || '',
			footer,
			buttons: buttons.map(btn => ({
				buttonId: !nullish(btn[1]) && btn[1] || !nullish(btn[0]) && btn[0] || '',
				buttonText: {
					displayText: !nullish(btn[0]) && btn[0] || !nullish(btn[1]) && btn[1] || ''
				}
			})),
			...(buffer ?
				options.asLocation && /image/.test(file.mime) ? {
					location: {
						...options,
						jpegThumbnail: await Resta.reSize(await toBuffer(), 300, 150)
					}
				} : {
					[/video/.test(file.mime) ? 'video' : /image/.test(file.mime) ? 'image' : 'document']: {
						stream: buffer
					},
					mimetype: file.mime
				} : {})
		}

		var error = false
		try {
			return await Resta.sendMessage(jid, message, {
				quoted,
				upload: Resta.waUploadToServer,
				...options
			})
		} catch (e) {
			console.error(error = e)
		} finally {
			if (file) file.clear()
			if (error) throw error
		}
	}
	/** Send List Messaage
	 *
	 *@param {*} jid
	 *@param {*} text
	 *@param {*} footer
	 *@param {*} title
	 *@param {*} butText
	 *@param [*] sections
	 *@param {*} quoted
	 */
	Resta.sendListMsg = (jid, text = '', footer = '', title = '', butText = '', sects = [], quoted) => {
		let sections = sects
		var listMes = {
			text: text,
			footer: footer,
			title: title,
			buttonText: butText,
			sections
		}
		Resta.sendMessage(jid, listMes, {
			quoted: quoted
		})
	}

	/** Send Button 5 Message
	 * 
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} button
	 * @returns 
	 */
	Resta.send5ButMsg = (jid, text = '', footer = '', but = []) => {
		let templateButtons = but
		var templateMessage = {
			text: text,
			footer: footer,
			templateButtons: templateButtons
		}
		Resta.sendMessage(jid, templateMessage)
	}

	Resta.reply =  async (jid, text = '', quoted, options) => {
		return Buffer.isBuffer(text) ? Resta.sendFile(jid, text, 'file', '', quoted, false, options) : Resta.sendMessage(jid, {
			...options,
			text
		}, {
			quoted,
			...options
		})
	}

	/** Send Button 5 Image
	 *
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} image
	 * @param [*] button
	 * @param {*} options
	 * @returns
	 */
	Resta.send5ButImg = async (jid, text = '', footer = '', img, but = [], buff, options = {}) => {
		Resta.sendMessage(jid, {
			image: img,
			caption: text,
			footer: footer,
			templateButtons: but,
			...options
		})
	}

	/** Send Button 5 Location
	 *
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} location
	 * @param [*] button
	 * @param {*} options
	 */
	Resta.send5ButLoc = async (jid, text = '', footer = '', lok, but = [], options = {}) => {
		let bb = await Resta.reSize(lok, 300, 150)
		Resta.sendMessage(jid, {
			location: {
				jpegThumbnail: bb
			},
			caption: text,
			footer: footer,
			templateButtons: but,
			...options
		})
	}

	/** Send Button 5 Video
	 *
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} Video
	 * @param [*] button
	 * @param {*} options
	 * @returns
	 */
	Resta.send5ButVid = async (jid, text = '', footer = '', vid, but = [], buff, options = {}) => {
		let lol = await Resta.reSize(buf, 300, 150)
		Resta.sendMessage(jid, {
			video: vid,
			jpegThumbnail: lol,
			caption: text,
			footer: footer,
			templateButtons: but,
			...options
		})
	}

	/** Send Button 5 Gif
	 *
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} Gif
	 * @param [*] button
	 * @param {*} options
	 * @returns
	 */
	Resta.send5ButGif = async (jid, text = '', footer = '', gif, but = [], buff, options = {}) => {
		let ahh = await Resta.reSize(buf, 300, 150)
		let a = [1, 2]
		let b = a[Math.floor(Math.random() * a.length)]
		Resta.sendMessage(jid, {
			video: gif,
			gifPlayback: true,
			gifAttribution: b,
			caption: text,
			footer: footer,
			jpegThumbnail: ahh,
			templateButtons: but,
			...options
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} buttons 
	 * @param {*} caption 
	 * @param {*} footer 
	 * @param {*} quoted 
	 * @param {*} options 
	 */
	Resta.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
		let buttonMessage = {
			text,
			footer,
			buttons,
			headerType: 2,
			...options
		}
		Resta.sendMessage(jid, buttonMessage, {
			quoted,
			...options
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} text 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendText = (jid, text, quoted = '', options) => Resta.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted,
		...options
	})

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} caption 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await Resta.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} caption 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await Resta.sendMessage(jid, {
			video: buffer,
			caption: caption,
			gifPlayback: gif,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} mime 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await Resta.sendMessage(jid, {
			audio: buffer,
			ptt: ptt,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} text 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendTextWithMentions = async (jid, text, quoted, options = {}) => Resta.sendMessage(jid, {
		text: text,
		mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
		...options
	}, {
		quoted
	})

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}

		await Resta.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

global.thumbloc = async function thumbloc(url, text) {
	return {
		mediaType: 1,
		description: '',
		title: text[0],
		mediaUrl: "",
		body: text[1],
		thumbnailUrl: Buffer.isBuffer(url) ? 'https://telegra.ph/?id=' + makeid(8) : url,
		thumbnail: Buffer.isBuffer(url) ? url : { url },
		sourceUrl: "",
		showAdAttribution: true, // false
		renderLargerThumbnail: true // false
	}
}
	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}

		await Resta.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	/**
	 * 
	 * @param {*} message 
	 * @param {*} filename 
	 * @param {*} attachExtension 
	 * @returns 
	 */
	Resta.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
		// save to file
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}

	Resta.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}

		return buffer
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} filename
	 * @param {*} caption
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await Resta.getFile(path, true)
		let {
			mime,
			ext,
			res,
			data,
			filename
		} = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString())
				}
			} catch (e) {
				if (e.json) throw e.json
			}
		}
		let type = '',
			mimetype = mime,
			pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let {
				writeExif
			} = require('./lib/exif')
			let media = {
				mimetype: mime,
				data
			}
			pathFile = await writeExif(media, {
				packname: options.packname ? options.packname : global.packname,
				author: options.author ? options.author : global.author,
				categories: options.categories ? options.categories : []
			})
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		} else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await Resta.sendMessage(jid, {
			[type]: {
				url: pathFile
			},
			caption,
			mimetype,
			fileName,
			...options
		}, {
			quoted,
			...options
		})
		return fs.promises.unlink(pathFile)
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} message 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	Resta.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

		let mtype = Object.keys(message.message)[0]
		let content = await generateForwardMessageContent(message, forceForward)
		let ctype = Object.keys(content)[0]
		let context = {}
		if (mtype != "conversation") context = message.message[mtype].contextInfo
		content[ctype].contextInfo = {
			...context,
			...content[ctype].contextInfo
		}
		const waMessage = await generateWAMessageFromContent(jid, content, options ? {
			...content[ctype],
			...options,
			...(options.contextInfo ? {
				contextInfo: {
					...content[ctype].contextInfo,
					...options.contextInfo
				}
			} : {})
		} : {})
		await Resta.relayMessage(jid, waMessage.message, {
			messageId: waMessage.key.id
		})
		return waMessage
	}

	Resta.cMod = (jid, copy, text = '', sender = Resta.user.id, options = {}) => {
		//let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
		if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
		}
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === Resta.user.id

		return proto.WebMessageInfo.fromObject(copy)
	}


	return Resta
}

protoType()
smsg()
startResta()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})