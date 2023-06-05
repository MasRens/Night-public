const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const isNumber = x => typeof x === 'number' && !isNaN(x)
try { 
var handler = async (m, {command, text, conn, usedPrefix }) => {
switch (command) {
     case 'artimimpi': case 'tafsirmimpi': {	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} belanja`)
                anu = await primbon.tafsir_mimpi(text)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Mimpi :* ${anu.message.mimpi}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Solusi :* ${anu.message.solusi}`, m)
                }
                break
     case 'ramalanjodoh': case 'ramaljodoh': { 	         
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta, 28, 8, 2003, Nama, 16, 11, 2004`)
                let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'ramalanjodohbali': case 'ramaljodohbali': {     	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta, 28, 8, 2003, Nama, 16, 11, 2004`)
                let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'suamiistri': {   	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta, 28, 8, 2003, Nama, 16, 11, 2004`)
                let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama Suami :* ${anu.message.suami.nama}\n⭔ *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n⭔ *Nama Istri :* ${anu.message.istri.nama}\n⭔ *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'ramalancinta': case 'ramalcinta': {   	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta, 28, 8, 2003, Nama, 16, 11, 2004`)
                let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'artinama': {	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta`)
                anu = await primbon.arti_nama(text)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'kecocokannama': case 'cocoknama': {    	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta, 28, 8, 2003`)
                let [nama, tgl, bln, thn] = text.split`,`
                anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Life Path :* ${anu.message.life_path}\n⭔ *Destiny :* ${anu.message.destiny}\n⭔ *Destiny Desire :* ${anu.message.destiny_desire}\n⭔ *Personality :* ${anu.message.personality}\n⭔ *Persentase : ${anu.message.persentase_kecocokan}*`, m)
                }
                break
     case 'kecocokanpasangan': case 'cocokpasangan': {    	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Resta | Nama`)
                let [nama1, nama2] = text.split`|`
                anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendImage(m.chat,  anu.message.gambar, `⭔ *Nama Anda :* ${anu.message.nama_anda}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}`, m)
                }
                break
     case 'jadianpernikahan': case 'jadiannikah': {  	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 16, 11, 2004`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Tanggal Pernikahan :* ${anu.message.tanggal}\n⭔ *karakteristik :* ${anu.message.karakteristik}`, m)
                }
                break
    case 'sifatusaha': {      
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 16, 11, 2004`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Usaha :* ${anu.message.usaha}`, m)
                }
                break
     case 'rejeki': case 'rezeki': {    	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Rezeki :* ${anu.message.rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                 break
     case 'pekerjaan': case 'kerja': {     	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 16, 11, 2004`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Pekerjaan :* ${anu.message.pekerjaan}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'ramalannasib': case 'ramalnasib': case 'nasib': {  	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 16, 11, 2004`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.ramalan_nasib(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Angka Akar :* ${anu.message.angka_akar}\n⭔ *Sifat :* ${anu.message.sifat}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`, m)
                }
                break
     case 'potensipenyakit': case 'penyakit': {   	         
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Sektor :* ${anu.message.sektor}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'artitarot': case 'tarot': {    	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                Resta.sendImage(m.chat, anu.message.image, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Simbol Tarot :* ${anu.message.simbol_tarot}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'fengshui': {  	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Dika, 1, 2005\n\nNote : ${usedPrefix + command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`)
                let [nama, gender, tahun] = text.split`,`
                anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tahun_lahir}\n⭔ *Gender :* ${anu.message.jenis_kelamin}\n⭔ *Angka Kua :* ${anu.message.angka_kua}\n⭔ *Kelompok :* ${anu.message.kelompok}\n⭔ *Karakter :* ${anu.message.karakter}\n⭔ *Sektor Baik :* ${anu.message.sektor_baik}\n⭔ *Sektor Buruk :* ${anu.message.sektor_buruk}`, m)
                }
                break
     case 'haribaik': {   	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.petung_hari_baik(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Kala Tinantang :* ${anu.message.kala_tinantang}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'harisangar': case 'taliwangke': {  	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'harinaas': case 'harisial': {     	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.primbon_hari_naas(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hari Naas :* ${anu.message.hari_naas}\n⭔ *Info :* ${anu.message.catatan}\n⭔ *Catatan :* ${anu.message.info}`, m)
                }
                break
    case 'nagahari': case 'harinaga': {    	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'arahrejeki': case 'arahrezeki': {     	      
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Rezeki :* ${anu.message.arah_rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'peruntungan': {     	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} DIka, 7, 7, 2005, 2022\n\nNote : ${usedPrefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`)
                let [nama, tgl, bln, thn, untuk] = text.split`,`
                anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
     case 'weton': case 'wetonjawa': {     	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.weton_jawa(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Tanggal :* ${anu.message.tanggal}\n⭔ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⭔ *Watak Hari :* ${anu.message.watak_hari}\n⭔ *Naga Hari :* ${anu.message.naga_hari}\n⭔ *Jam Baik :* ${anu.message.jam_baik}\n⭔ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`, m)
                }
                break
    case 'sifat': case 'karakter': {    	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Nama, 28, 8, 2003`)
                let [nama, tgl, bln, thn] = text.split`,`
                anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Garis Hidup :* ${anu.message.garis_hidup}`, m)
                }
                break
    case 'keberuntungan': {   	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} Nama, 28, 8, 2003`)
                let [nama, tgl, bln, thn] = text.split`,`
                anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}`, m)
                }
                break
     case 'memancing': {     	       
                if (!text) throw m.reply (`Example : ${usedPrefix + command} 28, 8, 2003`)
                let [tgl, bln, thn] = text.split`,`
                anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Tanggal :* ${anu.message.tgl_memancing}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
     case 'masasubur': {    	       
                if (!text) throw m.reply ( `Example : ${usedPrefix + command} 12, 1, 2022, 28\n\nNote : ${usedPrefix + command} hari pertama menstruasi, siklus`)
                let [tgl, bln, thn, siklus] = text.split`,`
                anu = await primbon.masa_subur(tgl, bln, thn, siklus)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
    case 'zodiak': case 'zodiac': {    	        
                if (!text) throw m.reply (`Example : ${usedPrefix + command} bln, tgl, thn`)
                let zodiak = [
                    ["capricorn", new Date(1970, 0, 1)],
                    ["aquarius", new Date(1970, 0, 20)],
                    ["pisces", new Date(1970, 1, 19)],
                    ["aries", new Date(1970, 2, 21)],
                    ["taurus", new Date(1970, 3, 21)],
                    ["gemini", new Date(1970, 4, 21)],
                    ["cancer", new Date(1970, 5, 22)],
                    ["leo", new Date(1970, 6, 23)],
                    ["virgo", new Date(1970, 7, 23)],
                    ["libra", new Date(1970, 8, 23)],
                    ["scorpio", new Date(1970, 9, 23)],
                    ["sagittarius", new Date(1970, 10, 22)],
                    ["capricorn", new Date(1970, 11, 22)]
                    ].reverse()
                function getZodiac(month, day) {
                let d = new Date(1970, month - 1, day)
                return zodiak.find(([_,_d]) => d >= _d)[0]
                }
                let date = new Date(text)
                if (date == 'Invalid Date') throw date
                let d = new Date()
                let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
                let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
                let zodiac = await getZodiac(birth[1], birth[2])
                anu = await primbon.zodiak(zodiac)
                if (anu.status == false) return m.reply(anu.message)
                conn.sendText(m.chat, `⭔ *Zodiak :* ${anu.message.zodiak}\n⭔ *Nomor :* ${anu.message.nomor_keberuntungan}\n⭔ *Aroma :* ${anu.message.aroma_keberuntungan}\n⭔ *Planet :* ${anu.message.planet_yang_mengitari}\n⭔ *Bunga :* ${anu.message.bunga_keberuntungan}\n⭔ *Warna :* ${anu.message.warna_keberuntungan}\n⭔ *Batu :* ${anu.message.batu_keberuntungan}\n⭔ *Elemen :* ${anu.message.elemen_keberuntungan}\n⭔ *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                }
                break
default:
}
}
} catch (err) { 
  console.log(err)
  }
handler.command = handler.help = [ 'zodiak', 'artimimpi', 'ramaljodoh', 'suamiistri', 'ramalanjodohbali', 'artinama', 'ramalcinta', 'kecocokanpasangan', 'kecocokannama', 'sifatusaha', 'jadiannikah', 'pekerjaan', 'rezeki', 'potensipenyakit', 'ramalnasib', 'fengshui', 'artitarot', 'harisangar', 'haribaik', 'harinaga', 'harisial', 'peruntungan', 'arahrezeki', 'karakter', 'wetonjawa', 'masasubur', 'memancing']
handler.register = false
handler.limit = true

module.exports = handler