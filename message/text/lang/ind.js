/* eslint-disable quotes */
const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('config.json'))

exports.wait = () => {
    return `Sabar ya sayangku :v`
}

exports.ok = () => {
    return `Ok desu~`
}

exports.blomdaftar = () => {
    return `Kamu belum terdaftar sebagai pengguna Bot Alm. RidhoSenpai silahkan kirim ${prefix}verify untuk mendaftar`
}

exports.wrongFormat = () => {
    return `Format salah!, Pastikan sudah benar dengan data di ${prefix}menu`
}

exports.emptyMess = () => {
    return `Harap masukkan pesan yang ingin disampaikan!`
}

exports.cmdNotFound = (cmd) => {
    return `Command *${cmd}* tidak ditemukan!`
}

exports.blocked = (ownerNumber) => {
    return `Bot tidak menerima panggilan. Karena kamu telah melanggar rules, maka kamu telah diblok!\n\nHarap hubungi owner: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `Command ini khusus Owner Alm. Ridho-sama!`
}

exports.doneOwner = () => {
    return `Sudah selesai, Alm. Ridho-sama~`
}

exports.groupOnly = () => {
    return `Command ini hanya bisa digunakan di dalam grup!`
}

exports.adminOnly = () => {
    return `Command ini hanya bisa digunakan oleh admin grup!`
}

exports.notNsfw = () => {
    return `Command NSFW belum diaktifkan!`
}

exports.nsfwOn = () => {
    return `Command NSFW berhasil *diaktifkan*!`
}

exports.nsfwOff = () => {
    return `Command NSFW berhasil *dinonaktifkan*!`
}

exports.nsfwAlready = () => {
    return `Command NSFW sudah diaktifkan sebelumnya.`
}

exports.addedGroup = (chat) => {
    return `Terima kasih telah mengundangku, para member *${chat.contact.name}*!\n\nSilakan register dengan cara ketik:\n${prefix}verify`
}

exports.nhFalse = () => {
    return `Kode tidak valid!`
}

exports.listBlock = (blockNumber) => {
    return `------[ HALL OF SHAME ]------
    
Total diblokir: *${blockNumber.length}* user\n`
}

exports.notPremium = () => {
    return `Yahaha lu bukan user Premium\nUntuk menjadi user Premium silahkan Chat Owner\nwa.me/${ownerNumber.replace('@c.us', '')}?text=Hallo+Owner+tampan+:v`
}

exports.notAdmin = () => {
    return `User bukan seorang admin!`
}

exports.adminAlready = () => {
    return `Tidak dapat mem-promote user yang merupakan admin!`
}

exports.botNotPremium = () => {
    return `Bot ini tidak mendukung command premium. Silakan hubungi pemilik bot ini.`
}

exports.botNotAdmin = () => {
    return `Jadikan bot sebagai admin terlebih dahulu!`
}

exports.ytFound = (res) => {
    return `*Video ditemukan!*\n\n➸ *Judul*: ${res.title}\n➸ *Deskripsi*:\n${res.desc}\n➸ *Durasi*: ${res.duration} menit\n\nMedia sedang dikirim, mohon tunggu...`
}

exports.notRegistered = () => {
    return `Kamu belum terdaftar di database!, Silakan register dengan cara\nContoh : ${prefix}verify`
}

exports.registered = (name, age, userId, time, serial) => {
    return `*「 REGISTRATION 」*\n\nAkun kamu telah terdaftar dengan data:\n\n➸ *Nama*: ${name}\n➸ *Umur*: ${age}\n➸ *ID*: ${userId}\n➸ *Waktu pendaftaran*: ${time}\n➸ *Serial*: ${serial}\n\nCatatan:\nJangan pernah menyebarkan data *serial* ke pada siapapun!\n\nKetik *${prefix}rules* terlebih dahulu ya~`
}

exports.registeredAlready = () => {
    return `Kamu sudah mendaftar sebelumnya.`
}

exports.received = (pushname) => {
    return `Halo ${pushname}!\nTerima kasih telah melapor, laporanmu akan kami segera terima.`
}

exports.limit = (time) => {
    return `Maaf, tetapi kamu telah mencapai limit menggunakan command ini.\nSilakan tunggu *${time.hours}* jam *${time.minutes}* menit *${time.seconds}* detik lagi.`
}

exports.videoLimit = () => {
    return `Ukuran video terlalu besar!`
}

exports.joox = (result) => {
    return `*Lagu ditemukan!*\n\n➸ *Penyanyi*: ${result[0].penyanyi}\n➸ *Judul*: ${result[0].judul}\n➸ *Album*: ${result[0].album}\n➸ *Ext*: ${result[0].ext}\n➸ *Size*: ${result[0].filesize}\n➸ *Durasi*: ${result[0].duration}\n\nMedia sedang dikirim, mohon tunggu...`
}

exports.gsm = (result) => {
    return `➸ *Model HP*: ${result.title}\n➸ *Spesifikasi*: ${result.spec}`
}

exports.receipt = (result) => {
    return `${result.title}\n\n${result.desc}\n\n*Bahan*: ${result.bahan}\n\n*Cara membuat*:\n${result.cara}`
}

exports.ytResult = (urlyt, title, channel, duration, views) => {
    return `➸ *Judul*: ${title}\n➸ *Channel*: ${channel}\n➸ *Durasi*: ${duration}\n➸ *Views*: ${views}\n➸ *Link*: ${urlyt}`
}

exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `-----[ *USER INFO* ]-----\n\n➸ *Username*: ${username}\n➸ *Status*: ${status}\n➸ *Premium*: ${premi}\n➸ *Banned*: ${benet}\n➸ *Admin*: ${adm}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nYour progress:\n➸ *Level*: ${level}\n➸ *XP*: ${xp} / ${requiredXp}`
}

exports.detectorOn = (name, formattedTitle) => {
    return `*「 ANTI GROUP LINK 」*\n\nPerhatian untuk penghuni grup ${(name || formattedTitle)}\nGrup ini memiliki anti-group link detector, apabila ada salah satu member mengirim group link di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\n- Admin ${(name || formattedTitle)}`
}

exports.detectorOff = () => {
    return `Fitur anti-group link berhasil *dinonaktifkan*!`
}

exports.detectorOnAlready = () => {
    return `Fitur anti-group link telah diaktifkan sebelumnya.`
}

exports.antiNsfwOn = (name, formattedTitle) => {
    return `*「 ANTI NSFW LINK 」*\n\nPerhatian untuk penghuni grup ${(name || formattedTitle)}\nGrup ini memiliki anti-NSFW link detector, apabila ada salah satu member mengirim link NSFW/porn di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\n- Admin ${(name || formattedTitle)}`
}

exports.antiNsfwOff = () => {
    return `Fitur anti-NSFW link berhasil *dinonaktifkan*!`
}

exports.antiNsfwOnAlready = () => {
    return `Fitur anti-NSFW link telah diaktifkan sebelumnya.`
}

exports.linkDetected = () => {
    return `*「 ANTI GROUP LINK 」*\n\nKamu mengirim link group chat!\nMaaf tapi kami harus mengeluarkan mu...\nSelamat tinggal~`
}

exports.levelingOn = () => {
    return `Fitur leveling berhasil *diaktifkan*!`
}

exports.levelingOff = () => {
    return `Fitur leveling berhasil *dinonaktifkan*!`
}

exports.levelingOnAlready = () => {
    return `Fitur leveling telah diaktifkan sebelumnya.`
}

exports.levelingNotOn = () => {
    return `Fitur leveling belum diaktifkan!`
}

exports.levelNull = () => {
    return `Kamu belum memiliki level!`
}

exports.welcome = (event) => {
    return `Selamat datang @${event.who.replace('@c.us', '')}!\n\nSemoga betah terus di grup kami ya~`
}

exports.welcomeOn = () => {
    return `Fitur welcome berhasil *diaktifkan*!`
}

exports.welcomeOff = () => {
    return `Fitur welcome berhasil *dinonaktifkan*!`
}

exports.welcomeOnAlready = () => {
    return `Fitur welcome telah diaktifkan sebelumnya.`
}

exports.minimalDb = () => {
    return `Perlu setidaknya *10* user yang memiliki level di database!`
}

exports.autoStikOn = () => {
    return `Fitur auto-stiker berhasil *diaktifkan*!`
}

exports.autoStikOff = () => {
    return `Fitur auto-stiker berhasil *dinonaktifkan*!`
}

exports.autoStikOnAlready = () => {
    return `Fitur auto-stiker telah diaktifkan sebelumnya.`
}

exports.afkOn = (pushname, reason) => {
    return `Fitur AFK berhasil *diaktifkan*!\n\n➸ *Username*: ${pushname}\n➸ *Alasan*: ${reason}`
}

exports.afkOnAlready = () => {
    return `Fitur AFK telah diaktifkan sebelumnya.`
}

exports.afkMentioned = (getReason, getTime) => {
    return `*「 AFK MODE 」*\n\nSssttt! Orangnya lagi AFK, jangan diganggu!\n➸ *Alasan*: ${getReason}\n➸ *Sejak*: ${getTime}`
}

exports.afkDone = (pushname) => {
    return `*${pushname}* telah kembali dari AFK! Selamat datang kembali~`
}

exports.gcMute = () => {
    return `*「 MUTED 」*\n\nHanya admin yang dapat mengirim pesan ke grup ini.`
}

exports.gcUnmute = () => {
    return `*「 UNMUTED 」*\n\nSekarang semua anggota dapat mengirim chat di grup ini.`
}

exports.notNum = (q) => {
    return `"${q}", bukan angka!`
}

exports.playstore = (app_id, title, developer, description, price, free) => {
    return `➸ *Nama*: ${title}\n➸ *ID*: ${app_id}\n➸ *Developer*: ${developer}\n➸ *Gratis*: ${free}\n➸ *Harga*: ${price}\n➸ *Deskripsi*: ${description}`
}

exports.shopee = (nama, harga, terjual, shop_location, description, link_product) => {
    return `➸ *Nama*: ${nama}\n➸ *Harga*: ${harga}\n➸ *Terjual*: ${terjual}\n➸ *Lokasi*: ${shop_location}\n➸ *Link produk*: ${link_product}\n➸ *Deskripsi*: ${description}`
}

exports.pc = (pushname) => {
    return `*「 REGISTRATION 」*\n\nAkun kamu berhasil terdaftar! Silakan cek pesan ku di private chat mu ya ${pushname}~ :3\n\nNote:\nJika kamu tidak menerima pesan, artinya kamu belum save nomor bot.`
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `*「 REGISTERED 」*\n\nAkun ditemukan!\n\n➸ *Nama*: ${name}\n➸ *Umur*: ${age}\n➸ *ID*: ${userId}\n➸ *Waktu pendaftaran*: ${time}\n➸ *Serial*: ${serial}`
}

exports.registeredNotFound = (serial) => {
    return `Akun dengan serial: *${serial}* tidak ditemukan!`
}

exports.ytPlay = (result) => {
    return `*「 PLAY 」*\n\n➸ *Judul*: ${result.title}\n➸ *Durasi*: ${result.duration}\n➸ *Link*: ${result.url}\n\nMedia sedang dikirim, mohon tunggu...`
}
exports.pcOnly = () => {
    return `Command ini hanya bisa digunakan di dalam private chat saja!`
}

exports.linkNsfw = () => {
    return `*「 ANTI NSFW LINK 」*\n\nKamu telah mengirim link NSFW!\nMaaf, tapi aku harus mengeluarkan mu...`
}

exports.ageOld = () => {
    return `Kamu terlalu tua untuk menggunakan fitur ini! Mohon kembali ke masa muda anda agar bisa menggunakannya.`
}

exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
------[ WELCOME ]-----

======================
➸ *Nama*: ${pushname}
➸ *Level*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
➸ *Role*: ${role}
➸ *Premium*: ${premium}
======================

Total pendaftar: *${jumlahUser}*

Berikut adalah menu yang tersedia:

*[1]* Downloader
*[2]* Bot
*[3]* Misc
*[4]* Sticker
*[5]* Weeaboo
*[6]* Fun
*[7]* Moderation
*[8]* NSFW
*[9]* Owner
*[10]* Leveling

Ketik *${prefix}menu* angka_index untuk membuka menu page yang dipilih.

Catatan:
Perlakukan bot secara baik, dev akan bertindak tegas apabila user melanggar rules.
Bot ini terdapat anti-spam yang berupa cooldown command selama *5 detik* setiap kali pemakaian.

Sincerely,
Slavyan
    `
}

exports.menuDownloader = () => {
    return `
-----[ DOWNLOADER ]-----

1. *${prefix}facebook*
Download Facebook video.
Aliases: *fb*
Usage: *${prefix}facebook* link_video

2. *${prefix}ytmp3*
Download YouTube audio.
Aliases: -
Usage: *${prefix}ytmp3* link

3. *${prefix}ytmp4*
Download YouTube video.
Aliases: -
Usage: *${prefix}ytmp4* link

4. *${prefix}joox*
Mencari dan men-download lagu dari Joox.
Aliases: -
Usage: *${prefix}joox* judul_lagu

5. *${prefix}tiktok*
Mendownload video TikTok.
Aliases: -
Usage: *${prefix}tiktok* link_video

6. *${prefix}twitter*
Download Twitter media.
Aliases: *twt*
Usage: *${prefix}twiter* link

7. *${prefix}tiktokpic*
Download profile pic user
Aliases: -
Usage: *${prefix}tiktokpic* username

8. *${prefix}tiktoknowm*
Download video TikTok tanpa WM.
Aliases: *tktnowm*
Usage: *${prefix}tiktoknowm* link_video

_Index of [1]_
    `
}

exports.iklandulu = () => {
    return `
┌──「 𝙄𝙆𝙇𝘼𝙉 」
│ 
├ Sewa : 10k/grup (bulan)
├ Buat : 50k (bisa jadi owner)
├ Pembayaran bisa melalui
├ gopay, pulsa +5k (karena kena rate)
│
├──「 𝙆𝙀𝙐𝙉𝙏𝙐𝙉𝙂𝘼𝙉 𝙎𝙀𝙒𝘼 𝘽𝙊𝙏 」
│
├ 1. Bisa Menjadi user premium!
├ 2. Bisa Mendapatkan command premium
│
├──「 𝙆𝙀𝙐𝙉𝙏𝙐𝙉𝙂𝘼𝙉 𝘽𝙐𝘼𝙏 𝘽𝙊𝙏 」
│
├ 1. Bisa menjadi owner bot seniri
├ 2. Bisa mengganti nama bot sendiri
├ 3. Bisa membawa bot ke grup sendiri
├ 4. Bisa menggunakan command owner
├ 5. Bisa menyewakan bot kembali
│
└──「 *Alm. Alm. RidhoSenpai* 」
`
}

exports.snk = () => {
    return `Syarat dan Ketentuan Bot '''Alm. Alm. RidhoSenpai'''
1. Teks dan nama pengguna WhatsApp anda akan kami simpan di dalam server selama bot aktif
2. Data anda akan di hapus ketika bot Offline
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
6. Apapun yang anda perintah pada bot ini, KAMI TIDAK AKAN BERTANGGUNG JAWAB!

Thanks !`
}

exports.donatenya = () => {
    return `──「 𝘿𝙊𝙉𝘼𝙏𝙀 」──

Donasi bisa melalui
Pulsa/Gopay : 0895-3261-59282
Terima kasih yang sudah mau donasi...
└ hasil donasi akan digunakan penambahan biaya API-KEY

──「 *Alm. Alm. RidhoSenpai* 」──
`
}

exports.listbahasatts = () => {
    return `List kode Bahasa\n
  Code       Bahasa
    sq        Albanian
    ar        Arabic
    hy        Armenian
    ca        Catalan
    zh        Chinese
    zh-cn     Chinese (China)
    zh-tw     Chinese (Taiwan)
    zh-yue    Chinese (Cantonese)
    hr        Croatian
    cs        Czech
    da        Danish
    nl        Dutch
    en        English
    en-au     English (Australia)
    en-uk     English (United Kingdom)
    en-us     English (United States)
    eo        Esperanto
    fi        Finnish
    fr        French
    de        German
    el        Greek
    ht        Haitian Creole
    hi        Hindi
    hu        Hungarian
    is        Icelandic
    id        Indonesian
    it        Italian
    ja        Japanese
    ko        Korean
    la        Latin
    lv        Latvian
    mk        Macedonian
    no        Norwegian
    pl        Polish
    pt        Portuguese
    pt-br     Portuguese (Brazil)
    ro        Romanian
    ru        Russian
    sr        Serbian
    sk        Slovak
    es        Spanish
    es-es     Spanish (Spain)
    es-us     Spanish (United States)
    sw        Swahili
    sv        Swedish
    ta        Tamil
    th        Thai
    tr        Turkish
    vi        Vietnamese
    cy        Welsh
`
}

exports.menuIngfo = () => {
    return `┌──「 INFO-MENU 」
│
├ ${prefix}runtime
├ ${prefix}ping
├ ${prefix}speed
├ ${prefix}iklan
├ ${prefix}info
├ ${prefix}limit
├ ${prefix}snk
├ ${prefix}donate
├ ${prefix}senpaigroup
├ ${prefix}owner
├ ${prefix}listbanned
├ ${prefix}listblock
├ ${prefix}listpremium
│
└──「 *Alm. Alm. RidhoSenpai* 」
 `
}

exports.menuSystem = () => {
    return `┌──「 SYSTEM-MENU 」
│
├ ${prefix}nsfw enable|disable
├ ${prefix}welcome enable|disable
├ ${prefix}simi enable|disable
├ ${prefix}antilink enable|disable
├ ${prefix}autosticker enable|disable
├ ${prefix}antinsfw enable|disable
├ ${prefix}leveling enable|disable
├ ${prefix}balance enable|disable
├ ${prefix}cekbalance
├ ${prefix}ceklevel
├ ${prefix}topbalance
├ ${prefix}toplevel
│
└──「 *Alm. Alm. RidhoSenpai* 」
 `
}

exports.menuLainya = () => {
    return `┌──「 OTHER-MENU 」
│
├ ${prefix}apkpure [optional]
├ ${prefix}randompic
├ ${prefix}darkjokes
├ ${prefix}randompuisi
├ ${prefix}cersex
├ ${prefix}infoloker
├ ${prefix}bucin
├ ${prefix}infomobil [optional]
├ ${prefix}infomotor [optional]
├ ${prefix}zodiak [optional]
├ ${prefix}me
├ ${prefix}fakename
├ ${prefix}triggered [reply pesan]
├ ${prefix}weton tanggal | bulan | tahun
├ ${prefix}spamsms 0812xxxxxxxx jumlah_pesan
├ ${prefix}spamcall 812xxxxxxxx
├ ${prefix}motivasi
├ ${prefix}cekongkir kurir | asal | tujuan
├ ${prefix}tosticker [reply chat orang]
├ ${prefix}hilih [reply chat]
├ ${prefix}halah [reply chat]
├ ${prefix}holoh [reply chat]
├ ${prefix}heleh [reply chat]
├ ${prefix}huluh [reply chat]
├ ${prefix}cekpremium
├ ${prefix}readmore teks1 | teks2
├ ${prefix}imgtourl
├ ${prefix}infohoax
├ ${prefix}jobseek
├ ${prefix}asupan
├ ${prefix}wasted [reply image]
├ ${prefix}kiss [reply chat]
├ ${prefix}jadwalbola
├ ${prefix}news
├ ${prefix}newsline
├ ${prefix}distance daerah1 | daerah2
├ ${prefix}addimage [teks]
├ ${prefix}getimage [nama]
├ ${prefix}imagelist
├ ${prefix}addvn [reply vn]
├ ${prefix}getvn [nama vn]
├ ${prefix}listvn
├ ${prefix}linesticker [link]
├ ${prefix}trendtwit
├ ${prefix}cecan
├ ${prefix}cogan
├ ${prefix}estetik
├ ${prefix}bass [reply vn]
├ ${prefix}tomp3 [reply video]
├ ${prefix}flip
├ ${prefix}katabijak
├ ${prefix}fakta
├ ${prefix}pantun
├ ${prefix}bahasa
├ ${prefix}toimg
├ ${prefix}neko
├ ${prefix}nomorhoki [nohp]
├ ${prefix}artimimpi [optional]
├ ${prefix}infoalamat [optional]
├ ${prefix}pokemon
├ ${prefix}inu
├ ${prefix}quotes
├ ${prefix}infogempa
├ ${prefix}ptl
├ ${prefix}dadu
├ ${prefix}koin
├ ${prefix}bugreport [ᴛᴇᴋs]
├ ${prefix}listblock
├ ${prefix}listbanned
├ ${prefix}listgroup
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuPremiums = () => {
    return `┌──「 PREMIUM-MENU 」
│
├ ${prefix}ban add/del @tag
├ ${prefix}kickreply [replychatmember]
├ ${prefix}edotensei @tagmember
├ ${prefix}animesearch [optional]
├ ${prefix}yts [optional]
├ ${prefix}shopee [optional]
├ ${prefix}playstore [optional]
│
└──「 *Alm. Alm. RidhoSenpai* 」
`
}

exports.menuStikel = () => {
    return `┌──「 STICKER-MENU 」
│
├ ${prefix}snobg [reply image]
├ ${prefix}stickerwaifu
├ ${prefix}striggered [reply image]
├ ${prefix}sticker [reply image]
├ ${prefix}sgif
├ ${prefix}ttg [teks]
├ ${prefix}ttp [teks]
├ ${prefix}ttps [teks]
├ ${prefix}tosticker [reply chat]
├ ${prefix}stickerp [reply image]
├ ${prefix}stcwm author | packname
├ ${prefix}takestick author | packname
├ ${prefix}stcmeme teksatas | teksbawah
├ ${prefix}esticker [emoji]
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuIslam = () => {
    return `┌──「 PRAY-MENU 」
│
├ ${prefix}alkitabharian
├ ${prefix}renungan
├ ${prefix}alkitab [nama_injil]
├ ${prefix}quran [urutan surah] 
├ ${prefix}tafsir [nama surah] [ayat] 
├ ${prefix}jadwalsholat [daerah] 
├ ${prefix}listsurah 
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuKerang = () => {
    return `┌──「 KERANG-MENU 」
│
├ ${prefix}apakah [optional]
├ ${prefix}rate [optional]
├ ${prefix}bisakah [optional]
├ ${prefix}kapankah [optional]
├ ${prefix}ratecantik [optional]
├ ${prefix}ratetampan [optional]
├ ${prefix}ratelesbi [optional]
├ ${prefix}rategay [optional]
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuAnimek = () => {
    return `┌──「 ANIME-MENU 」
│
├ ${prefix}maluser [optional]
├ ${prefix}nhentaipdf [KODE NUKLIR]
├ ${prefix}samehadaku [optional]
├ ${prefix}wallanime
├ ${prefix}kemono
├ ${prefix}loli
├ ${prefix}shota
├ ${prefix}waifu
├ ${prefix}husbu
├ ${prefix}wait [reply image]
├ ${prefix}malanime [optional]
├ ${prefix}malcharacter [optional] 
├ ${prefix}animesearch [optional] 
├ ${prefix}anoboylast
├ ${prefix}neonimelast
├ ${prefix}randomcry
├ ${prefix}randomanime
├ ${prefix}randomkiss
├ ${prefix}randomhug
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuMedianye = () => {
    return `┌──「 MEDIA-MENU 」
│
├ ${prefix}togel
├ ${prefix}cineplexlast
├ ${prefix}lk21 [optional]
├ ${prefix}mediafire [LINK]
├ ${prefix}heroml [optional]
├ ${prefix}shortbitly [LINK]
├ ${prefix}shorttiny [LINK]
├ ${prefix}subreddit [optional]
├ ${prefix}happymod [optional]
├ ${prefix}moddroid [optional]
├ ${prefix}tiktokstalk [username]
├ ${prefix}trending
├ ${prefix}findsticker [optional]
├ ${prefix}gsmarena [optional]
├ ${prefix}pasangan nama | pasangan
├ ${prefix}artinama [optional]
├ ${prefix}movie [optional]
├ ${prefix}wallpaper 
├ ${prefix}nulis [teks] 
├ ${prefix}resepmakanan [optional] 
├ ${prefix}tts kode bahasa | teksnya
├ ${prefix}igstalk [username] 
├ ${prefix}tiktokstalk [username] 
├ ${prefix}smulestalk [username] 
├ ${prefix}kbbi [optional] 
├ ${prefix}wiki [optional] 
├ ${prefix}google [optional] 
├ ${prefix}pinterest [optional]  
├ ${prefix}brainly [optional] 
├ ${prefix}lirik [optional]
├ ${prefix}qrcode [optional] 
├ ${prefix}maps [optional] 
├ ${prefix}whois [ipnya] 
├ ${prefix}ssweb [linknya] 
├ ${prefix}shorturl [linknya] 
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuNswfs = () => {
    return `┌──「 NSFW-MENU 」
│
├ ${prefix}nekopoihentai
├ ${prefix}nekopoijav
├ ${prefix}3dnekopoilast
├ ${prefix}nekopoicosplay
├ ${prefix}fetish armpits
├ ${prefix}fetish feets
├ ${prefix}fetish thighs
├ ${prefix}fetish ass
├ ${prefix}fetish boobs
├ ${prefix}fetish belly
├ ${prefix}fetish sideboobs
├ ${prefix}fetish ahegao
├ ${prefix}lewds
├ ${prefix}mlewd
├ ${prefix}femdom
├ ${prefix}lewdavatar
├ ${prefix}yuri
├ ${prefix}phdl [url]
├ ${prefix}waifu18
├ ${prefix}nekosearch [optional]
├ ${prefix}randomhentai 
├ ${prefix}randomnsfwneko 
├ ${prefix}randomtrapnime
├ ${prefix}randomblowjob
├ ${prefix}nhsearch [optional]
├ ${prefix}nhentai [kode] 
├ ${prefix}nhdl [kode]
├ ${prefix}nekopoilast
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuGrupnyee = () => {
    return `
┌──「 GROUP-MENU 」
│
├ ${prefix}tagme
├ ${prefix}grayscale @tag/me
├ ${prefix}beautiful @tag/me
├ ${prefix}blur @tag/me
├ ${prefix}invert @tag/me
├ ${prefix}jokeoverhead @tag/me
├ ${prefix}hitler @tag/me
├ ${prefix}pacefalm @tag/me
├ ${prefix}circle @tag/me
├ ${prefix}clyde [teks]
├ ${prefix}changemymind [teks]
├ ${prefix}sepia @tag/me
├ ${prefix}shit @tag/me
├ ${prefix}rainbow @tag/me
├ ${prefix}rip @tag/me
├ ${prefix}wanted @tag/me
├ ${prefix} [teks]
├ ${prefix}reminder 10s | pesan_pengingat
├ ${prefix}jadian
├ ${prefix}fun [tanya]
├ ${prefix}truth
├ ${prefix}dare
├ ${prefix}tod
├ ${prefix}ava [reply chat orang]
├ ${prefix}afk [alasan]
├ ${prefix}setgrupname [optional]
├ ${prefix}sider [reply chat bot]
├ ${prefix}linkgrup
├ ${prefix}resetlinkgrup
├ ${prefix}setgroupicon
├ ${prefix}groupinfo
├ ${prefix}add 628xxxx 
├ ${prefix}kick @tag
├ ${prefix}promote @tag
├ ${prefix}demote @tag
├ ${prefix}tagall
├ ${prefix}adminlist
├ ${prefix}ownergroup
├ ${prefix}leave
├ ${prefix}delete [reply chat bot]
├ ${prefix}opengc
├ ${prefix}closegc
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuOwners = () => {
    return `┌──「 OWNER-MENU 」
│
├ ${prefix}getses
├ ${prefix}exif pack_name | author_name
├ ${prefix}shutdown
├ ${prefix}bc
├ ${prefix}leaveall
├ ${prefix}block 𝟼𝟸𝟾𝟻𝟾xxxxx
├ ${prefix}unblock 𝟼𝟸𝟾𝟻𝟾xxxxx
├ ${prefix}restart
├ ${prefix}eval [kode javascript]
├ ${prefix}setname
├ ${prefix}setstatus
├ ${prefix}setpict
├ ${prefix}banchat
├ ${prefix}premium add 𝟼𝟸𝟾𝟻𝟾xxxxx 30d
├ ${prefix}premium del 𝟼𝟸𝟾𝟻𝟾xxxxx
├ ${prefix}unbanchat
├ ${prefix}addsay [teks]
├ ${prefix}delsay [teks]
│
└──「 *Alm. Alm. RidhoSenpai* 」
`
}

exports.menuFuns = () => {
    return `┌──「 FUN-MENU 」
│
├ ${prefix}cekwatak
├ ${prefix}meme
├ ${prefix}family100
├ ${prefix}tebakgambar
├ ${prefix}caklontong
├ ${prefix}citacita
├ ${prefix}toxic
├ ${prefix}talk [teks]
├ ${prefix}say
├ ${prefix}partner
├ ${prefix}next
├ ${prefix}hug @tagmember
├ ${prefix}pat @tagmember
├ ${prefix}nye @tagmember
├ ${prefix}saylist
├ ${prefix}slap @tagmember
│
└──「 *Alm. Alm. RidhoSenpai* 」
`
}

exports.menuDownloads = () => {
    return `┌──「 DOWNLOADER-MENU 」
│ 
├ ${prefix}indoxxi [optional]
├ ${prefix}ytmp3 [link]
├ ${prefix}ytmp4 [link]
├ ${prefix}igdl [link]
├ ${prefix}fb [link]
├ ${prefix}twitter [link]
├ ${prefix}smule [link]
├ ${prefix}tiktokpic [username]
├ ${prefix}tiktoknowm [link]
├ ${prefix}tiktok [link]
├ ${prefix}starmaker [link]
├ ${prefix}joox [optional]
├ ${prefix}play [optional]
├ ${prefix}igstory [optional]
│
└──「 *Alm. Alm. RidhoSenpai* 」`
}

exports.menuMaker = () => {
    return `┌──「 MAKER-MENU 」
│
├ ${prefix}cute [reply image]
├ ${prefix}affect [reply image]
├ ${prefix}deletedd [reply image]
├ ${prefix}gay [reply image]
├ ${prefix}jail [reply image]
├ ${prefix}trash [reply image]
├ ${prefix}captcha [reply image]
├ ${prefix}blurpify [reply image]
├ ${prefix}deepfry [reply image]
├ ${prefix}threats [reply image]
├ ${prefix}captain [teks]
├ ${prefix}kanna [teks]
├ ${prefix}trumptweet [teks]
├ ${prefix}luxury [teks]
├ ${prefix}vintage [teks]
├ ${prefix}summer [teks]
├ ${prefix}realcloud [teks]
├ ${prefix}pantai [teks]
├ ${prefix}pantai2 [teks]
├ ${prefix}balon [teks]
├ ${prefix}lem [teks]
├ ${prefix}gplaybutton [teks]
├ ${prefix}splaybutton [teks]
├ ${prefix}cmd [teks]
├ ${prefix}tahta [teks]
├ ${prefix}galaxy [teks]
├ ${prefix}blmaker nama1 | nama2
├ ${prefix}mlmaker nama_hero | teks
├ ${prefix}firemaker [teks]
├ ${prefix}blackpink [teks]
├ ${prefix}ffbanner teks1 | teks2
├ ${prefix}fflogo teks1 | teks2
├ ${prefix}phcomment username | teks
├ ${prefix}text3d [teks]
├ ${prefix}glitchtext teks1 | teks2
├ ${prefix}calender [reply image]
├ ${prefix}neongreen [teks]
├ ${prefix}neonblue [teks]
├ ${prefix}tiktod teks1|teks2
├ ${prefix}hemker [teks]
├ ${prefix}wolf1 teks|teks
├ ${prefix}wolf2 teks|teks
├ ${prefix}ttps [teks]
├ ${prefix}ttp [teks]s
├ ${prefix}ttg [teks]
├ ${prefix}sandwriting [teks]
├ ${prefix}joker [teks]
├ ${prefix}singa teks|teks
├ ${prefix}ninja teks|teks
├ ${prefix}beruang [teks]
├ ${prefix}rabbit [teks]
├ ${prefix}weasel [teks]
├ ${prefix}dragon [teks]
├ ${prefix}wolfblue [teks]
├ ${prefix}shark [teks]
├ ${prefix}phmaker teks_kiri | teks_kanan
├ ${prefix}esticker [emoji]
│
└──「 *Alm. Alm. RidhoSenpai* 」
`
}

exports.menuBot = () => {
    return `
-----[ BOT ]-----

1. *${prefix}rules*
Wajib baca.
Aliases: *rule*
Usage: *${prefix}rules*

2. *${prefix}menu*
Menampilkan commands yang tersedia.
Aliases: *help*
Usage: *${prefix}menu* angka_index

3. *${prefix}status*
Menampilkan status bot.
Aliases: *stats*
Usage: *${prefix}status*

4. *${prefix}listblock*
Cek nomor yang diblokir.
Aliases: -
Usage: *${prefix}listblock*

5. *${prefix}ping*
Cek speed bot.
Aliases: *p*
Usage: *${prefix}ping*

6. *${prefix}delete*
Hapus pesan dari bot.
Aliases: *del*
Usage: Reply pesan yang dihapus dengan caption *${prefix}delete*.

7. *${prefix}report*
Laporkan bug ke dev.
Aliases: -
Usage: *${prefix}report* pesan

8. *${prefix}tos*
Syarat dan ketentuan. (TOS)
Aliases: -
Usage: *${prefix}tos*

9. *${prefix}join*
Join grup via link.
Aliases: -
Usage: *${prefix}join* link_group

10. *${prefix}ownerbot*
Mengirim kontak owner.
Aliases: -
Usage: *${prefix}ownerbot*

11. *${prefix}getpic*
Mengirim foto profil user.
Aliases: -
Usage: *${prefix}getpic* @user/62812xxxxxxxx

12. *${prefix}premiumcheck*
Cek masa aktif premium.
Aliases: *cekpremium*
Usage: *${prefix}premiumcheck*

13. *${prefix}premiumlist*
Cek list user premium.
Aliases: *listpremium*
Usage: *${prefix}premiumlist*

_Index of [2]_
    `
}

exports.menuMisc = () => {
    return `
-----[ MISC ]-----

1. *${prefix}say*
Bot akan mengulang pesan mu.
Aliases: -
Usage: *${prefix}say* teks

2. *${prefix}lirik*
Mencari lirik lagu.
Aliases: -
Usage: *${prefix}lirik* judul_lagu

3. *${prefix}shortlink*
Membuat shortlink.
Aliases: -
Usage: *${prefix}shortlink* link

4. *${prefix}wikipedia*
Mengirim Wikipedia dari teks yang diberikan.
Aliases: *wiki*
Usage: *${prefix}wikipedia* teks

5. *${prefix}kbbi*
Mengirim definisi kata dari KBBI.
Aliases: -
Usage: *${prefix}kbbi* teks

6. *${prefix}igstalk*
Stalk akun Instagram.
Aliases: -
Usage: *${prefix}igstalk* username

7. *${prefix}gsmarena*
Mengirim info spesifikasi HP dari GSMArena.
Aliases: -
Usage: *${prefix}gsmarena* model_hp

8. *${prefix}receipt*
Mengirim resep makanan.
Aliases: *resep*
Usage: *${prefix}receipt* nama_makanan

9. *${prefix}ytsearch*
Mengirim hasil pencarian di YouTube.
Aliases: *yts*
Usage: *${prefix}ytsearch* query

10. *${prefix}tts*
Membuat Text to Speech. Kalian perlu kode bahasa setiap menggunakan, cek di sini https://id.wikipedia.org/wiki/Daftar_bahasa_menurut_ISO_639-2
Aliases: -
Usage: *${prefix}tts* kode_bahasa | teks

11. *${prefix}afk*
Set akun kamu ke mode AFK, aku akan mengirim pesan ke orang yang me-mention kamu.
Aliases: -
Usage: *${prefix}afk* alasan. Kirim pesan ke grup untuk menonaktifkan mode AFK.

12. *${prefix}distance*
Untuk mengetahui jarak dari kotamu ke kota yang kamu tuju
Aliases: -
Usage: *${prefix}distance* kota_asal | kota_tujuan

13. *${prefix}findsticker*
Untuk mencari sticker yang kamu cari
Aliases: *findstiker*
Usage: *${prefix}findsticker* teks

14. *${prefix}math*
Kalkulator.
* = Perkalian
+ = Pertambahan
- = Pengurangan
/ = Pembagian
Aliases: -
Usage: *${prefix}math* 12*12

15. *${prefix}listsurah*
Melihat list surah Al-Qur'an.
Aliases: -
Usage: *${prefix}listsurah*

16. *${prefix}surah*
Mengirim surah Al-Qur'an.
Aliases: -
Usage: *${prefix}surah* nomor_surah

17. *${prefix}js*
Mengetahui jadwal shalat di daerah kalian
Aliases: - 
Usage: *${prefix}js* namadaerah

18. *${prefix}mutual*
Dapatkan kontak WA random.
Aliases: -
Usage: *${prefix}mutual*

19. *${prefix}whois*
IP look-up.
Aliases: -
Usage: *${prefix}whois* ip_address

20. *${prefix}play*
Play audio dari YouTube.
Aliases: - 
Usage: *${prefix}play* judul_video

21. *${prefix}sms*
Mengirim SMS secara anonymous. (SMS gateway)
Aliases: -
Usage: *${prefix}sms* pesan | nomor_penerima

22. *${prefix}toxic*
Random toxic.
Aliases: -
Usage: *${prefix}toxic*

23. *${prefix}tafsir*
Tafsir ayat surah Al-Qur'an.
Aliases: -
Usage: *${prefix}tafsir* nama_surah  ayat

24. *${prefix}motivasi*
Kata-kata motivasi.
Aliases: -
Usage: *${prefix}motivasi*

25. *${prefix}linesticker*
Sticker Line terbaru.
Aliases: *linestiker*
Usage: *${prefix}linesticker*

26. *${prefix}alkitab*
Al-Kitab search.
Aliases: -
Usage: *${prefix}* nama_injil

27. *${prefix}cekongkir*
Cek ongkos kirim.
Aliases: -
Usage: *${prefix}ongkir* kurir | asal | tujuan

28. *${prefix}movie*
Cari film.
Aliases: -
Usage: *${prefix}movie* judul

28. *${prefix}reminder*
Pengingat. 
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${prefix}reminder* 10s | pesan_pengingat

29. *${prefix}imagetourl*
Image uploader.
Aliases: *imgtourl*
Usage: Kirim gambar dengan caption *${prefix}imagetourl* atau reply gambar dengan caption *${prefix}imagetourl*.

30. *${prefix}infohoax*
Cek update info hoax.
Aliases: -
Usage: *${prefix}infohoax*

31. *${prefix}trending*
Cek trending di Twitter.
Aliases: -
Usage: *${prefix}trending*

32. *${prefix}jobseek*
Mencari info lowongan kerja.
Aliases: -
Usage: *${prefix}jobseek*

33. *${prefix}spamcall*
Spam call.
Aliases: -
Usage: *${prefix}spamcall* 812xxxxxxxx

34. *${prefix}spamsms*
Spam SMS.
Aliases: -
Usage: *${prefix}spamsms* 0812xxxxxxxx jumlah_pesan

_Index of [3]_
    `
}

exports.menuSticker = () => {
    return `
-----[ STICKER ]-----

1. *${prefix}sticker*
Membuat stiker dari gambar yang dikirim atau di-reply.
Aliases: *stiker*
Usage: Kirim gambar dengan caption *${prefix}sticker* atau reply gambar dengan caption *${prefix}sticker*.

2. *${prefix}stickergif*
Membuat stiker dari video MP4 atau GIF yang dikirim atau di-reply.
Aliases: *stikergif*
Usage: Kirim video/GIF dengan caption *${prefix}stickergif* atau reply video/GIF dengan caption *${prefix}stickergif*.

3. *${prefix}ttg*
Membuat stiker text to GIF.
Aliases: -
Usage: *${prefix}ttg* teks

4. *${prefix}stickertoimg*
Konversi stiker ke foto.
Aliases: *stikertoimg toimg*
Usage: Reply sticker dengan caption *${prefix}stickertoimg*.

5. *${prefix}emojisticker*
Konversi emoji ke stiker.
Aliases: *emojistiker*
Usage: *${prefix}emojisticker* emoji

6. *${prefix}stickerwm*
Buat stiker dengan WM.
Aliases: *stcwm*
Usage: Kirim gambar dengan caption *${prefix}stickerwm* pack_name | author_name atau reply gambar dengan caption *${prefix}stickerwm* pack_name | author_name.

7. *${prefix}stickermeme*
Buat sticker meme.
Aliases: *stcmeme*
Usage: Kirim gambar dengan caption *${prefix}stickermeme* teks_atas | teks_bawah atau reply gambar dengan caption *${prefix}stickermeme* teks_atas | teks_bawah.

8. *${prefix}takestick*
Merubah watermark sticker.
Aliases: -
Usage: Reply stiker dengan caption *${prefix}takestick* pack_name | author_name

_Index of [4]_
    `
}

exports.menuWeeaboo = () => {
    return `
-----[ WEEABOO ]-----

1. *${prefix}neko*
Mengirim foto neko girl.
Aliases: -
Usage: *${prefix}neko*

2. *${prefix}wallpaper*
Mengirim wallpaper anime.
Aliases: *wp*
Usage: *${prefix}wallpaper*

3. *${prefix}kemono*
Mengirim foto kemonomimi girl.
Aliases: -
Usage: *${prefix}kemono*

4. *${prefix}kusonime*
Mencari info anime dan link download batch di Kusonime.
Aliases: -
Usage: *${prefix}kusonime* judul_anime

5. *${prefix}komiku*
Mencari info manga dan link download di Komiku.
Aliases: -
Usage: *${prefix}komiku* judul_manga

6. *${prefix}wait*
Mencari source anime dari screenshot scene.
Aliases: -
Usage: Kirim screenshot dengan caption *${prefix}wait* atau reply screenshot dengan caption *${prefix}wait*.

7. *${prefix}source*
Mencari source dari panel doujin, ilustrasi, dan gambar yang berhubungan dengan anime.
Aliases: *sauce*
Usage: Kirim gambar dengan caption *${prefix}source* atau reply gambar dengan caption *${prefix}source*.

8. *${prefix}waifu*
Mengirim random foto waifu.
Aliases: -
Usage: *${prefix}waifu*

9. *${prefix}anitoki*
Cek update terbaru Anitoki.
Aliases: -
Usage: *${prefix}anitoki*

10. *${prefix}neonime*
Cek update terbaru Neonime.
Aliases: -
Usage: *${prefix}neonime*

11. *${prefix}anoboy*
Cek on-going anime dari Anoboy.
Aliases: -
Usage: *${prefix}anoboy*

_Index of [5]_
    `
}

exports.menuFun = () => {
    return `
-----[ FUN ]-----

1. *${prefix}hartatahta*
Membuat gambar Harta Tahta Nama.
Aliases: -
Usage: *${prefix}hartatahta* nama

2. *${prefix}partner*
Weton jodoh.
Aliases: *pasangan*
Usage: *${prefix}partner* nama | pasangan

3. *${prefix}zodiac*
Ramalan zodiak Mingguan.
Aliases: *zodiak*
Usage: *${prefix}zodiac* zodiak

4. *${prefix}write*
Membuat catatan tulisan di buku.
Aliases: *nulis*
Usage: *${prefix}write* teks

5. *${prefix}glitchtext*
Membuat gambar teks glitch.
Aliases: *glitext*
Usage: *${prefix}glitchtext* teks1 | teks2

6. *${prefix}simi*
Chat SimiSimi.
Aliases: -
Usage: *${prefix}simi* teks

7. *${prefix}blackpink*
Membuat teks dengan style logo Blackpink.
Aliases: -
Usage: *${prefix}blackpink* teks

8. *${prefix}phmaker*
Membuat teks dengan style logo Pornhub.
Aliases: -
Usage: *${prefix}phmaker* teks_kiri | teks_kanan

9. *${prefix}galaxy*
Membuat gambar teks galaxy.
Aliases: -
Usage: *${prefix}galaxy* teks

10. *${prefix}tod*
Bermain truth or dare.
Aliases: -
Usage: *${prefix}tod*

11. *${prefix}weton*
Kirim ramalan weton.
Aliases: -
Usage: *${prefix}weton* tanggal | bulan | tahun

12. *${prefix}triggered*
Membuat efek triggered.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}triggered* atau reply pesan orang dengan *${prefix}triggered* atau bisa gunakan command *${prefix}triggered* langsung.

13. *${prefix}kiss*
Kiss someone ( ͡° ͜ʖ ͡°).
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}kiss* atau reply gambar dengan *${prefix}kiss*.

14. *${prefix}asupan*
Asupan video cewek-cewek.
Aliases: -
Usage: *${prefix}asupan*

15. *${prefix}citacita*
Meme cita-cita.
Aliases: -
Usage: *${prefix}citacita*

16. *${prefix}phcomment*
Membuat capton ala PH comment.
Aliases: -
Usage: *${prefix}phcomment* username | teks

17. *${prefix}ffbanner*
Membuat banner Free Fire.
Aliases: -
Usage: *${prefix}ffbanner* teks1 | teks2

18. *${prefix}fflogo*
Membuat logo karakter Free Fire.
Aliases: -
Usage: *${prefix}fflogo* teks1 | teks2

19. *${prefix}readmore*
Generate teks baca selengkapnya.
Aliases: -
Usage: *${prefix}readmore* teks1 | teks2

20. *${prefix}neontext*
Membuat gambar neon teks.
Aliases: *neon*
Usage: *${prefix}neontext* teks_atas | teks_tengah | teks_bawah

21. *${prefix}firemaker*
Membuat gambar teks fire.
Aliases: -
Usage: *${prefix}firemaker* teks

22. *${prefix}mlmaker*
Membuat gambar karakter hero ML dengan teks.
Aliases: -
Usage: *${prefix}mlmaker* nama_hero | teks

23. *${prefix}balloonmaker*
Membuat gambar couple balloon.
Aliases: *blmaker*
Usage: *${prefix}balloonmaker* nama1 | nama2

24. *${prefix}sliding*
Membuat GIF sliding text.
Aliases: -
Usage: *${prefix}sliding* teks

25. *${prefix}wasted*
Membuat gambar Wasted GTA V.
Aliases: -
Usage: Upload foto dengan caption *${prefix}wasted*

_Index of [6]_
    `
}

exports.menuModeration = () => {
    return `
-----[ MODERATION ]-----

1. *${prefix}add*
Menambah user ke dalam group.
Aliases: -
Usage: *${prefix}add* 628xxxxxxxxxx

2. *${prefix}kick*
Mengeluarkan member dari grup.
Aliases: -
Usage: *${prefix}kick* @member1

3. *${prefix}promote*
Promote member menjadi admin.
Aliases: -
Usage: *${prefix}promote* @member1

4. *${prefix}demote*
Demote member dari admin.
Aliases: -
Usage: *${prefix}demote* @member1

5. *${prefix}leave*
Bot akan meninggalkan grup.
Aliases: -
Usage: *${prefix}leave*

6. *${prefix}everyone*
Mention semua member group.
Aliases: -
Usage: *${prefix}everyone*

7. *${prefix}nsfw*
Mematikan/menyalakan mode NSFW.
Aliases: -
Usage: *${prefix}nsfw* enable/disable

8. *${prefix}groupicon*
Mengganti icon grup.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}groupicon* atau reply gambar dengan caption *${prefix}groupicon*.

9. *${prefix}antilink*
Mematikan/menyalakan fitur anti-group link.
Aliases: -
Usage: *${prefix}antilink* enable/disable

10. *${prefix}welcome*
Mematikan/menyalakan fitur welcome di grup agar menyambut setiap kedatangan member.
Aliases: -
Usage: *${prefix}welcome* enable/disable

11. *${prefix}autosticker*
Mematikan/menyalakan fitur auto-stiker. Setiap foto yang dikirim akan selalu diubah ke stiker.
Aliases: *autostiker autostik*
Usage: *${prefix}autostiker* enable/disable

12. *${prefix}antinsfw*
Mematikan/menyalakan fitur anti-NSFW link.
Aliases: -
Usage: *${prefix}antinsfw* enable/disable

_Index of [7]_
    `
}

exports.menuNsfw = () => {
    return `
-----[ NSFW ]-----

1. *${prefix}lewds*
Mengirim pict anime lewd.
Aliases: *lewd*
Usage: *${prefix}lewds*

2. *${prefix}multilewds*
Mengirim up to 5 anime lewd pics. (PREMIUM ONLY)
Aliases: *multilewds multilewd mlewd mlewds*
Usage: *${prefix}multilewds*

3. *${prefix}nhentai*
Mengirim info doujinshi dari nHentai.
Aliases: *nh*
Usage: *${prefix}nhentai* kode

4. *${prefix}nhdl*
Mendownload doujin dari nHentai sebagai file PDF. (PREMIUM ONLY)
Aliases: -
Usage: *${prefix}nhdl* kode

5. *${prefix}nekopoi*
Mengirim video link Nekopoi terbaru.
Aliases: -
Usage: *${prefix}nekopoi*

6. *${prefix}multifetish*
Mengirim up to 5 fetish pics. (PREMIUM ONLY)
Aliases: *mfetish*
Usage: *${prefix}multifetish* <armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao>

7. *${prefix}waifu18*
Mengirim random foto waifu NSFW.
Aliases: -
Usage: *${prefix}waifu18*

8. *${prefix}fetish*
Mengirim fetish pics.
Aliases: -
Usage: *${prefix}fetish* armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao

9. *${prefix}phdl*
Download video dari Pornhub.
Aliases: -
Usage *${prefix}phdl* link

10. *${prefix}yuri*
Mengirim random foto lewd yuri.
Aliases: -
Usage: *${prefix}yuri*

11. *${prefix}lewdavatar*
Mengirim random avatar lewd.
Aliases: -
Usage: *${prefix}lewdavatar*

12. *${prefix}femdom*
Mengirim random foto ero femdom.
Aliases: -
Usage: *${prefix}femdom*

13. *${prefix}nhsearch*
nHentai search.
Aliases: -
Usage: *${prefix}nhsearch* query

14. *${prefix}nekosearch*
Nekopoi search.
Aliases: -
Usage: *${prefix}nekosearch* query

_Index of [8]_
    `
}

exports.menuOwner = () => {
    return `
-----[ OWNER ]-----
Halo RidhoSenpai-sama ヽ(・∀・)ﾉ!

1. *${prefix}bc*
Membuat broadcast.
Aliases: -
Usage: *${prefix}bc* <teks> 

2. *${prefix}clearall*
Menghapus semua chat di akun bot.
Aliases: -
Usage: *${prefix}clearall*

3. *${prefix}getses*
Mengambil screenshot sesi dari akun bot.
Aliases: -
Usage: *${prefix}getses*

4. *${prefix}ban*
Menambah/menghapus user yang diban.
Aliases: -
Usage: *${prefix}ban* add/del @user/62812xxxxxxxx

5. *${prefix}leaveall*
Keluar dari semua grup.
Aliases: -
Usage: *${prefix}leaveall*

6. *${prefix}eval*
Evaluate kode JavaScript.
Aliases: *ev*
Usage: *${prefix}eval*

7. *${prefix}shutdown*
Men-shutdown bot.
Aliases: -
Usage: *${prefix}shutdown*

8. *${prefix}premium*
Menambah/menghapus user premium.
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${prefix}premium* add/del @user/62852xxxxxxxx 30d

9. *${prefix}setstatus*
Mengganti status about me.
Aliases: *setstats setstat*
Usage: *${prefix}status* teks

10. *${prefix}serial*
Cek pendaftaran akun via serial.
Aliases: -
Usage: *${prefix}serial* serial_user

11. *${prefix}exif*
Atur WM stiker bot.
Aliases: -
Usage: *${prefix}exif* pack_name | author_name

_Index of [9]_
    `
}

exports.menuLeveling = () => {
    return `
-----[ LEVELING ]-----

1. *${prefix}level*
Untuk melihat level kamu.
Aliases: -
Usage: *${prefix}level*

2. *${prefix}leaderboard*
Untuk melihat leaderboard.
Aliaases: -
Usage: *${prefix}leaderboard*

3. *${prefix}setbackground*
Set background level card.
Aliases: *setbg*
Usage: *${prefix}setbackground* link_foto

_Index of [10]_
    `
}

exports.rules = () => {
    return `
-----[ RULES ]-----

1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengeksploitasi bot.
Sanksi: *PERMANENT BLOCK*

Jika sudah dipahami rules-nya, silakan ketik *${prefix}menu* untuk memulai!

Source code oleh:
wa.me/6285248082486 (Ridho a.k.a. RidhoSenpai)
    `
}

// Dimohon untuk owner/hoster jangan mengedit ini, terima kasih.
exports.tos = (ownerNumber) => {
    return `
-----[ TERMS OF SERVICE ]-----

Bot ini merupakan open-source bot dengan nama asli BocchiBot yang tersedia di GitHub secara gratis.
Owner/hoster dari bot ini terlepas dari tanggung jawab dan pengawasan developer (Ridho-sama).
Owner/hoster boleh menjiplak, menambahkan, menghapus, mengganti source code dengan catatan *tidak memperjualbelikannya* dalam bentuk apapun.
Apabila terjadi sebuah error, orang yang pertama yang harus kalian hubungi ialah owner/hoster.

Jika kalian ingin berkontribusi dalam projek ini, silakan kunjungi:
https://github.com/SlavyanDesu/BocchiBot

Contact person:
wa.me/${ownerNumber.replace('@c.us', '')} (Owner/hoster)
wa.me/6285248082486 (Developer)

Kalian juga bisa mendukung saya agar bot ini tetap up to date dengan:
0895326159282 (OVO/DANA/GoPay)

Terima kasih!

RidhoSenpai
    `
}
