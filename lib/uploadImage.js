var axios = require("axios");
/**
 * Upload image to uguu.se
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
let { fromBuffer: fileTypeFromBuffer, 
stream: fileTypeStream, 
fromStream: fileTypeFromStream } = require('file-type')
	const form = new former();
	form.append("file", buffer, 'tmp.' + ext)
	try {
		var {
			data
		} = await axios({
			url: "https://tmpfiles.org/api/v1/upload",
			method: "POST",
			headers: {
				...form.getHeaders()
			},
			data: form.getBuffer()

		})
		console.log(data)
		let ew = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.data.url)
		return 'https://tmpfiles.org/dl/' + ew[1]
	} catch (e) {
		throw e
	}
}