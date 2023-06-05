var handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
	conn.math = conn.math ? conn.math : {}
	if (args.length < 1) throw m.reply(`
    ┌─〔 Mode 〕
├ ${Object.keys(modes).join('\n├ ')}
└────    
contoh:
${usedPrefix}math hard
`.trim())
	var mode = args[0].toLowerCase()
	if (!(mode in modes)) throw m.reply(`
    ┌─〔 Mode 〕
├ ${Object.keys(modes).join('\n├ ')}
└────    
contoh:
${usedPrefix}math hard
`.trim())
	var buttons = Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`])
	var id = m.chat
	if (id in conn.math) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.math[id][0])
	var math = genMath(mode)
	conn.math[id] = [
		await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} Exp & Money`, m),
		math, 4,
		setTimeout(async () => {
			if (conn.math[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah ${math.result}`, author, null, [
				['again', `${usedPrefix}${command} ${math.mode}`], ...buttons
			], conn.math[id][0])

			delete conn.math[id]
		}, math.time)
	]
}
handler.help = ['math *mode*']
handler.tags = ['game']
handler.command = /^math/i

module.exports = handler

var modes = {
	noob: [-3, 3, -3, 3, '+-', 18000, 1000],
	easy: [-10, 10, -10, 10, '*/+-', 20000, 2000],
	medium: [-40, 40, -20, 20, '*/+-', 40000, 5000],
	hard: [-100, 100, -70, 70, '*/+-', 60000, 6000],
	extreme: [-999999, 999999, -99999, 99999, '*/', 80000, 8000],
	impossible: [-9999999, 9999999, -999999, 999999, '*/', 100000, 12000],
	impossible2: [-99999999, 99999999, -9999, 9999, '/', 120000, 15000]
}

var operators = {
	'+': '+',
	'-': '-',
	'*': '×',
	'/': '÷'
}

function genMath(mode) {
	var [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
	var a = randomInt(a1, a2)
	var b = randomInt(b1, b2)
	var op = pickRandom([...ops])
	var result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
	if (op == '/')[a, result] = [result, a]
	return {
		str: `${a} ${operators[op]} ${b}`,
		mode,
		time,
		bonus,
		result
	}
}

function randomInt(from, to) {
	if (from > to)[from, to] = [to, from]
	from = Math.floor(from)
	to = Math.floor(to)
	return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)]
}