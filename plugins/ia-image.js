var { Configuration, OpenAIApi } = require ( "openai")
let handler = async (m, {command, usedPrefix, conn, text }) =>  {
	       try {
            if (!text) return m.reply(`Membuat gambar dari AI.\n\nContoh:\n${usedPrefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: "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",
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            //console.log(response.data.data[0].url)
            conn.sendImage(m.chat, response.data.data[0].url, text, m);
            } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
        }
handler.command = handler.help = ['ai-image', 'openai-gambar']
handler.register = false

module.exports = handler