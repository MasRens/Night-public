var { Configuration, OpenAIApi } = require ( "openai")
let handler = async (m, { conn, text }) => {
if (!text) throw m.reply('Masukan Soal Pertanyaan')
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
            m.reply(response.data.choices[0].text)
    }
handler.help = ['ai', 'openai']
handler.command = /^(ai|openai)$/i
handler.register = false

module.exports = handler