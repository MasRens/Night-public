const gis = require("g-i-s")

async function print(query) {
	return new Promise((resolve, reject) => {
	  let err = { status: 404, message: "Terjadi kesalahan" }
	  gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
	   if (er) return err
	   let hasil = {
		  status: 200,
		  creator: 'chibot',
		  result: []
	   }
	   res.forEach(x => hasil.result.push(x.url))
	   resolve(hasil)
	  })
	})
}

module.exports.print = print