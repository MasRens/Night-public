var handler = async(m, { conn, args, text } ) => {
twxt = `
*SEWA BOT WHATSAPP*

⚡PAKET G1
Rp10.000,00/1 BULAN
⚡PAKET G2
Rp15.000,00/2 BULAN
⚡PAKET G3
Rp20.000,00/3 BULAN
⚡PAKET G4
Rp25.000,00/4 BULAN
⚡PAKET G5
Rp30.000,00/5 BULAN
⚡PAKET G6
Rp35.000.00/6 BULAN
⚡PAKET G7
Rp40.000.00/7 BULAN

---------------------------------------
Pricelist Perpanjang Masa Aktif Nightbot :

⚡PAKET G1 = Rp5.000
⚡PAKET G2 = Rp7.500
⚡PAKET G3 = Rp10.000
⚡PAKET G4 = Rp12.500
⚡PAKET G5 = Rp15.000
⚡PAKET G6 = Rp17.500
⚡PAKET G7 = Rp20.000

• JASA RUN BOT
• JASA SEWA BOT
• JASA INSTALL PANEL
• JASA PEMBUATAN SCRAPE
• JASA PEMBUATAN WEBSITE`
m.reply(twxt)
}
handler.command = ['sewa', 'sewabot']
module.exports = handler