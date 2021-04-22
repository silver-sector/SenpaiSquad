/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 * 
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
require('dotenv').config()
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const config = require('../config.json')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const fetch = require('node-fetch')
const get = require('got')
const isPorn = require('is-porn')
const exec = require('await-exec')
const webp = require('webp-converter')
const sharp = require('sharp')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const google = require('google-it')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { sleep, calender, uploadImages, toBuffer } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang')
const { getStickerMaker } = require('../function/getStickerMaker')
const { balance, level, card, register, afk, reminder, premium } = require('../function')
const Exif = require('../tools/exif')
const exif = new Exif()
const cd = 4.32e+7
const errorImg = 'https://d.top4top.io/p_1806v6qly0.jpg'
const tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _bg = JSON.parse(fs.readFileSync('./database/user/card/background.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
const _balance = JSON.parse(fs.readFileSync('./database/group/balance.json')) // THIS FOR ON/OFF
const banned = JSON.parse(fs.readFileSync('./database/user/banned.json'))
const userbalance = JSON.parse(fs.readFileSync('./database/user/userbalance.json')) // THIS BALANCE USER
const msgLimit = JSON.parse(fs.readFileSync('./database/user/msgLimit.json'))
const simi_ = JSON.parse(fs.readFileSync('./database/group/simih.json'))
const imagelist = JSON.parse(fs.readFileSync('./database/bot/image.json'))
const vnlist = JSON.parse(fs.readFileSync('./database/bot/vn.json'))
const say = JSON.parse(fs.readFileSync('./database/bot/say.json'))
let { banChats, limitCount, prefix, memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (geps = new Client(), message) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, caption, chatId, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        //let { pushname, verifiedName, formattedName } = sender
        //pushname = pushname || verifiedName || formattedName
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const botNumber = await geps.getHostNumber() + '@c.us'
        const blockNumber = await geps.getBlockedIds()
        const ownerNumber = config.ownerBot
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await geps.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''

        //const prefix  = config.prefix
        //body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        //const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''
        const SN = GenerateSerialNumber("0000000000")
        const serial = sender.id
        const timeStart = Date.now() / 1000
        const tms = (Date.now() / 1000) - (timeStart);

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isBalanceOn = isGroupMsg ? _balance.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isSimi = isGroupMsg ? simi_.includes(groupId) : false
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isImage = type === 'image'
        const isVideo = type === 'video'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)

        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
            for(var i=0; i < mask.length; i++){
                var maskChar = mask[i];
                serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                    }
                }
            return serialNumber;
        }

        const getLevelingBalanceId = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].id
            }
        } 
        
        const getLevelingBalance = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].level
            }
        }
        
        const getLevelingXpBC = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].xp
            }
        }
        
        const addLevelingIdBC = (userId) => {
            const obj = { id: userId, xp: 0, level: 1 }
            userbalance.push(obj)
            fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
        }
        
        const addLevelingBalance = (userId, amount) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].level += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }
        
        const addLevelingXpBalance = (userId, amount) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].xp += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        function waktu(seconds) { // TOBZ
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari," : " Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam," : " Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit," : " Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik," : " Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }

        const kelebihan = [
            'Soleh dan Soleha',
            'Pintar',
            'Rajin',
            'Teladan'
        ]
        const tipe = [
            'cool',
            'idaman',
            'Alami',
            'Keren',
            'Ideal',
            'Dia Bamget',
            'normal',
            'elite',
            'epic',
            'Legend'
        ]
        const ratenyaasu = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
        ]
        const sifat = [
            'Penolong',
            'Suka Membantu',
            'Saling Menolong',
            'Perhatian',
            'Ngak Cuek',
            'Romantis',
            'Dermawan',
            'Cool',
            'Peduli Kepada Sesama',
            'Suka Berkata Kasar'
        ]
        const hobby = [
            'Memasak',
            'Membantu Atok',
            'Mabar',
            'Nobar',
            'Sosmedtan',
            'Membantu Orang lain',
            'Nonton Anime',
            'Nonton Drakor',
            'Naik Motor',
            'Nyanyi',
            'Menari',
            'Bertumbuk',
            'Menggambar',
            'Foto fotoan Ga jelas',
            'Maen Game',
            'Berbicara Sendiri'
        ]
        const watak = [
            'top deh pokoknya',
            'penyayang',
            'pemurah',
            'Pemarah',
            'Pemaaf',
            'Penurut',
            'Baik',
            'baperan',
            'Baik-Hati',
            'penyabar',
            'UwU',
            'Suka Membantu'
        ]

        /* BUAT PR AJA
        const checkATMuser = (sender) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return userbalance[position].userbalance
            }
        }

        const bayarLimit = (sender, amount) => {
            let position = false
            Object.keys(limit).forEach((i) => {
                if (limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                limit[position].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit))
            }
        }

        const confirmATM = (sender, amount) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                userbalance[position].userbalance -= amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }*/

        const cts = waktu(tms)
        function isMsgLimit(id) {
            if (isPremium) { return false; }
            let found = false;
            for (let i of msgLimit) {
                if (i.id === id) {
                    if (i.msg >= 12) {
                        found === true
                        geps.reply(from, `*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!`, id)
                        geps.contactBlock(id)
                        banned.push(id)
                        fs.writeFileSync('./database/user/banned.json', JSON.stringify(banned))
                        return true;
                    } else if (i.msg >= 7) {
                        found === true
                        geps.reply(from, `*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!`, id)
                        return true
                    } else {
                        found === true
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${id}`, msg: 1 };
                msgLimit.push(obj);
                fs.writeFileSync('./database/user/msgLimit.json', JSON.stringify(msgLimit));
                return false;
            }
        }
        function addMsgLimit(id) {
            if (isPremium) { return; }
            var found = false
            Object.keys(msgLimit).forEach((i) => {
                if (msgLimit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                msgLimit[found].msg += 1;
                fs.writeFileSync('./database/user/msgLimit.json', JSON.stringify(msgLimit));
            }
        }
        function isLimit(id) {
            if (isPremium) { return false; }
            let found = false;
            for (let i of limit) {
                if (i.id === id) {
                    let limits = i.limit;
                    if (limits >= limitCount) {
                        found = true;
                        geps.reply(from, `Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                        return true;
                    } else {
                        limit
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${id}`, limit: 1 };
                limit.push(obj);
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit));
                return false;
            }
        }
        function limitAdd(id) {
            if (isPremium) { return; }
            var found = false;
            Object.keys(limit).forEach((i) => {
                if (limit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                limit[found].limit += 1;
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit));
            }
        }

        function convertBalanceToString(angka)
        {
            var balancenyeini = '';		
            var angkarev = angka.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) balancenyeini += angkarev.substr(i,3)+'.';
            return '$ '+balancenyeini.split('',balancenyeini.length-1).reverse().join('');
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(min, value), max)
        }

            const isMuted = (chatId) => {
                if(muted.includes(chatId)){
                  return false
              }else{
                  return true
                  }
              }
      
              function banChat () {
                  if(banChats == true) {
                  return false
              }else{
                  return true
                  }
              }

        const sleeps = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'Warrior III'
        if (levelRole <= 5) {
            role = 'Warrior II'
        } else if (levelRole <= 10) {
            role = 'Warrior I'
        } else if (levelRole <= 15) {
            role = 'Elite V'
        } else if (levelRole <= 20) {
            role = 'Elite IV'
        } else if (levelRole <= 30) {
            role = 'Elite III'
        } else if (levelRole <= 40) {
            role = 'Elite II'
        } else if (levelRole <= 50) {
            role = 'Elite I'
        } else if (levelRole <= 60) {
            role = 'Master V'
        } else if (levelRole <= 80) {
            role = 'Master IV'
        } else if (levelRole <= 100) {
            role = 'Master III'
        } else if (levelRole <= 120) {
            role = 'Master II'
        } else if (levelRole <= 140) {
            role = 'Master I'
        } else if (levelRole <= 160) {
            role = 'Epic V'
        } else if (levelRole <= 180) {
            role = 'Epic Iv'
        } else if (levelRole <= 200) {
            role = 'Epic iii'
        } else if (levelRole <= 220) {
            role = 'Epic Ii'
        } else if (levelRole <= 240) {
            role = 'Epic I'
        } else if (levelRole <= 260) {
            role = 'Legend V'
        } else if (levelRole <= 300) {
            role = 'Legend IV'
        } else if (levelRole <= 340) {
            role = 'Legend III'
        } else if (levelRole <= 380) {
            role = 'Legend II'
        } else if (levelRole <= 420) {
            role = 'Legend I'
        } else if (levelRole <= 460) {
            role = 'Mythic V'
        } else if (levelRole <= 500) {
            role = 'Mythic IV'
        } else if (levelRole <= 600) {
            role = 'Mythic III'
        } else if (levelRole <= 700) {
            role = 'Mythic II'
        } else if (levelRole <= 800) {
            role = 'Mythic I'
        } else if (levelRole <= 900) {
            role = 'Mythic Glory'
        }

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !isBanned && isLevelingOn) {
            const currentLevel = level.getLevelingLevel(sender.id, _level)
            const checkId = level.getLevelingId(sender.id, _level)
            const checkBg = card.getBg(sender.id, _bg)
            try {
                if (currentLevel === undefined && checkId === undefined) level.addLevelingId(sender.id, _level)
                if (checkBg === undefined) card.addBg(sender.id, _bg)
                const amountXp = Math.floor(Math.random() * 10) + 15
                const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                const getLevel = level.getLevelingLevel(sender.id, _level)
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const fetchXp = 200 * (Math.pow(2, level.getLevelingLevel(sender.id, _level)) - 1)
                    await geps.reply(from, `*「 LEVEL UP 」*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${getLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*\n\nTerus mainkan bot dan tingkatkan EXP!!`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (isGroupMsg && !isBanned && isBalanceOn) {
            const CurrentBalance = getLevelingBalance(sender.id, userbalance)
            const checkIdBc = getLevelingBalanceId(sender.id, userbalance)
            const checkBgBc = card.getBg(sender.id, _bg)
            try {
                if (CurrentBalance === undefined && checkIdBc === undefined) addLevelingIdBC(sender.id, userbalance)
                if (checkBgBc === undefined) card.addBg(sender.id, _bg)
                const amountXpBC = Math.floor(Math.random() * 10) + 15
                const requiredXpBC = 200 * (Math.pow(2, CurrentBalance) - 1)
                const getLevelBC = getLevelingBalance(sender.id, userbalance)
                addLevelingXpBalance(sender.id, amountXpBC, userbalance)
                if (requiredXpBC <= getLevelingXpBC(sender.id, userbalance)) {
                    addLevelingBalance(sender.id, 1, userbalance)
                    const fetchXpBC = 200 * (Math.pow(2, getLevelingBalance(sender.id, userbalance)) - 1)
                    console.log(`Something Get Balance\nName : ${pushname}\nXp : ${getLevelBC}\nLevel : ${getLevelBC}`)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await geps.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color(`「 *ANTI LINK* 」\n\nMaaf ${pushname} kamu mengirimkan link disaat antilink menyala, kamu akan dikick`, 'yellow'))
                    //await geps.reply(from, ind.linkDetected(), id)
                    //await geps.removeParticipant(groupId, sender.id)
                    return geps.reply(from, ind.linkDetected(), id)
                    .then(() => geps.removeParticipant(groupId, sender.id))
                    .then(() => {
                    geps.sendText(from, `Sudah tau fitur antilink menyala :(`, id)
                    }).catch(() => geps.sendText(from, `Untung Bot Alm. RidhoSenpai[BOT] Bukan Admin Group Ini, Kalo Jadi Admin Udah Aku Kick Tuh! 😑`))
                } else {
                    console.log(color('[WARN]', 'yellow'), color('「 *ANTI LINK* 」\n\nSaya mengetahui link tersebut tapi selamat kamu tidak dikick karena link tersebut tidak valid', 'yellow'))
                }
            }
        }

        // Anti-fake-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color(`「 *ANTI FAKE-LINK* 」\n\nMaaf ${pushname} kamu mengirimkan link disaat anti fake-link menyala, kamu akan dikick`, 'yellow'))
                await geps.reply(from, 'Fake group link detected!', id)
                await geps.removeParticipant(groupId, sender.id)	
            }
        }

        // Anti NSFW links but kinda uneffective
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await geps.reply(from, ind.linkNsfw(), id)
                        await geps.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto-sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await geps.sendImageAsSticker(from, imageBase64, id)
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await geps.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await geps.sendText(from, ind.afkDone(pushname))
            }
        }

        //Auto Reply Chats by ridhoo
        if (chats == 'Ridho') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, untuk Memulai ketik aja ${prefix}menu`, id)
        }
        if (chats == 'RidhoSenpai') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, Untuk Memulai bot ketik aja ${prefix}menu`, id)
        }
        if (chats == 'p') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }
        
        if (chats == 'P') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }
        
        if (chats == 'bot') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }
        
        if (chats == 'Bot') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }
        if (chats == 'm') {
            if (!isGroupMsg) await geps.reply(from, `Halo kak ${pushname}, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }
        
        /*Auto reply Group from ridhosenpai
        case 'Assalamualaikum':
            if (isRegistered) return geps.reply(from, `Waalaikumsalam\nHalo, ${pushname}, Untuk Memulai Bot silahkan ketik #menu`)
        break
        if (isGroupMsg == 'assalamualaikum') {
            if (isRegistered) return geps.reply(from, `waalaikumsalam\nHalo, ${pushname}, Untuk Memulai Bot silahkan ketik #menu`)
        }
        if (isGroupMsg == 'P') {
            if (isRegistered) return geps.reply(from, `Halo ${pushname}Halo, Untuk Memulai Bot silahkan ketik #menu`)
        }
        if (isGroupMsg == 'p') {
            if (isRegistered) return geps.reply(from, `Halo ${pushname}Halo, Untuk Memulai Bot silahkan ketik #menu`)
        }
        if (isGroupMsg == 'Woi') {
            if (isRegistered) return geps.reply(from, `Woi apa dah jago lu?\nUntuk Memulai Bot silahkan ketik #menu`)
        }
        if (isGroupMsg == 'woi') {
            if (isRegistered) return geps.reply(from, `Woi apa dah jago lu?\nUntuk Memulai Bot silahkan ketik #menu`)
        }
        if (isGroupMsg == 'm') {
            if (isRegistered) return geps.reply(from, `Untuk membuka menu silahkan ketik #menu`)
        }*/

        
        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        //if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        //if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        //if (isCmd && !isOwner) msgFilter.addFilter(from)
        if (banChat() && !isBlocked && !isBanned || isOwner ) {
        switch (command) {
            case prefix+'banchat':
                if (config.banChats === true) return
                if (!isOwner) return geps.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!', id)
                config.banChats = true
                banChats = true
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                geps.reply(from, 'Global chat has been enable!', id)
                break
            case prefix+'unbanchat':
                if (!isOwner) return geps.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Alm. RidhoSenpai[BOT]!', id)
                if(config.banChats === false) return
                config.banChats = false
                banChats = false
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                geps.reply(from, 'Global chat has been disable!', id)
                break
         //Auto reply Group from ridhosenpai
            case 'Assalamualaikum':
            case 'assalamualaikum':
            case 'p':
            case 'P':
            case 'Woi':
            case 'woi':
            case 'm':            
                if (isRegistered) return geps.reply(from, `Waalaikumsalam\nHalo, ${pushname}, Untuk Memulai Bot silahkan ketik #menu`, id)
                break
            case prefix+'verify':
                const nonye = sender.id
                const pporang = await geps.getProfilePicFromServer(sender.id)
                if (pporang === undefined) {
                var pepe = errorImg
                } else {
                var pepe = pporang
                }
                var ceknya = nonye
                var obj = _registered.some((val) => {
                return val.id === ceknya
                })
                if (obj === true){
                return geps.reply(from, 'Kamu sudah melakukan verifikasi', id) // BAKAL RESPON JIKA NO UDAH ADA
                } else {
                const mentah = await geps.checkNumberStatus(nonye) // PENDAFTARAN
                const msg = (`┌─「 VERIFIKASI-SUKSES 」
│
├ NAMA : ${pushname}
├ SERIAL : ${SN}
├ NOMOR : [@${nonye.replace(/[@c.us]/g, '')}]
├ API : wa.me/${nonye.replace('@c.us', '')}
├ WAKTU : ${moment().format('DD/MM/YY HH:mm:ss')}
│
├ Untuk menggunakan bot kirim ${prefix}menu
│ Total Pengguna yang telah terdaftar ${_registered.length}
│
└─「 Alm. RidhoSenpai[BOT] 」`)
                const hasil = mentah.canReceiveMessage ? msg : false
                if (!hasil) return geps.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                {
                const register = ({
                    id: mentah.id._serialized
                })
                const givebalance = ({
                    id: mentah.id._serialized,
                    xp: 5,
                    level: 1
                })
                const givexplepel = ({
                    id: mentah.id._serialized,
                    xp: 5,
                    level: 1
                })
                _registered.push(register)
                fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered)) // DATABASE
                userbalance.push(givebalance)
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
                _level.push(givexplepel)
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
                geps.sendFileFromUrl(from, pepe, 'ppnya.jpg', hasil)
                }
                }
                break
                case prefix+'banchat':
                    if (config.banChats === true) return
                    if (!isOwner) return geps.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!', id)
                    config.banChats = true
                    banChats = true
                    fs.writeFileSync('../config.json', JSON.stringify(config, null, 2))
                    geps.reply('Global chat has been enable!')
                    break
                case prefix+'unbanchat':
                    if (!isOwner) return geps.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Alm. RidhoSenpai[BOT]', id)
                    if(config.banChats === false) return
                    config.banChats = false
                    banChats = false
                    fs.writeFileSync('../config.json', JSON.stringify(config, null, 2))
                    geps.reply('Global chat has been disable!')
                    break
            // Level [BETA] by Slavyan
            case prefix+'level':
            case prefix+'ceklevel':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                if (userLevel === undefined && userXp === undefined) return await geps.reply(from, ind.levelNull(), id)
                const ppLink = await geps.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const bege = card.getBg(sender.id, _bg)
                const requiredXp = 200 * (Math.pow(2, userLevel) - 1)
                const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setRank(1, `${role}`, true) // Set value to true if you want to display user's roles
                    .setCurrentXP(userXp)
                    .setRequiredXP(requiredXp)
                    .setProgressBar([randomHexs, randomHex], 'GRADIENT')
                    .setBackground('IMAGE', bege)
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${pushname}_card.png`)
                        await geps.sendFile(from, `${pushname}_card.png`, `${pushname}_card.png`, `「 *LEVEL INFO* 」\n\n- *Username* : ${pushname}\n- *Level* : ${userLevel}\n- *Rank* : ${role}\n- *Xp Info* : ${userXp}`, id)
                        fs.unlinkSync(`${pushname}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'cekbalance':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const userBalancenye = getLevelingXpBC(sender.id, userbalance)
                const cvbalance = convertBalanceToString(userBalancenye)
                if (cvbalance  === undefined) return await geps.reply(from, "Kamu belum memiki balance:(", id)
                const ppLinkss = await geps.getProfilePicFromServer(sender.id)
                if (ppLinkss === undefined) {
                    var pepe = errorImg
                } else {
                    var pepe = ppLinkss
                }
                geps.reply(from, `Kamu memiliki Balance Sebesar ${cvbalance}`, id)
                break
                case prefix+'hilih':
                    const hiliw = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hili = hiliw.replace(/a|u|e|o/g, "i")
                    await geps.reply(from, hili, id)
                    break
                case prefix+'halah':
                    const halah = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hala = halah.replace(/i|u|e|o/g, "a")
                    await geps.reply(from, hala, id)
                    break
                case prefix+'heleh':
                    const heleh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hele = heleh.replace(/i|u|a|o/g, "e")
                    await geps.reply(from, hele, id)
                    break
                case prefix+'holoh':
                    const holoh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const holo = holoh.replace(/i|u|e|a/g, "o")
                    await geps.reply(from, holo, id)
                    break
                case prefix+'huluh':
                    const huluh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hulu = huluh.replace(/i|o|e|a/g, "u")
                    await geps.reply(from, hulu, id)
                    break
            case prefix+'leaderboard':
            case prefix+'toplevel':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '「 *LEADERBOARD* 」\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboard += `[ ${nom} ] \nUSER : @${_level[i].id.replace('@c.us', '')}\nXP : ${_level[i].xp}\nLEVEL : ${_level[i].level}\n\n`
                    }
                    await geps.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, ind.minimalDb(), id)
                }
            break
            case prefix+'topbalance':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                userbalance.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                //const cvtopbalance = convertBalanceToString(userbalance)
                let leaderboards = '「 *TOP BALANCE* 」\n\n'
                let nomBC = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nomBC++
                        leaderboards += `[ ${nomBC} ] \nUSER : @${userbalance[i].id.replace('@c.us', '')}\nBALANCE : ${userbalance[i].xp} $\n\n`
                    }
                    await geps.sendTextWithMentions(from, leaderboards)
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, ind.minimalDb(), id)
                }
            break
            /*case prefix+'setbackground':
            case prefix+'setbg':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await geps.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isUrl(url)) return await geps.reply(from, ind.wrongFormat(), id)
                const levels = level.getLevelingLevel(sender.id, _level)
                const xps = level.getLevelingXp(sender.id, _level)
                if (levels === undefined && xps === undefined) return await geps.reply(from, ind.levelNull(), id)
                card.replaceBg(sender.id, url, _bg)
                await geps.reply(from, 'Success set new background!', id)
            break*/
            case prefix+'setbackground':
            case prefix+'setbg':
                    if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                    if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    const levels = level.getLevelingLevel(sender.id, _level)
                    const xps = level.getLevelingXp(sender.id, _level)
                    //const setbegelah = body.slice(7)
                    if (levels === undefined && xps === undefined) return await geps.reply(from, `Maaf ${pushname} kamu belum memiliki level:(`, id)
                    card.replaceBg(sender.id, linkImg, _bg)
                    await geps.reply(from, 'Success set new background!', id)
                } else {
                    await geps.reply(from, `Salah!, Silahkan reply/kirim image dengan caption ${prefix}setbg`, id)
                }
                break
            // Downloader
            case prefix+'joox':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.joox(q)
                    .then(async ({ result }) => {
                        await geps.sendFileFromUrl(from, result[0].linkImg, `${result[0].judul}.jpg`, ind.joox(result), id)
                        await geps.sendFileFromUrl(from, result[0].linkMp3, `${result[0].judul}.mp3`, '', id)
                        console.log('Success sending music from Joox!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'play':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    geps.reply(from, ind.wait(), id)
                    const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${q}&apikey=${config.vhtear}`)
                    if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                    const webplay2 = await webplay.json()
                    if (webplay2.status == false) {
                        geps.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(webplay2.result.size.split(' MB')[0]) >= 10.00) return geps.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 10 MB!', id)
                        const { image, mp3, size, ext, title, duration } = await webplay2.result
                        const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Filesize* : ${size}\n➸ *Exp* : ${ext}\n\n_*Music Sedang Dikirim*_`
                        geps.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                        await geps.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => geps.reply(from, mess.error.Yt4, id))
                    }
                } catch (err) {
                    geps.sendText(ownerNumber, 'Error Play : ' + err)
                    geps.reply(from, 'Yah error mengmohon coba nanti :(', id)
                }
                break 
            case prefix+'smule':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length === 1) return geps.reply(from, 'Kirim perintah *#smule [linkSmule]*\nContoh : *#smule https://www.smule.com/p/767512225_3062360163*', id)
                geps.reply(from, ind.wait(), id)
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const sml = await slicedArgs.join(' ')
                console.log(sml)
                try {
                const resp = await axios.get(`https://api.vhtear.com/getsmule?link=${sml}&apikey=${config.vhtear}`)
                const { Type, title, url, image } = resp.data.result
                const sml3 = `*Music Ditemukan!*
    
➸ *Judul:* ${title}
➸ *Type:* ${Type}`
    
                geps.sendImage(from, image, `${title}.jpg`, sml3)
                geps.sendFileFromUrl(from, url, `${title}.mp3`, sml3, id)
                } catch (err) {
                 console.error(err.message)
                 await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Music tidak ditemukan')
                 geps.sendText(ownerNumber, 'Smule Error : ' + err)
               }
              break
            case prefix+'igdl': // by: VideFrelan
            case prefix+'instadl':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('instagram.com')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.insta(url)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.post.length; i++) {
                            if (result.post[i].type === 'image') {
                                await geps.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.jpg', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            } else if (result.post[i].type === 'video') {
                                await geps.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.mp4', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            }
                        }
                        console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'facebook':
            case prefix+'fb':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('facebook.com')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.fb(q)
                .then(async ({ result }) => {
                            await geps.sendFileFromUrl(from, result.VideoUrl, 'videofb.mp4', '', id)
                            console.log(from, 'Success sending Facebook video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            /*case prefix+'ytmp3':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('youtu.be')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.ytdl(url)
                    .then(async (res) => {
                        if (res.status === 'error') {
                            await geps.reply(from, res.pesan, id)
                        } else if (Number(res.size.split(' MB')[0]) >= 30) {
                            await geps.reply(from, ind.videoLimit(), id)
                        } else {
                            await geps.sendFileFromUrl(from, res.thumbnail, `${res.title}.jpg`, ind.ytFound(res), id)
                            await geps.sendFileFromUrl(from, res.url_audio, `${res.title}.mp3`, '', id)
                            console.log('Success sending YouTube video!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break*/
            case prefix+'ytmp3': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const yt2matekudasai = body.slice(5)
                if (!yt2matekudasai) return geps.reply(from, 'Kirim perintah *#ytmp3 [linkyt]*\n\nContoh : #ytmp3 https://yotube.com/blabla', id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: false,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ytmp3.cc/en13/", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#input", yt2matekudasai);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[id="buttons"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            /*case prefix+'ytmp4':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!yt2matekudasai(url) && !url.includes('youtu.be')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.ytdl(url)
                    .then(async (res) => {
                        if (res.status === 'error') {
                            await geps.reply(from, res.pesan, id)
                        } else if (Number(res.size.split(' MB')[0]) >= 30) {
                            await geps.reply(from, ind.videoLimit(), id)
                        } else {
                            await geps.sendFileFromUrl(from, res.thumbnail, `${res.title}.jpg`, ind.ytFound(res), id)
                            await geps.sendFileFromUrl(from, res.url_video, `${res.title}.mp4`, '', id)
                            console.log('Success sending YouTube video!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break*/
            case prefix+'indoxxi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const dataplai = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${q}&apikey=${config.vhtear}`)
                    const dataplay = dataplai.data.result
                    let indofx = `*Hasil Pencarian Film : ${indocx}*\n`
                    for (let i = 0; i < dataplay.data.length; i++) {
                        indofx += `\n═════════════════\n\n*Resolusi* : ${dataplay.data[i].resolusi}\n*Link* : ${dataplay.data[i].urlDownload}\nJudul akhir : ${dataplay.judul}`
                    }
                    await geps.reply(from, indofx, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'cineplex':
            case prefix +'cineplexlast':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://docs-jojo.herokuapp.com/api/cineplex`)
                    const dataplay = dataplai.data
                    let cinexi = `*Coming Soon on Cineplex*\n`
                    for (let i = 0; i < dataplay.result.length; i++) {
                        cinexi += `\n═════════════════\n\n*Movie* : ${dataplay.result[i].title}\n*Pemeran* : ${dataplay.result[i].casts}\n*Sinopsis* : ${dataplay.result[i].sinopsis}\n*Rating* : ${dataplay.result[i].rating}\n*Genre* : ${dataplay.result[i].genre}\n`
                    }
                    await geps.sendFileFromUrl(from, dataplay.result[0].poster, `cine.jpg`, cinexi, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'togel':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://api.vhtear.com/togel&apikey=${config.vhtear}`)
                    const dataplay = dataplai.data.result
                    let tomgel = `*Huzzzzz*\n`
                    for (let i = 0; i < dataplay.hasil.length; i++) {
                        tomgel += `\n═════════════════\n\n*Negara* : ${dataplay.hasil[i].Negara}\n*Result* : ${dataplay.hasil[i].Senin}\n*Result* : ${dataplay.hasil[i].Selasa}\n*Result* : ${dataplay.hasil[i].Rabu}\n*Result* : ${dataplay.hasil[i].Kamis}\n*Result* : ${dataplay.hasil[i].Jumat}\n*Result* : ${dataplay.hasil[i].Sabtu}\n*Result* : ${dataplay.hasil[i].Minggu}\n`
                    }
                    await geps.reply(from, tomgel, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'threats':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrleee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=threats&url=${getUrleee}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrleee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=threats&url=${getUrleee}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'snobg':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.vhtear}`)
                    const nobgff = nobgf.data.result.image
                    geps.sendStickerfromUrl(from, nobgff)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.vhtear}`)
                    const nobgff = nobgf.data.result.image
                    geps.sendStickerfromUrl(from, nobgff)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'blurpify':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrlb = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${getUrlb}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrlb = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${getUrlb}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'gay':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.rainbow(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.rainbow(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'deletedd':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.delete(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.delete(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'memeindo': //Chika chantexxzz
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const memejoke = await axios.get(`https://api-zeks.harispoppy.com/api/memeindo?apikey=apivinz`)
                const memejokes = memejoke.data
                await limitAdd(serial)
                geps.sendImage(from, memejokes.result, 'thndr.jpg', '....', id)
                break
            case prefix+'cute':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.beautiful(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.beautiful(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'affect':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.affect(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.affect(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'jail':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.jail(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.jail(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'trash':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.trash(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.trash(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'captcha':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrliee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=captcha&url=${getUrliee}&username=${q}&raw=1`, `Nekonime.jpg`, 'Noh mhank', id)
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrliee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=captcha&url=${getUrliee}&username=${q}&raw=1`, `Nekonime.jpg`, 'Noh mhank', id)
                    await limitAdd(serial)
                } else {
                    await geps.reply(from, `Wrong Format!\nReply image dengan caption ${prefix}captcha [teks]\nContoh : ${prefix}captcha anjay`, id)
                }
                break
            case prefix+'deepfry':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrla = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${getUrla}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrla = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${getUrla}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'ytmp4':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${q}&apikey=${config.vhtear}`)
                    if (!ytvh.ok) throw new Error(`Error YTMP4 : ${ytvh.statusText}`)
                    const ytvh2 = await ytvh.json()
                    if (ytvh2.status == false) {
                        geps.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(ytvh2.result.size.split(' MB')[0]) > 30.00) return geps.sendFileFromUrl(from, ytvh2.result.imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 30 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                        const { title, UrlVideo, imgUrl, size, status, ext } = await ytvh2.result
                        console.log(`VHTEAR : ${ext}\n${size}\n${status}`)
                        geps.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                        await geps.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => geps.reply(from, mess.error.Yt4, id))
                        await limitAdd(serial)
                    }
                } catch (err) {
                    geps.sendText(ownerNumber, 'Error ytmp4 : ' + err)
                    geps.reply(from, 'Jangan download video yang sama dengan sebelumnya!', id)
                }
                break
            case prefix+'tiktokpic':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    console.log(`Get profile pic for ${q}`)
                    const tkt = await axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${q}`)
                    if (tkt.data.error) return geps.reply(from, tkt.data.error, id)
                    await geps.sendFileFromUrl(from, tkt.data.result, 'tiktokpic.jpg', 'Ini :D', id)
                    console.log('Success sending TikTok profile pic!')
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'starmaker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length === 1) return geps.reply(from, 'Kirim perintah *#starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *#readme*')
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const smkr = await slicedArgs.join(' ')
                console.log(smkr)
                try {
                const smkr2 = await axios.get(`https://api.vhtear.com/starmakerdl?link=${smkr}&apikey=${config.vhtear}`)
                const { image, url, title } = smkr2.data.result
    
                const pictk = await bent("buffer")(image)
                const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                geps.sendImage(from, base64, 'image.jpg', 'nihh mhank')
                geps.sendFileFromUrl(from, url, `${title}.mp4`, '', id)
                } catch (err) {
                 console.error(err.message)
                 await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                 geps.sendText(ownerNumber, 'Error Starmaker : '+ err)
               }
              break
            case prefix+'tiktoknowm': // by: VideFrelan
            case prefix+'tktnowm':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.tikNoWm(url)
                    .then(async (res) => {
                        fs.writeFileSync(`./temp/${sender.id}.mp4`, res)
                        await geps.sendFile(from, `./temp/${sender.id}.mp4`, 'nowm.mp4', '', id)
                        console.log('Success sending TikTok video with no WM!')
                        fs.unlinkSync(`./temp/${sender.id}.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tiktok': 
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.tik(url)
                    .then(async ({ result })=> {
                        await geps.sendFileFromUrl(from, result.video, 'tiktok.mp4', '', id)
                        console.log('Success sending TikTok video!')
                    })
                    .catch(async (err) => {
                        console.log(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'twitter':
            case prefix+'twt':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('twitter.com')) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                downloader.tweet(url)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter((x) => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await misc.shortener(content[0].url)
                            console.log('Shortlink:', result)
                            await geps.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link HD: ${result}`, id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await geps.reply(from, 'Error!', id)
                                })
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await geps.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await geps.reply(from, 'Error!', id)
                                })
                            }
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break

            // Misc
            case prefix+'afk':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (isAfkOn) return await geps.reply(from, ind.afkOnAlready(), id)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await geps.reply(from, ind.afkOn(pushname, reason), id)
            break
            case prefix+'subreddit':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + q + '/');
                    const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                    if (nsfw == true) {
                        if ((isGroupMsg) && (isNsfw)) {
                            await geps.reply(from, ind.wait(), id)
                            await geps.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                        }
                    } else {
                        await geps.reply(from, ind.wait(), id)
                        await geps.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)                    }
                } catch (err) {
                    await geps.sendImage(from, errorImg, 'oppss.jpg', '', id)
                }
                break
            case prefix+'wallanime':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const walnime = ['https://wallpaperaccess.com/full/395986.jpg', 'https://wallpaperaccess.com/full/21628.jpg', 'https://wallpaperaccess.com/full/21622.jpg', 'https://wallpaperaccess.com/full/21612.jpg', 'https://wallpaperaccess.com/full/21611.png', 'https://wallpaperaccess.com/full/21597.jpg', 'https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png', 'https://wallpaperaccess.com/full/21591.jpg', 'https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg', 'https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg', 'https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png', 'https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg', 'https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png', 'https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg', 'https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg', 'https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png', 'https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png', 'https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg', 'https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg', 'https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png', 'https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png', 'https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg', 'https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png', 'https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg', 'https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg', 'https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg', 'https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png', 'https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg', 'https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg', 'https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png', 'https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg', 'https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png', 'https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg', 'https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg', 'https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg', 'https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png', 'https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg', 'https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png', 'https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg', 'https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg', 'https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg', 'https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg', 'https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg', 'https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg', 'https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg', 'https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg', 'https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png', 'https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg', 'https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg', 'https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg', 'https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png', 'https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png', 'https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png', 'https://cdn.nekos.life/wallpaper/yO6ioREenLA.png', 'https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg', 'https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png', 'https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png', 'https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg', 'https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg', 'https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg', 'https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg', 'https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/32EAswpy3M8.png', 'https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png', 'https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg', 'https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png', 'https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg', 'https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png', 'https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png', 'https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg', 'https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg', 'https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png', 'https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png', 'https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg', 'https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg', 'https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg', 'https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png', 'https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg', 'https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png', 'https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg', 'https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png', 'https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg', 'https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg', 'https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg', 'https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg', 'https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg', 'https://cdn.nekos.life/wallpaper/9ru2luBo360.png', 'https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png', 'https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png', 'https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg', 'https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg', 'https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg', 'https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg', 'https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png', 'https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png', 'https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg', 'https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg', 'https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png', 'https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg', 'https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg', 'https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg', 'https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg', 'https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg', 'https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg', 'https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg', 'https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg', 'https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg', 'https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg', 'https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png', 'https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg', 'https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png', 'https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg', 'https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png', 'https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg', 'https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png', 'https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png', 'https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png', 'https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png', 'https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png', 'https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png', 'https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png', 'https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg', 'https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg', 'https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg', 'https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg', 'https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg', 'https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png', 'https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg', 'https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg', 'https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg', 'https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg', 'https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg', 'https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg', 'https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png', 'https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png', 'https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png', 'https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg', 'https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg', 'https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg', 'https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg', 'https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg', 'https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png', 'https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png', 'https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg', 'https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg', 'https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg', 'https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png', 'https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png', 'https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg', 'https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png', 'https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg', 'https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg', 'https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png', 'https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg', 'https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg', 'https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg', 'https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg', 'https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg', 'https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png', 'https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png', 'https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg', 'https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png', 'https://cdn.nekos.life/wallpaper/58C37kkq39Y.png', 'https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg', 'https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg', 'https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg', 'https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png', 'https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg', 'https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg', 'https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png', 'https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg', 'https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg', 'https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png', 'https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg', 'https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg', 'https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png', 'https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png', 'https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg', 'https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg', 'https://cdn.nekos.life/wallpaper/89MQq6KaggI.png', 'https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
                let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
                geps.reply(from, ind.wait(), id)
                geps.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '*Wallanime!*', id)
                break
            case prefix+'meme':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
                const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
                geps.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
                break
            case prefix+'lyric':
            case prefix+'lirik':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await geps.reply(from, 'Not found.', id)
                        await geps.reply(from, result.result, id)
                        console.log('Success sending lyric!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'shorttiny':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const surl = await axios.get(`https://tobz-api.herokuapp.com/api/tinyurl?url=${q}&apikey=BotWeA`)
                const surll = surl.data
                if (surll.error) return geps.reply(from, surll.error, id)
                const surl2 = `Link : ${q}\nShort URL : ${surll.result}`
                geps.reply(from, surl2, id)
                break
            case prefix+'shortbitly':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const surl3 = await axios.get(`https://tobz-api.herokuapp.com/api/bitly?url=${q}&apikey=BotWeA`)
                const surll2 = surl3.data
                if (surll2.error) return geps.reply(from, surll2.error, id)
                const surl22 = `Link : ${q}\nShort URL : ${surll2.result}`
                geps.reply(from, surl22, id)
                break
            case prefix+'maps':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const mapz2 = await axios.get(`https://mnazria.herokuapp.com/api/maps?search=${q}`)
                    const { gambar } = mapz2.data
                    const pictk = await bent("buffer")(gambar)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${q}*`)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Error Maps : ' + err)
                }
                break
            case prefix+'qrcode':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${q}`, 'gambar.png', 'Nihh bree...', id)
                break
            case prefix+'shortlink':
            case prefix+'shorturl':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url)) return await geps.reply(from, ind.wrongFormat(), id)
                const urlShort = await misc.shortener(url)
                await geps.reply(from, ind.wait(), id)
                await geps.reply(from, urlShort, id)
                console.log('Success!')
            break
            case prefix+'wikipedia':
            case prefix+'wiki':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.wiki(q)
                    .then(async ({ result, status }) => {
                        if (status !== 200) {
                            return await geps.reply(from, 'Not found.', id)
                        } else {
                            await geps.reply(from, result, id)
                            console.log('Success sending Wiki!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'news':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const response2 = await fetch(`https://api.vhtear.com/beritaterbaru&apikey=${config.vhtear}`)
                    if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                    const jsonber = await response2.json()
                    const { data } = await jsonber.result
                    let xixixi = `*「 BERITA TERKINI 」*\n\n`
                    for (let i = 0; i < data.length; i++) {
                        xixixi += `\n─────────────────\n\n*Source* : ${data[i].url}\n*Penulis* : ${data[i].author}\n*Judul* : ${data[i].title}\n*Deskripsi* : ${data[i].description}\n*Dipublikasi* : ${data[i].publishedAt}\n*Konten* : ${data[i].content}\n`
                    }
                    await geps.sendFileFromUrl(from, data[0].urlToImage, 'thumbserc.jpg', xixixi, id)
                } catch (err) {
                        console.log(err)
                        await geps.sendFileFromUrl(from, errorImg, 'error.jpg', '💔️ Maaf, Berita tidak ditemukan')
                        geps.sendText(ownerNumber, 'Berita Error : ' + err)
                }
                break
            case prefix+'instastory': //By: VideFrelan
            case prefix+'igstory':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await geps.sendFileFromUrl(from, urlDownload, '', 'Nehhh...', id)
                            console.log('Success sending IG Story!')
                        }
                    })
            break
            case prefix+'google':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, ind.wait(), id)
                if (q == undefined || q == ' ') return geps.reply(from, `*Hasil Pencarian : ${q}* tidak ditemukan`, id)
                google({ 'query': q }).then(results => {
                    let vars = `_*Hasil Pencarian : ${q}*_\n`
                    for (let i = 0; i < results.length; i++) {
                        vars += `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                    }
                    geps.reply(from, vars, id);
                }).catch(e => {
                    console.log(e)
                    geps.sendText(ownerNumber, 'Google Error : ' + e);
                })
                break
            case prefix+'kbbi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.kbbi(q)
                    .then(async ({ result }) => {
                        await geps.reply(from, result.hasil, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'linesticker':
                const ridhos = body.slice(13)
                const getline = await axios.get(`http://enznoire.herokuapp.com/line?url=${ridhos}`)	
                if (!puki123) return geps.reply(from, 'Gunakan perntah #linesticker [link]\nContoh #linesticker https://store.line.me/stickershop/product/4877/id', id)
                if (getline.status === false) {
                    return geps.relpy(from, 'Upss maaf terjadi kesalahan [ERROR] mungkin linknya tidak valid')
                } else {
                    geps.reply(from, ind.wait(), id)
                    await geps.sendStickerfromUrl(from, getline.data.thumb)
                    for (let i = 0; i < getline.data.sticker.length; i++) {
                    await geps.sendStickerfromUrl(from, `${getline.data.sticker[i]}`)
                    }
                }
                break
            case prefix+'newsline':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                misc.linesticker()
                    .then(async ({ result }) => {
                        let lines = '-----[ *NEW STICKER* ]-----'
                        for (let i = 0; i < result.hasil.length; i++) {
                            lines +=  `\n\n➸ *Title*: ${result.hasil[i].title}\n➸ *URL*: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, lines, id)
                        console.log('Success sending sticker Line!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'jadwalsholat':
            case prefix+'jadwalsolat':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.jadwalSholat(q)
                    .then((data) => {
                        data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                            const x = subuh.split(':')
                            const y = terbit.split(':')
                            const xy = x[0] - y[0]
                            const yx = x[1] - y[1]
                            const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                            const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${tanggal}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                            await geps.reply(from, msg, id)
                            console.log('Success sending jadwal sholat!')
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'gempa':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                misc.bmkg()
                    .then(async ({ kedalaman, koordinat, lokasi, magnitude, map, potensi, waktu }) => {
                        const teksInfo = `${lokasi}\n\nKoordinat: ${koordinat}\nKedalaman: ${kedalaman}\nMagnitudo: ${magnitude} SR\nPotensi: ${potensi}\n\n${waktu}`
                        await geps.sendFileFromUrl(from, map, 'gempa.jpg', teksInfo, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'talk':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, q, id)
                break
            case prefix+'say':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const manggildlu = JSON.parse(fs.readFileSync('./database/bot/say.json'))
                const ngemathbre = manggildlu[Math.floor(Math.random() * (manggildlu.length))]
                geps.reply(from, `${ngemathbre}`, id)
                break
            case prefix+'saylist':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                let saylisto = `Random say list\nTotal : ${say.length}\n`
                for (let i of say) {
                    saylisto += `☛ ${i}\n`
                }
                await geps.reply(from, saylisto, id)
                break
            case prefix+'igstalk':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.igStalk(q)
                    .then(async ({ graphql }) => {
                        if (graphql === undefined) {
                            await geps.reply(from, 'Not found.', id)
                        } else {
                            const { biography, edge_followed_by, edge_follow, full_name, is_private, is_verified, profile_pic_url_hd, username, edge_owner_to_timeline_media } = graphql.user
                            const text = `*「 IG STALK 」*\n\n➸ *Username*: ${username}\n➸ *Bio*: ${biography}\n➸ *Full name*: ${full_name}\n➸ *Followers*: ${edge_followed_by.count}\n➸ *Followings*: ${edge_follow.count}\n➸ *Private*: ${is_private ? 'Yes' : 'No'}\n➸ *Verified*: ${is_verified ? 'Yes' : 'No'}\n➸ *Total posts*: ${edge_owner_to_timeline_media.count}`
                            await geps.sendFileFromUrl(from, profile_pic_url_hd, 'insta.jpg', text, id)
                            console.log('Success sending IG stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'gsmarena':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.gsmarena(q)
                        .then(async ({ result }) => {
                            await geps.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                            console.log('Success sending phone info!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'resepmakanan':
            case prefix+'resep':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.resep(q)
                        .then(async ({ result }) => {
                            await geps.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.receipt(result), id)
                            console.log('Success sending food receipt!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'findsticker':
            case prefix+'findstiker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.sticker(q)
                        .then(async ({ result }) => {
                            if (result.response !== 200) return await geps.reply(from, 'Not found!', id)
                            for (let i = 0; i < result.data.length; i++) {
                                await geps.sendStickerfromUrl(from, result.data[i])
                            }
                            console.log('Success sending sticker!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'movie':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.movie(q)
                    .then(async ({ result }) => {
                        let movies = `Result for: *${result.judul}*`
                        for (let i = 0; i < result.data.length; i++) {
                            movies +=  `\n\n➸ *Quality:* : ${result.data[i].resolusi}\n➸ *URL*: ${result.data[i].urlDownload}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, movies, id)
                        console.log('Success sending movie result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'cekongkir': // By: VideFrelan
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                const kurir = q.substring(0, q.indexOf('|') - 1)
                const askot = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const tukot = q.substring(q.lastIndexOf('|') + 2)
                misc.ongkir(kurir, askot, tukot)
                    .then(async ({ result }) => {
                        let onkir = `-----[ *${result.title}* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            onkir +=  `\n\n➸ *Layanan*: ${result.data[i].layanan}\n➸ *Estimasi*: ${result.data[i].etd}\n➸ *Tarif*: ${result.data[i].tarif}\n➸ *Info*: ${result.informasi}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, onkir, id)
                        console.log('Success sending ongkir info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ttp':
            case prefix+'tosticker':
                        try
                    {
                        const string = body.toLowerCase().includes('#ttp') ? body.slice(5) : body.slice(5)
                        if(args)
                        {
                            if(quotedMsgObj == null)
                            {
                                const gasMake = await getStickerMaker(string)
                                if(gasMake.status == true)
                                {
                                    try{
                                        await geps.sendImageAsSticker(from, gasMake.base64)
                                    }catch(err) {
                                        await geps.reply(from, 'Gagal membuat.', id)
                                    } 
                                }else{
                                    await geps.reply(from, gasMake.reason, id)
                                }
                            }else if(quotedMsgObj != null){
                                const gasMake = await getStickerMaker(quotedMsgObj.body)
                                if(gasMake.status == true)
                                {
                                    try{
                                        await geps.sendImageAsSticker(from, gasMake.base64)
                                    }catch(err) {
                                        await geps.reply(from, 'Gagal membuat.', id)
                                    } 
                                }else{
                                    await geps.reply(from, gasMake.reason, id)
                                }
                            }
                           
                        }else{
                            await geps.reply(from, 'Tidak boleh kosong.', id)
                        }
                    }catch(error)
                    {
                        console.log(error)
                    }
                break
            case prefix+'distance':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const kotaAsal = q.substring(0, q.indexOf('|') - 1)
                const kotaTujuan = q.substring(q.lastIndexOf('|') + 2)
                misc.distance(kotaAsal, kotaTujuan)
                    .then(async ({ result }) => {
                        if (result.response !== 200) {
                            await geps.reply(from, 'Error!', id)
                        } else {
                            await geps.reply(from, result.data, id)
                            console.log('Success sending distance info!')
                        }
                    })
            break
            case prefix+`addimage`:
                let imageom = body.slice(10)
                if (!imageom) return geps.reply(from, `teksnya mana?\nContoh : ${prefix}addimage punya owner`, id)
                if (quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const filename = `./database/temp/image/${imageom}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    imagelist.push(imageom)
                    fs.writeFileSync('./database/bot/image.json', JSON.stringify(imagelist))
                    await geps.reply(from, `Image dengan nama ${imageom} berhasil disimpan!\nSilahkan ketik ${prefix}imagelist untuk melihat list image`, id)
                }else if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(message, uaOverride)
                    const filename = `./database/temp/image/${imageom}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    imagelist.push(imageom)
                    fs.writeFileSync('./database/bot/image.json', JSON.stringify(imagelist))
                    await geps.reply(from, `Image dengan nama ${imageom} berhasil disimpan!\nSilahkan ketik ${prefix}imagelist untuk melihat list image`, id)
                }else{
                    await geps.reply(from, 'Error! Silahkan coba kembali...', id)
                }
                break
                case prefix+`getimage`:
                    const pftpt = body.slice(10)
                    await geps.sendImage(from, `./database/temp/image/${pftpt}.jpeg`, id)
                break
                case prefix+'imagelist':
                case prefix+'imglist':
                case prefix+'listimage':
                case prefix+'listimg':   
                    let imagebos = `┌─「 *LIST IMAGE RANDOM* 」\n│\n├ Total : ${imagelist.length}\n`
                    for (let i of imagelist) {
                    imagebos += `├ `
                    imagebos += `${i}\n`
                    }
                    imagebos += '│\n└─「 *Alm. RidhoSenpai[BOT]* 」'
                    await geps.sendText(from, imagebos)
                  break
                  case prefix+`getvn`:
                    const namfil = body.slice(7)
                    await geps.sendPtt(from, `./database/temp/vn/${namfil}.mp3`, id)
                    break
                case prefix+`addvn`:
                    let nmfil = body.slice(7)
                    if (!nmfil) return geps.reply(from, `teksnya mana?\nContoh : ${prefix}setvn desah`, id)
                    if (isQuotedAudio){
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const filename = `./database/temp/vn/${nmfil}.mp3`
                        await fs.writeFileSync(filename, mediaData)
                        vnlist.push(nmfil)
                        fs.writeFileSync('./database/bot/vn.json', JSON.stringify(vnlist))
                        await geps.reply(from, `Vn dengan nama ${nmfil} berhasil disimpan!\nSilahkan ketik ${prefix}vnlist untuk melihat list vn`, id)
                    }else if(isMedia && type === 'audio'){
                        const mediaData = await decryptMedia(message, uaOverride)
                        const filename = `./database/temp/vn/${nmfil}.mp3`
                        await fs.writeFileSync(filename, mediaData)
                        vnlist.push(nmfil)
                        fs.writeFileSync('./database/bot/vn.json', JSON.stringify(vnlist))
                        await geps.reply(from, `Vn dengan nama ${nmfil} berhasil disimpan!\nSilahkan ketik ${prefix}vnlist untuk melihat list vn`, id)
                    }else{
                        await geps.reply(from, 'Error! Silahkan coba kembali...', id)
                    }
                    break
                case prefix+'vnlist':
                case prefix+'listvn':
                    let vn = `┌─「 *LIST VN RANDOM* 」\n│\n├ Total : ${vnlist.length}\n`
                    for (let i of vnlist) {
                    vn += `├ `
                    vn += `${i}\n`
                    }
                    vn += '│\n└─「 *Alm. RidhoSenpai[BOT]* 」'
                    await geps.reply(from, vn, id)
                    break
            case prefix+'ytsearch':
            case prefix+'yts':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.ytSearch(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { urlyt, image, title, channel, duration, views } = await result[i]
                                await geps.sendFileFromUrl(from, image, `${title}.jpg`, ind.ytResult(urlyt, title, channel, duration, views), id)
                                console.log('Success sending YouTube results!')
                            }
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'hemker': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const hemkers = body.slice(8)
                const puppeteer = require('puppeteer')
                if (!hemkers) return geps.reply(from, `Kirim perintah *${prefix}hemker [text]*\n\nContoh : ${prefix}hemker clay`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/matrix-style-text-effect-online-884.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", hemkers);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const text = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'wolf1': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logowolfs = body.slice(7)
                const logowolfs1 = logowolfs.split('|')[0]
                const logowolfs2 = logowolfs.split('|')[1]
                const puppeteer = require('puppeteer')
                if (!logowolfs) return geps.reply(from, `Kirim perintah *${prefix}wolf1 text1|text2*\n\nContoh : ${prefix}wolf1 aing|gamteng`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-wolf-logo-galaxy-online-936.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logowolfs1);
                                await page.type("#text-1", logowolfs2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'sandwriting':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const swrt2 = await axios.get(`https://api.vhtear.com/sand_writing?text1=${q}&apikey=${config.vhtear}`)
                    const { imgUrl } = swrt2.data.result
                    const swrt3 = `*「 SAND WRITING 」*

*Text : ${q}*`
                    const pictk = await bent("buffer")(imgUrl)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, swrt3)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Gagal membuat:(')
                    geps.sendText(ownerNumber, 'Sand Writing Error : ' + err)
                }
                break
            case prefix+'joker': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logojoker = body.slice(7)
                const puppeteer = require('puppeteer')
                if (!logojoker) return geps.reply(from, `Kirim perintah *${prefix}joker [text]*\n\nContoh : ${prefix}joker laylay`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-logo-joker-online-934.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logojoker);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const texts1 = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(from, texts1, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'singa': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const neoncuyss = body.slice(7)
                const neoncuyss1 = neoncuyss.split('|')[0]
                const neoncuyss2 = neoncuyss.split('|')[1]
                if (!neoncuyss) return geps.reply(from, 'Kirim perintah *#singa text1|text2*\n\nContoh : #singa YouTube|PixelCraftGaming', id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-lion-logo-mascot-online-938.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", neoncuyss1);
                                await page.type("#text-1", neoncuyss2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const text = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'ninja': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo3 = body.slice(7)
                const logo31 = logo3.split('|')[0]
                const logo32 = logo3.split('|')[1]
                if (!logo3) return geps.reply(from, `Kirim perintah *${prefix}ninja text1|text2*\n\nContoh : ${prefix}ninja YouTube|PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-ninja-logo-online-935.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo31);
                                await page.type("#text-1", logo32);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'beruang': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo4 = body.slice(9)
                if (!logo4) return geps.reply(from, `Kirim perintah *${prefix}beruang [text]*\n\nContoh : ${prefix}beruang PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo4);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 10000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'rabbit': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo5 = body.slice(8)
                if (!logo5) return geps.reply(from, `Kirim perintah *${prefix}rabbit [text]*\n\nContoh : ${prefix}rabbit PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-game-pubg-free-fire-fps-online-dep-607.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo5);
                                await page.click("#radio0-radio-bb937ed86ace4fb6bc632e90a737e32c");
                                await new Promise(resolve => setTimeout(resolve, 7000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'weasel': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo6 = body.slice(8)
                if (!logo6) return geps.reply(from, `Kirim perintah *${prefix}weasel [text]*\n\nContoh : ${prefix}weasel PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-game-pubg-free-fire-fps-online-dep-607.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo6);
                                await page.click("#radio0-radio-f53b5da95e994874a634d06ae81a2b09");
                                await new Promise(resolve => setTimeout(resolve, 7000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'dragon': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo7 = body.slice(8)
                if (!logo7) return geps.reply(from, `Kirim perintah *${prefix}dragon [text]*\n\nContoh : ${prefix}dragon PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo7);
                                await page.click("#radio0-radio-f99fea3e79c242959b4a241e8332780b");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'wolfblue': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo9 = body.slice(10)
                if (!logo9) return geps.reply(from, `Kirim perintah *${prefix}wolfblue [text]*\n\nContoh : ${prefix}wolfblue PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo9);
                                await page.click("#radio0-radio-7e8d1d6b1b72481abc38a9d26513a803");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'shark': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logo10 = body.slice(7)
                if (!logo10) return geps.reply(from, `Kirim perintah *${prefix}shark [text]*\n\nContoh : ${prefix}shark PixelCraftGaming`, id)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo10);
                                await page.click("#radio0-radio-2952bc88e2e345fdb54da8f73b52413f");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'wolf2': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const logowolfss = body.slice(7)
                const logowolfss1 = logowolfss.split('|')[0]
                const logowolfss2 = logowolfss.split('|')[1]
                const puppeteer = require('puppeteer')
                if (!logowolfss) return geps.reply(from, `Kirim perintah *${prefix}wolf2 text1|text2*\n\nContoh : ${prefix}wolf2 aing|gamteng`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-wolf-logo-black-white-937.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logowolfss1);
                                await page.type("#text-1", logowolfss2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'tiktod': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const tiktods = body.slice(8)
                const tiktods1 = tiktods.split('|')[0]
                const tiktods2 = tiktods.split('|')[1]
                const puppeteer = require('puppeteer')
                if (!tiktods) return geps.reply(from, `Kirim perintah *${prefix}tiktod teks|teks*\nContoh : ${prefix}tiktod aing|gans`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", tiktods1);
                                await page.type("#text-1", tiktods2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const text = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(from, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'tiktokstalk':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const tstalk2 = await axios.get(`https://api.vhtear.com/tiktokprofile?query=${q}&apikey=${config.vhtear}`)
                    const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
                    const tiktod = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Judul:* ${title}
➸ *Bio:* ${bio}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Like*: ${like_count}
➸ *Jumlah Postingan:* ${video_post}
➸ *Deskripsi:* ${description}
➸ *Link:* ${url_account}`

                    const pictk = await bent("buffer")(picture)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, title, tiktod)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Error Tiktokstalk : ' + err)
                }
                break
            case prefix+'tts':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await geps.sendPtt(from, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'flip':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const sides = Math.floor(Math.random() * 2) + 1
                if (sides == 1) {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/LJjkVK5/heads.png', id)
              } else {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/wNnZ4QD/tails.png', id)
              }
                break
            case prefix+'pantun':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
                .then(res => res.text())
                .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                geps.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
                })
                .catch(() => {
                geps.reply(from, 'Ada yang Error!', id)
                })
                break
            case prefix+'fakta':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
                .then(res => res.text())
                .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                geps.reply(from, randomnix, id)
                })
                .catch(() => {
                geps.reply(from, 'Ada yang Error!', id)
                })
                break
            case prefix+'katabijak':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
                .then(res => res.text())
                .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                geps.reply(from, randombijak, id)
                })
                .catch(() => {
                geps.reply(from, 'Ada yang Error!', id)
                })
                break
            case prefix+'tomp3': // by: Piyobot
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if ((isMedia && isVideo || isQuotedVideo)) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .format('mp3')
                            .on('start', (commandLine) => {
                                //console.log(color('[FFmpeg]', 'green'), commandLine) Nyepam su
                            })
                            .on('progress', (progress) => {
                                //console.log(color('[FFmpeg]', 'green'), progress) Nyepam ugha
                            })
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await geps.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await geps.reply(from, `Reply videonya kaka dengan caption ${prefix}tomp3`, id)
                }
            break
            case prefix+'playstore':
            case prefix+'ps':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.playstore(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { app_id, icon, title, developer, description, price, free } = result[i]
                                await geps.sendFileFromUrl(from, icon, `${title}.jpg`, ind.playstore(app_id, title, developer, description, price, free))
                            }
                            console.log('Success sending PlayStore result!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'math':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== 'number') {
                    await geps.reply(from, ind.notNum(q), id)
                } else {
                    await geps.reply(from, `*「 MATH 」*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            break
            case prefix+'shopee':
            case prefix+'shoope':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const namaBarang = q.substring(0, q.indexOf('|') - 1)
                const jumlahBarang = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.shopee(namaBarang, jumlahBarang)
                        .then(async ({ result }) => {
                            for (let i = 0; i < result.items.length; i++) {
                                const { nama, harga, terjual, shop_location, description, link_product, image_cover } = result.items[i]
                                await geps.sendFileFromUrl(from, image_cover, `${nama}.jpg`, ind.shopee(nama, harga, terjual, shop_location, description, link_product))
                            }
                            console.log('Success sending Shopee data!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'partner':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await geps.reply(from, 'Command ini tidak bisa digunakan di dalam grup!\nKarena saya menjaga privasi seseorang untuk tidak diumbar!', id)
                await geps.reply(from, 'Looking for a partner...', id)
                await geps.sendContact(from, register.getRegisteredRandomId(_registered))
                await geps.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case prefix+'fakename':



                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const linkfake = await axios.get(`https://freerestapi.herokuapp.com/api/v1/fakename?country=en`)
                const fakelink = linkfake.data
                geps.reply(from, `「 *FAKE-NAME* 」\n\n*Name* : ${fakelink.name} \n*Birthday* : ${fakelink.birthday} \n*Address* : ${fakelink.address} \n*City* : ${fakelink.city} \n*Region* : ${fakelink.region} \n*Country* : ${fakelink.country} \n*Zip* : ${fakelink.zip} \n*Phone Number* : ${fakelink.phone_number} \n*Username* : ${fakelink.username} \n*Password* : ${fakelink.password} \n*Email* : ${fakelink.email}`, id)
                break
            case prefix+'next':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await geps.reply(from, 'Command ini tidak bisa digunakan di dalam grup!\nKarena saya menjaga privasi seseorang untuk tidak diumbar!', id)
                await geps.reply(from, 'Looking for a partner...', id)
                await geps.sendContact(from, register.getRegisteredRandomId(_registered))
                await geps.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case prefix+'tafsir':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length === 0) return geps.reply(from, `Untuk menampilkan ayat Al-Qur'an tertentu beserta tafsir dan terjemahannya\ngunakan ${prefix}tafsir surah ayat\n\nContoh: ${prefix}tafsir Al-Mulk 10`, id)
                await geps.reply(from, ind.wait(), id)
                const responSurah = await axios.get('https://raw.githubusercontent.com/VideFrelan/words/main/tafsir.txt')
                const { data } = responSurah.data
                const idx = data.findIndex((post) => {
                    if ((post.name.transliteration.id.toLowerCase() === args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() === args[0].toLowerCase())) return true
                })
                const nomerSurah = data[idx].number
                if (!isNaN(nomerSurah)) {
                    const responseh = await axios.get('https://api.quran.sutanlab.id/surah/'+ nomerSurah + '/'+ args[1])
                    const { data } = responseh.data
                    let pesan = ''
                    pesan += 'Tafsir Q.S. ' + data.surah.name.transliteration.id + ':' + args[1] + '\n\n'
                    pesan += data.text.arab + '\n\n'
                    pesan += '_' + data.translation.id + '_\n\n' + data.tafsir.id.long
                    await geps.reply(from, pesan, id)
                }
            break
            case prefix+'listsurah':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                misc.listSurah()
                    .then(async ({ result }) => {
                        let list = '-----[ AL-QUR\'AN LIST ]-----\n\n'
                        for (let i = 0; i < result.list.length; i++) {
                            list += `${result.list[i]}\n\n`
                        }
                        await geps.reply(from, list, id)
                        console.log('Success sending Al-Qur\'an list!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'surah':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.getSurah(args[0])
                    .then(async ({ result }) => {
                        await geps.reply(from, `${result.surah}\n\n${result.quran}`, id)
                        console.log('Success sending surah!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'motivasi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                misc.motivasi()
                    .then(async (body) => {
                        const motivasiSplit = body.split('\n')
                        const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                        await geps.reply(from, randomMotivasi, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'play':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.ytPlay(q)
                    .then(async ({ result }) => {
                        if (Number(result.size.split(' MB')[0]) >= 10.0) return geps.sendFileFromUrl(from, result.image, `${result.title}.jpg`, `Judul: ${result.title}\nSize: *${result.size}*\n\nGagal, Maksimal video size adalah *10MB*!`, id)
                        await geps.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.ytPlay(result), id)
                        const responses = await fetch(result.mp3);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./temp/${result.title}.mp3`, buffer)
                        await geps.sendFile(from, `./temp/${result.title}.mp3`, `${result.title}`, id)
                        console.log('Success sending Play MP3!')
                        fs.unlinkSync(`./temp/${result.title}.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ssweb':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${q}&type=pc&apikey=${config.vhtear}`, 'ssurl.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'whois':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await geps.reply(from, `*「 WHOIS 」*\n\n➸ *IP address*: ${result.ip_address}\n➸ *City*: ${result.city}\n➸ *Region*: ${result.region}\n➸ *Country*: ${result.country}\n➸ *ZIP code*: ${result.postal_code}\n➸ *Latitude and longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Call code*: ${result.calling_code}\n➸ *Currency*: ${result.currency}\n➸ *Language code*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organization*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            /*case prefix+'sms':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const pesanPengirim = q.substring(0, q.indexOf('|') - 1)
                const nomorPenerima = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                misc.sms(nomorPenerima, pesanPengirim)
                    .then(async ({ status, pesan }) => {
                        if (status !== 'success') return await geps.reply(from, pesan, id)
                        await geps.reply(from, `Success sending SMS to: ${nomorPenerima}\nMessage: ${pesanPengirim}`, id)
                        console.log(`Success sending SMS to ${nomorPenerima}!`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break*/
            case prefix+'toxic':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, toxic(), id)
            break
            case prefix+'alkitab':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.alkitab(q)
                    .then(async ({ result }) => {
                        let alkitab = '-----[ *AL-KITAB* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            alkitab +=  `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, alkitab, id)
                        console.log('Success sending Al-Kitab!')
                    })
            break
            case prefix+'quran':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const qura = `https://api.vhtear.com/quran?no=${q}&apikey=${config.vhtear}`
                const quraan = await axios.get(qura)
                const quraann = quraan.data
                let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
                await geps.reply(from, `${hasqu}`, id).catch(() => geps.reply(from, `*Terdapat kesalahan saat mencari surat ${q}*`, id))
                break
            case prefix+'reminder': // by Slavyan
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await geps.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await geps.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case prefix+'imagetourl':
            case prefix+'imgtourl':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await geps.reply(from, linkImg, id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'infohoax':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                misc.infoHoax()
                    .then(async ({ result }) => {
                        let txt = '*「 HOAXES 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { tag, title, link } = result[i]
                            txt += `\n\n➸ *Status*: ${tag}\n➸ *Deskripsi*: ${title}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.sendFileFromUrl(from, result[0].image, 'hoax.jpg', txt, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'pinterest':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${q}&apikey=${config.vhtear}`)
                if (!ptrst.ok) throw new Error(`Error Pinterest : ${ptrst.statusText}`)
                const ptrs = await ptrst.json()
                const ptrsn = ptrs.result
                const b = JSON.parse(JSON.stringify(ptrsn))
                const ptrs2 = b[Math.floor(Math.random() * b.length)]
                const image = await bent("buffer")(ptrs2)
                const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                await geps.sendImage(from, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${q}*`, id)
                break
            case prefix+'brainly':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/branly?query=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const anm2 = `➸ Jawaban : ${resp.data.result.data}`
                    geps.reply(from, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Brainly Error : ' + err)
                }
                break
            case prefix+'estetik':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const aestetic = ["http://wa-botstiker.my.id/images/aesthetic/aachal-6geVJeZJMg8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/abyan-athif-BCx6t5pJwVw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-UUJzCuHUfYI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-kx1r9Fgqe7s-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-lXaOSpd_UQw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anders-jilden-AkUR27wtaxs-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/andrea-boschini-5Ipk8IgNpPg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anmol-gupta-6Zpojuvyr-E-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/austin-chan-ukzHlkoz1IE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/bantersnaps-1sUs8JbGx74-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/beasty--HxIhfS_dUk-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/daniel-tseng-W9kq9suABY4-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/estee-janssens-MUf7Ly04sOI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/fabian-moller-gI7zgb80QWY-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/florian-klauer-mk7D-4UCfmg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/ian-dooley-aaAllJ6bmac-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/karthikeya-gs-ZMM2sVJKd3A-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/kevin-laminto-hSeh-3ID830-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/larm-rmah-CB8tGaFoW38-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/matthew-ronder-seid-GWzCpqXPNDw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/orfeas-green-G5A5ZNjS2tE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/pari-karra-elK1z1WcsR8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-qEWEz-U5p8Q-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-z4gWzj0p93c-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/tamara-gore-ldZrvy2SOEA-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/vanessa-serpas-S4fYv5LQ4_A-unsplash.jpg"]
                let aes = aestetic[Math.floor(Math.random() * aestetic.length)]
                geps.sendFileFromUrl(from, aes, 'aestetic.jpg', 'estetik')
                break
            case prefix+'cecan':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const itemslh = ["https://i.pinimg.com/originals/69/d7/b3/69d7b3d5a089e7cbee0250ea5da9b14b.jpg","https://i.pinimg.com/originals/78/fa/10/78fa10ab94c0dc9e19a18358a9752070.jpg","https://i.pinimg.com/originals/93/e0/a3/93e0a3816183696ff89b1ad7db2fd3c0.jpg","https://i.pinimg.com/originals/a6/34/cf/a634cfa655269069439e9476780b46fe.jpg","https://i.pinimg.com/originals/dc/f5/69/dcf569a7b08efcae64d0747b51d04a7d.jpg","https://i.pinimg.com/originals/4f/96/2b/4f962b89bd7ceb438b3e9ebbd075184c.jpg","https://i.pinimg.com/originals/c2/fb/e7/c2fbe7a6955a85c51b9ee8062a7b68d3.jpg","https://i.pinimg.com/originals/44/54/24/44542415cf206f2c041e3bbb52a69419.jpg","https://i.pinimg.com/originals/ae/3c/40/ae3c40e0a2f653811b5a67ccd6b9d8cc.jpg","https://i.pinimg.com/originals/bd/fa/33/bdfa3317d96e6cdafaf27e3b337d05b4.jpg","https://i.pinimg.com/originals/75/6a/f2/756af236ae909431567ed184c43aae6f.png","https://i.pinimg.com/originals/a5/95/d7/a595d7fe6b8dc00d1aaa7287f1dd304e.jpg","https://i.pinimg.com/originals/40/37/78/40377871ee06a4a434c39e90b1f647e1.jpg","https://i.pinimg.com/originals/45/73/ac/4573ac9484c480500872b7c91f758040.jpg","https://i.pinimg.com/originals/32/7d/0b/327d0be89cc60321128d0f0bdaadfc15.jpg","https://i.pinimg.com/originals/f4/a1/0f/f4a10ffd44aea604383be84a34f69f90.jpg","https://i.pinimg.com/originals/ec/7f/b5/ec7fb5506136f72876633aab957a755a.jpg","https://i.pinimg.com/originals/4c/e9/15/4ce915c8245586f541c4d0a8b71cc500.jpg","https://i.pinimg.com/originals/03/2a/14/032a145e96154753e33bdda30d9f41f1.jpg","https://i.pinimg.com/originals/f4/5b/07/f45b070de82acec89092eaea1b415029.jpg","https://i.pinimg.com/originals/a9/f2/da/a9f2da1277fb7bc801856c3b9c12d37d.jpg","https://i.pinimg.com/originals/af/ab/93/afab93ebbf109a601dcb77b5baa494b4.jpg","https://i.pinimg.com/originals/b9/38/df/b938dfba6c139ad45ce51203a43eac0d.jpg","https://i.pinimg.com/originals/af/10/0a/af100a49cb8f53f0dd5b48664ede9db8.jpg","https://i.pinimg.com/originals/99/18/6c/99186c2145e1223f885103f51817be78.jpg","https://i.pinimg.com/originals/3c/fd/c9/3cfdc9ba7cf79ed061808e162162f4da.jpg","https://i.pinimg.com/originals/31/95/64/319564a33b5ed46a52d30c18d2310f22.jpg","https://i.pinimg.com/originals/1c/2d/9f/1c2d9ffdd104200355bab43c9d3fad20.gif","https://i.pinimg.com/originals/4a/aa/12/4aaa12940f51fdfb1684964df3796c4c.jpg","https://i.pinimg.com/originals/37/90/bc/3790bc29be16d95174af4eff4ee3859f.jpg","https://i.pinimg.com/originals/4c/12/8f/4c128fda6e71a9f4c670a78a21d8c196.jpg","https://i.pinimg.com/originals/34/92/10/3492100b4a924458a2bf5340d68293c2.jpg","https://i.pinimg.com/originals/5a/dd/12/5add12091eafba364ec76c91d20e75ac.jpg","https://i.pinimg.com/originals/da/c3/59/dac359d1fc87193c2b9d85bb96fedcbc.jpg","https://i.pinimg.com/originals/2e/d6/a9/2ed6a9670d942220eab92b99bb0d1c09.jpg","https://i.pinimg.com/originals/f1/89/e3/f189e3d9b353f91b60060cc64e6706c9.jpg","https://i.pinimg.com/originals/8c/06/c2/8c06c22283cf98abdb8922e2f3aa0a6a.jpg","https://i.pinimg.com/originals/8b/6f/0b/8b6f0b1e213240eaad90894292a2d3c1.jpg","https://i.pinimg.com/originals/89/bf/b8/89bfb86392d39477adcd66444cf19845.jpg","https://i.pinimg.com/originals/35/e2/cc/35e2cc3c535d8f1cfeaf13cce69ac984.jpg","https://i.pinimg.com/originals/c0/01/a1/c001a16e2629872a3d7ea7fdbe5a4e98.jpg","https://i.pinimg.com/originals/b4/eb/48/b4eb486def2d413716c5fa033af9fb34.jpg","https://i.pinimg.com/originals/55/ee/7b/55ee7b5f4889cc34ec1a01d2e7875b53.jpg","https://i.pinimg.com/originals/0c/b3/0e/0cb30ea660aafbae32cc07433bf3eea2.jpg","https://i.pinimg.com/originals/1f/50/23/1f5023991f2a01cff748e84c4cf3612d.jpg","https://i.pinimg.com/originals/ab/53/07/ab5307df9234934f385eb6235aa6c2cd.jpg","https://i.pinimg.com/originals/e1/a1/7c/e1a17c5f359846741c687ef1fcadb316.jpg","https://i.pinimg.com/originals/16/1b/21/161b215ee2f8e0a040c91f18c054d705.jpg","https://i.pinimg.com/originals/da/07/1a/da071a5fafbc6487d38edd4e9f3401db.jpg","https://i.pinimg.com/originals/54/f4/26/54f42615f9ad45743e6fb08ed86623f0.jpg"]
                let cewelh = itemslh[Math.floor(Math.random() *itemslh.length)]
                geps.sendFileFromUrl(from, cewelh, 'ptlsh.jpeg', 'Wkwkwkw', id)
                break
            case prefix+'cogan':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const lista = ["https://croedil.com/wp-content/uploads/2020/04/jmet-6.jpg","https://1.bp.blogspot.com/-VgD8M3SboB4/VjrXsjMuqVI/AAAAAAAAAEw/u3XH204M-v4/s1600/emo-alay.jpg,","https://cdn.idntimes.com/content-images/qna/2020/04/1127-0e907286abdd5b121c1ba478bf438740_600x400.jpg","https://pbs.twimg.com/media/EZurOJKUYAA9SOm.jpg","https://cdn-brilio-net.akamaized.net/news/2020/05/08/184074/1223821-8-penampakan-tokoh-upin-ipin-jadi-jamet.jpg","https://i1.sndcdn.com/avatars-000563943594-kprysk-t500x500.jpg","https://4.bp.blogspot.com/-tipqBt89hso/UEp1Kbk57BI/AAAAAAAAA3I/UkCWeaubvY8/s280/531597_204824659645932_284866801_n.jpg","https://i.pinimg.com/236x/f2/cd/f2/f2cdf277b050a4177a413cbb1a3670a2.jpg","https://3.bp.blogspot.com/-fX4LAMxwtTw/T0pK9AMCk_I/AAAAAAAAADY/Vjycs-5daNk/s1600/383980_317815444909102_100000419486231_1170665_1061758354_n.jpg","https://2.bp.blogspot.com/-6ClgolefeeM/U-uDyvQRA3I/AAAAAAAALmY/sx7_-93-qac/s1600/MANUSIA%2BPALING%2BJELEK%2BSEDUNIA.jpg","https://jajanksblog.files.wordpress.com/2012/02/hikmah2bjadi2borang2bjelek.jpg"]
                let ra = lista[Math.floor(Math.random() * lista.length)]
                geps.sendFileFromUrl(from, ra, 'cwo.jpeg', 'nih cogan !')
                break
            case prefix+'dadu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const dice = Math.floor(Math.random() * 6) + 1
                await geps.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
                break
            case prefix+'koin':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const side = Math.floor(Math.random() * 2) + 1
                if (side == 1) {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
                } else {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
                }
                break
            case prefix+'ptl':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
                let pep = pptl[Math.floor(Math.random() * pptl.length)]
                geps.sendFileFromUrl(from, pep, 'pptl.jpg', 'Nehhh', id)
                break
                case prefix+'bass':{
                    if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                    if (!isQuotedAudio) return await geps.reply(from, `Reply vnnya kaka dengan valuenya\nContoh : ${prefix}bass 1000`, id)
                    if (isQuotedAudio) {
                        let dB = 20
                        let freq = 60
                        if (args[0]) dB = clamp(parseInt(args[0]) || 20, 0, 50)
                        if (args[1]) freq = clamp(parseInt(args[1]) || 20, 20, 500)
                        let mediaData = await decryptMedia(quotedMsg)
                        let temp = './temp'
                        let name = new Date() * 1
                        let fileInputPath = path.join(temp, 'audio', `${name}.mp3`)
                        let fileOutputPath = path.join(temp, 'audio', `${name}_2.mp3`)
                        console.log(color('[fs]', 'green'), `Writing media into '${fileInputPath}'`)
                        //geps.reply(from, 'tunggu ya sedang diproses', ('mp3', 'mp3', `Bass ${freq}hz: +${dB}dB`), id)
                        fs.writeFile(fileInputPath, mediaData, err => {
                            if (err) return geps.sendText(from, 'Ada yang error saat menulis file', id)
                            ffmpeg(fileInputPath)
                                .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                                .format('mp3')
                                .on('start', function (commandLine) {
                                    //console.log(color('[FFmpeg]', 'green'), commandLine)
                                })
                                .on('progress', function (progress) {
                                    //console.log(color('[FFmpeg]', 'green'), progress)
                                })
                                .on('end', function () {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                                    // if (err) return client.sendText(from, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                                    geps.sendPtt(from, fileOutputPath, id)
                                    // })
                                    setTimeout(() => {
                                        try {
                                            fs.unlinkSync(fileInputPath)
                                            fs.unlinkSync(fileOutputPath)
                                        } catch (e) { _err(e) }
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    }
                }
                break
            case prefix+'trending':
            case prefix+'trendtwit':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                misc.trendingTwt()
                    .then(async ({ result }) => {
                        let txt = '*「 TRENDING TWITTER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { hastag, rank, tweet, link } = result[i]
                            txt += `\n\n${rank}. *${hastag}*\n➸ *Tweets*: ${tweet}\n➸ *Link*: ${link}`
                        }
                        await geps.reply(from, txt, id)
                        console.log('Success sending trending!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'jobseek':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                misc.jobSeek()
                    .then(async ({ result }) => {
                        let txt = '*「 JOB SEEKER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { perusahaan, link, profesi, gaji, lokasi, pengalaman, edukasi, desc, syarat } = result[i]
                            txt += `\n\n➸ *Perusahaan*: ${perusahaan}\n➸ *Lokasi*: ${lokasi}\n➸ *Profesi*: ${profesi}\n➸ *Gaji*: ${gaji}\n➸ *Pengalaman*: ${pengalaman}\n➸ *Deskripsi*: ${desc}\n➸ *Syarat*: ${syarat}\n➸ *Edukasi*: ${edukasi}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, txt, id)
                        console.log('Success sending jobseek!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'spamcall':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await geps.reply(from, ind.wrongFormat())
                await geps.reply(from, ind.wait(), id)
                misc.spamcall(args[0])
                    .then(async ({ status, logs, msg }) => {
                        if (status !== 200) {
                            await geps.reply(from, msg, id)
                        } else {
                            await geps.reply(from, logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'spamsms':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 2) return await geps.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0])) && isNaN(Number(args[1]))) return await geps.reply(from, ind.wrongFormat(), id)
                if (Number(args[1]) > 10) return await geps.reply(from, 'Maximum 10 SMS.', id)
                await geps.reply(from, ind.wait(), id)
                misc.spamsms(args[0], args[1])
                    .then(async ({ status, logs, msg }) => {
                        if (status !== 200) {
                            await geps.reply(from, msg, id)
                        } else {
                            await geps.reply(from, logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'menu':
            case prefix+'help':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const rankUser = level.getLevelingLevel(sender.id, _level)
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 200 * (Math.pow(2, levelMenu) - 1)
                function format(seconds){
                    function pad(s){
                    return (s < 10 ? '0' : '') + s;
                    }
        
                    var hours = Math.floor(seconds / (60*60));
                    var minutes = Math.floor(seconds % (60*60) / 60);
                    var seconds = Math.floor(seconds % 60);
        
                    return pad(hours) + 'H ' + pad(minutes) + 'M ' + pad(seconds) + 'S';
                    }
            case 'm':
                if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
            
                    var uptime = process.uptime();
                geps.reply(from, `┌──「 *Alm. RidhoSenpai[BOT]* 」
│        
├「 *USER STATUS* 」
│
├ *Nama* : ${pushname}
├ *Level* : ${levelMenu}
├ *XP* : ${xpMenu}
├ *Rank* : ${role}
├ *Premium* : ${isPremium ? 'YES' : 'NO'}
├ *Total user* : ${jumlahUser}
├ *Uptime* : ${format(uptime)}
│          
├「 *LIST MENU* 」
│
├ ${prefix}downloadmenu
├ ${prefix}makermenu
├ ${prefix}ownermenu
├ ${prefix}funmenu
├ ${prefix}groupmenu
├ ${prefix}nsfwmenu
├ ${prefix}mediamenu
├ ${prefix}animemenu
├ ${prefix}kerangmenu
├ ${prefix}islammenu
├ ${prefix}premiummenu
├ ${prefix}othermenu
├ ${prefix}stickermenu
├ ${prefix}infomenu
├ ${prefix}systemmenu
│
└──「 *Alm. RidhoSenpai[BOT]* 」
`, id)
                break
            case prefix+'group':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (args.length === 1) return geps.reply(from, 'Pilih open atau close!', id)
                if (args[0].toLowerCase() === 'open') {
                    geps.setGroupToAdminsOnly(groupId, false)
                    geps.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *semua member* dapat mengirim pesan`)
                } else if (args[1].toLowerCase() === 'close') {
                    geps.setGroupToAdminsOnly(groupId, true)
                    geps.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
                } else {
                    geps.reply(from, 'Pilih open atau disable close!', id)
                }
                break
            case prefix+'opengc':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                geps.setGroupToAdminsOnly(groupId, false)
                geps.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *semua member* dapat mengirim pesan`)
                break
            case prefix+'closegc':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                geps.setGroupToAdminsOnly(groupId, true)
                geps.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *semua member* dapat mengirim pesan`)
                break
            case prefix+'kapankah':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const when = args.join(' ')
                const kapankah = ['1 Minggu lagi', 'Tidak mungkin', '1 Bulan lagi', '1 Tahun lagi']
                const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                if (!when) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`, id)
                break
            case prefix+'nilai':
            case prefix+'rate':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const rating = args.join(' ')
                const rate = ['100%', '95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%']
                const awr = rate[Math.floor(Math.random() * (rate.length))]
                if (!rating) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`, id)
                break
            case prefix+'apakah':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const nanya = args.join(' ')
                const apakah = ['Ya', 'Tidak', 'Mungkin', 'Coba Ulangi']
                const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                if (!nanya) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`, id)
                break
            case prefix+'bisakah':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const bsk = args.join(' ')
                const bisakah = ['Bisa', 'Tidak Bisa', 'Mungkin', 'Coba Ulangi']
                const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                if (!bsk) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`, id)
                break
            case prefix+'rategay':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const ratings = args.join(' ')
                const kimakss_ = body.slice(9)
                const rategay = ['100%\n*Mending lu ganti kartu daripada dishot 1 by 1*', '95%\n*Milos Detected*', '90%', '85%', '80%', '75%', '70%', '60%', '50%', '45%', '40%', '25%', '20%', '15%', '10%', '5%\n *AMAN BRO*']
                const awrs = rategay[Math.floor(Math.random() * (rategay.length))]
                if (!ratings) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Seberapa Gay : *${kimakss_}*\nJawaban : *${awrs}*`, id)
                break
            case prefix+'ratelesbi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const ratingss = args.join(' ')
                const kimaksss_ = body.slice(11)
                const ratelesbi = ['100%', '95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%']
                const awrss = ratelesbi[Math.floor(Math.random() * (ratelesbi.length))]
                if (!ratingss) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Seberapa Lesbi : *${kimaksss_}*\nJawaban : *${awrss}*`, id)
                break
            case prefix+'ratetampan':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const yodhiya = args.join(' ')
                const pukilol = body.slice(12)
                const ratetampan = ['*100%*\nJangan insecure bro,\nSoalnya lu Tampan bet:D', '*90%*\nLebih tampan nih orang daripada bts:v', '*80%*\nGila anaknya noah yaw?', '*70%*\nBukan maen nih anak', '*60%*\nYaelah masih kurang:v', '*50%*\nTerus berkembang bro', '*40%*\nLumayan sih:v', '*30%*\nMending lu rawat komok lagi dah', '*20%*\nnjir komoknya kek udin', '*10%*\nMuka apa talenan bro?', '*5%*\nMuka apa tembok kos"an?']
                const auah = ratetampan[Math.floor(Math.random() * (ratetampan.length))]
                if (!yodhiya) geps.reply(from, 'Formatsalah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Nama : *${pukilol}*\nTingkat Ketampanan : ${auah}`, id)
                break
            case prefix+'ratecantik':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const yodhiyaa = args.join(' ')
                const pukilols = body.slice(12)
                const ratecantik = ['*100%*\nJangan insecure bro,\nSoalnya Kawai bet:D', '*90%*\nLebih Kawaii nih orang daripada sagiri:v', '*80%*\nGila, Bapaknya sunat dimana?', '*70%*\nBukan maen nih anak', '*60%*\nYaelah masih kurang:v', '*50%*\nTerus berkembang bro', '*40%*\nLumayan sih:v', '*30%*\nMending lu rawat komok lagi dah', '*20%*\nnjir komoknya kek dia:v', '*10%*\nMuka apa talenan bro?', '*5%*\nMuka apa tembok kos"an?']
                const sygg = ratecantik[Math.floor(Math.random() * (ratecantik.length))]
                if (!yodhiyaa) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Nama : *${pukilols}*\nTingkat kecantikan : ${sygg}`, id)
                break
            case prefix+'nhdl':
                // Premium unlocked
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    const kode = args[0]
                    const validate = await nhentai.exists(kode)
                    if (validate === true) {
                        try {
                            const dojin = await nhentai.getDoujin(kode)
                            const { title } = dojin
                            await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                            await geps.sendFile(from, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                            fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                        } catch (err) {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        }
                    } else {
                        await geps.reply(from, ind.nhFalse(), id)
                    }
                } else {
                    await geps.reply(from, ind.wait(), id)
                    const kode = args[0]
                    const validate = await nhentai.exists(kode)
                    if (validate === true) {
                        try {
                            const dojin = await nhentai.getDoujin(kode)
                            const { title } = dojin
                            await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                            await geps.sendFile(from, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                            fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                        } catch (err) {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        }
                    } else {
                        await geps.reply(from, ind.nhFalse(), id)
                    }
                }
                break
            case prefix+'animesearch':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                const anser = body.slice(13)
                if (!anser) return geps.reply(from, `Kirim perintah ${prefix}animesearch [query], Contoh : ${prefix}animesearch DXD (Hanya Bisa Satu Kata)`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    const response2 = await fetch(`https://mnazria.herokuapp.com/api/anime?query=${encodeURIComponent(anser)}`)
                    if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                    const animeser = await response2.json()
                    const { result } = await animeser
                    let xixixi = `Hasil Pencarian : ${anser}\n`
                    for (let i = 0; i < result.length; i++) {
                        xixixi += `\n═════════════════\n\n*Judul* : ${result[i].title}\n*Ditonton* : ${result[i].url}\n`
                    }
                    await geps.reply(from, xixixi, id)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔 Maaf, Anime tidak ditemukan')
                    geps.sendText(ownerNumber, 'Anime Search Error : ' + err)
                }
                break
            case prefix+'groupinfo':
            case prefix+'grupinfo':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                var totalMem = chat.groupMetadata.participants.length
                var desc = chat.groupMetadata.desc
                var groupnames = name
                var welgrp = _welcome.includes(chat.id)
                var ngrp = _nsfw.includes(chat.id)
                var antlink = _antilink.includes(chat.id)
                var simu = simi_.includes(chat.id)
                var levelings = _leveling.includes(chat.id)
                var balances = _balance.includes(chat.id)
                var autostick = _autosticker.includes(groupId)
                var antinsfw = _antinsfw.includes(groupId)
                var grouppic = await geps.getProfilePicFromServer(chat.id)
                if (grouppic == undefined) {
                    var pfp = errorurl
                } else {
                    var pfp = grouppic
                }
                await geps.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*

- *Name* : ${groupnames}
- *Members* : ${totalMem}
- *Welcome* : ${welgrp ? 'On' : 'Off'}
- *NSFW* : ${ngrp ? 'On' : 'Off'}
- *Simsimi* : ${simu ? 'On' : 'Off'}
- *Anti Link* : ${antlink ? 'On' : 'Off'}
- *Anti Nsfw* : ${antinsfw ? 'On' : 'Off'}
- *Auto Sticker* : ${autostick ? 'On' : 'Off'}
- *System Balance* : ${balances ? 'On' : 'Off'}
- *System Leveling* : ${levelings ? 'On' : 'Off'}
- *Group Description*
${desc}`)
                break
            case prefix+'fun':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                const tanyanya = body.slice(5)
                const groupMemeks = await geps.getGroupMembers(groupId)
                const memsmek = groupMemeks
                const auahajg = memsmek[Math.floor(Math.random() * memsmek.length)];
                const sapaa = `${tanyanya} adalah @${auahajg.id.replace(/@c.us/g, '')}`
                await geps.sendTextWithMentions(from, sapaa, id)
                break
            case prefix+'iklan':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.iklandulu(), id)
                break
            case prefix+'downloadmenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuDownloads(), id)
                break
            case prefix+'stickermenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuStikel(), id)
                break
            case prefix+'grupmenu':
            case prefix+'groupmenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuGrupnyee(), id)
                break
            case prefix+'makermenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuMaker(), id)
                break
            case prefix+'funmenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuFuns(), id)
                break
            case prefix+'ownermenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuOwners(), id)
                break
            case prefix+'nsfwmenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuNswfs(), id)
                break
            case prefix+'mediamenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuMedianye(), id)
                break
            case prefix+'animemenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuAnimek(), id)
                break
            case prefix+'kerangmenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuKerang(), id)
                break
            case prefix+'islammenu':
                 if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(frmo, ind.menuIslam(), id)
                break
            case prefix+'premiummenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuPremiums(), id)
                break
            case prefix+'othermenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuLainya(), id)
                break
            case prefix+'infomenu':
                 if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuIngfo(), id)
                break
            case prefix+'systemmenu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.menuSystem(), id)
                break
            case prefix+'donate':
            case prefix+'donasi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.donatenya(), id)
                break
            case prefix+'snk':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.snk(), id)
                break
            case prefix+'bahasa':
            case prefix+'listbahasa':
            case prefix+'bahasalist':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.listbahasatts(), id)
                break
            case prefix+'senpaigroup':
            case prefix+'senpaisquadgroup':
            case prefix+'senpaigroup':
            case prefix+'senpaisquadgroup':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, `Link Group Official Bot Alm. RidhoSenpai[BOT]\nhttps://chat.whatsapp.com/\nMaaf ya kak ${pushname} grupnya lagi ga open mem :<`, id)
                break
            case prefix+'nsfw':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isNsfw) return await geps.reply(from, ind.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await geps.reply(from, ind.nsfwOn(), id)
                } else if (ar[0] === 'disable') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await geps.reply(from, ind.nsfwOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'ping':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const loadedMsg = await geps.getAmountOfLoadedMessages()
                const chatIds = await geps.getAllChatIds()
                const groups = await geps.getAllGroups()
                const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '62895326159282@c.us'].includes(x.id._serialized)).includes(true))
                const me = await geps.getMe()
                const battery = await geps.getBatteryLevel()
                const isCharging = await geps.getIsPlugged()
                const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                return cpu
                })
                geps.reply(from, `「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝘾𝙃𝘼𝙏* 」
            
- *Loaded Messages* > ${loadedMsg}
- *Group Chats* > ${groups.length}
- *Group Joined* > ${groupsIn.length}
- *Group Left* > ${groups.length - groupsIn.length}
- *Personal Chats* > ${chatIds.length - groups.length}
- *Personal Chats Active* > ${chatIds.length - groups.length - groupsIn.length}
- *Total Chats* > ${chatIds.length}
- *Total Chats Active* > ${chatIds.length - groupsIn.length}
- *Charger* > ${isCharging}
- *Penggunaan RAM* > ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
- *Cpu* > ${cpus.length}
\n「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝙃𝙋 𝘽𝙊𝙏* 」\n${(`
\n- *Battery* ${battery}% ${isCharging ? 'Loading Power...' : 'Power Ready!'}
${Object.keys(me.phone).map(key => `*- ${key}* > ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed* > Telkomsel UwU!`, id)
                break
            case prefix+'listblock':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                let block = ind.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await geps.reply(from, block, id)
            break
            case prefix+'speed':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const speeds = moment() / 1000 - t
                geps.reply(from, `「 *𝙎𝙋𝙀𝙀𝘿 𝙏𝙀𝙎𝙏* 」\nMerespon dalam ${speeds} Sec 💬`, id)
            break
            case prefix+'ownerbot':
            case prefix+'owner':
            case prefix+'creator':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.sendContact(from, ownerNumber)
            break
            case prefix+'listbanned':
                let bened = `This is list of banned number\nTotal : ${banned.length}\n`
                for (let i of banned) {
                    bened += `➸ ${i.replace(/@c.us/g, '')}\n`
                }
                await geps.reply(from, bened, id)
                break
            case prefix+'darkjokes':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const djokes = await axios.get(`http://api.zeks.xyz/api/darkjokes?apikey=apivinz`)
                geps.sendFileFromUrl(from, djokes.data.result, 'djokes.jpg', `......`, id)
                break
            case prefix+'randompic':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const rpic = await axios.get(`https://api.zeks.xyz/api/estetikpic?apikey=apivinz`)
                geps.sendFileFromUrl(from, rpic.data.result.result, 'Rpic.jpg', `Random Pic`, id)
                break
            case prefix+'tagme':
                geps.sendTextWithMentions(from, `@${sender.id.replace("@c.us", "")} Tagged`)
                break
            case prefix+'striggered':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    var encryptMedia = isQuotedImage ? quotedMsg : message
                    const smediaData = await decryptMedia(encryptMedia, uaOverride)
                    const simageLink = await uploadImages(smediaData, `calendar.${sender.id}`)
                    geps.sendStickerfromUrl(from, `http://api.zeks.xyz/api/triger?apikey=apivinz&img=${simageLink}`, { method: 'get' })
                }

                break     
            case prefix+'delete':
            case prefix+'del':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!quotedMsg) return await geps.reply(from, ind.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case prefix+'listgroup':
                geps.getAllGroups().then((res) => {
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                geps.reply(from, gc, id)
                })
                break
            case prefix+'report':
            case prefix+'bugreport':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.emptyMess(), id)
                const lastReport = limit.getLimit(sender.id, _limit)
                if (lastReport !== undefined && cd - (Date.now() - lastReport) > 0) {
                    const time = ms(cd - (Date.now() - lastReport))
                    await geps.reply(from, ind.limit(time), id)
                } else {
                    if (isGroupMsg) {
                        await geps.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Group*: ${(name || formattedTitle)}\n*Message*: ${q}`)
                        await geps.reply(from, ind.received(pushname), id)
                    } else {
                        await geps.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Message*: ${q}`)
                        await geps.reply(from, ind.received(pushname), id)
                    }
                    limit.addLimit(sender.id, _limit)
                }
            break
            case prefix+'join':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('chat.whatsapp.com')) return await geps.reply(from, ind.wrongFormat(), id)
                const checkInvite = await geps.inviteInfo(url)
                if (isOwner) {
                    await geps.joinGroupViaLink(url)
                    await geps.reply(from, ind.ok(), id)
                    await geps.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                } else {
                    const getGroupData = await geps.getAllGroups()
                    if (getGroupData.length >= groupLimit) {
                        await geps.reply(from, `Invite refused. Max group is: ${groupLimit}`, id)
                    } else if (getGroupData.size <= memberLimit) {
                        await geps.reply(from, `Invite refused. Minimum member is: ${memberLimit}`, id)
                    } else {
                        await geps.joinGroupViaLink(url)
                        await geps.reply(from, ind.ok(), id)
                        await geps.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                    }
                }
            break
            case prefix+'premiumcheck':
            case prefix+'cekpremium':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await geps.reply(from, `*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender.id}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
            break
            case prefix+'premiumlist':
            case prefix+'listpremium':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                let nomorList = 0
                const arrayPremi = []
                for (let i = 0; i < premium.getAllPremiumUser(_premium).length; i++) {
                    arrayPremi.push(await geps.getContact(premium.getAllPremiumUser(_premium)[i]))
                    nomorList++
                    listPremi += `${nomorList}. ${premium.getAllPremiumUser(_premium)[i]}\n➸ *Name*: ${arrayPremi[i].pushname}\n`
                }
                await geps.reply(from, listPremi, id)
            break
            case prefix+'limit':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                var found = false
                const limidat = JSON.parse(fs.readFileSync('./database/user/limit.json'))
                for (let lmt of limidat) {
                    if (lmt.id === serial) {
                        let limitCounts = limitCount - lmt.limit
                        if (limitCounts <= 0) return geps.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                        geps.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                        found = true
                    }
                }
                //console.log(limit)
                //console.log(limidat)
                if (found === false) {
                    let obj = { id: `${serial}`, limit: 1 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit, 1));
                    geps.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                }

                break
            /*case prefix+'buylimit':
                if (args[0] === '50') {
                    await geps.reply(from, ind.wait(), id)
                    let bayartagihan = "500"
                    addLevelingXpBalance(sender.id, bayartagihan, userbalance)
                    let obj = { id: `${serial}`, limit: 50 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit));
                } else if (args[0] === '100') {
                    await geps.reply(from, ind.wait(), id)
                    let bayartagihan = "1000"
                    addLevelingXpBalance(sender.id, bayartagihan, userbalance)
                    let obj = { id: `${serial}`, limit: 100 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit));
                } else {
                    await geps.reply(from, `Opss`, id)
                }
                break
            case prefix+'tes':
                await limitAdd(serial)
                geps.reply(from, 'Okeh nyala', id)
                break
            /*case prefix+'buylimit':
                const payout = body.slice(10)
                if (!payout) return geps.reply(from, `Berapa limit yang mau di beli kak? Pastiin uang kakak cukup juga kak! \n\nCara cek uang: ${prefix}cekbalance`, id)
                const koinPerlimit = 1000
                const total = koinPerlimit * payout
                if (checkATMuser(sender) <= total) return geps.reply(from, `maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`, id)
                if (checkATMuser(sender) >= total) {
                    confirmATM(sender, total)
                    bayarLimit(sender, payout)
                    await geps.reply(from, `*「 PEMBAYARANBERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n *harga limit* : ${koinPerlimit}/limit\n *sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran \n${createSerial(15)}`, id)
                }
                break*/
            case prefix+'getpic':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)

                if (mentionedJidList.length !== 0) {
                    const userPic = await geps.getProfilePicFromServer(mentionedJidList[0])
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await geps.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await geps.getProfilePicFromServer(args[0] + '@c.us')
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await geps.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break

            // Weeb zone
            case prefix+'neko':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Getting neko image...')
                await geps.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', 'Neko', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'nomorhoki':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const nande = body.slice(11)
                if (!nande) return geps.reply(from, 'Kirim perintah *#nomorhoki [no hp kamu]*\nContoh : *#nomorhoki 0895384009405*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/nomerhoki?no=${nande}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(from, resp.data.error, id)
                const anm2 = `➸ Hasil :\n ${resp.data.result.hasil}`
                geps.reply(from, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Nomor Hoki tidak ditemukan', id)
                    geps.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
               }
                break
            case prefix+'artimimpi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const piye = body.slice(10)
                if (!piye) return geps.reply(from, 'Kirim perintah *#artimimpi [mimpi]*\nContoh : *#artimimpi ular*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/artimimpi?query=${piye}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(from, resp.data.error, id)
                const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}`
                geps.reply(from, anm2, id)
                } catch (err) {
                console.error(err.message)
                await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan', id)
                geps.sendText(ownerNumber, 'Artimimpi Error : ' + err)
                }
                break
            case prefix+'luxury':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/luxury?text=${q}`, 'luxvile.jpg', `Ini kak ${pushname}\n_*Dah Jadi_`, id)
                break
            case prefix+'stickerw':
            case prefix+'stickerwaifu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const wast = ["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010", "0011", "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0019", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "0030", "0031", "0032", "0033", "0034", "0035", "0036", "0037", "0038", "0039", "0040", "0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049", "0050", "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058", "0059", "0060", "0061", "0062", "0063", "0064", "0065", "0066", "0067", "0068", "0069", "0070", "0071", "0072", "0073", "0074", "0075", "0076", "0077", "0078", "0079", "0080", "0081", "0082", "0083", "0084", "0085", "0086", "0087", "0088", "0089", "0090", "0091", "0092", "0093", "0094", "0095", "0096", "0097", "0098", "0099"]
                const wast2 = wast[Math.floor(Math.random() * (wast.length))]
                await geps.sendStickerfromUrl(from, `http://randomwaifu.altervista.org/images/${wast2}.png`)
                break
            case prefix+'kanna':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=kannagen&text=${q}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                break
            case prefix+'trumptweet':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${q}&raw=1`, `Nekonime.jpg`, 'Nehh....', id)
                break
            case prefix+'nekopoi3d':
            case prefix+'3dnekopoi':
            case prefix+'3dnekopoilast':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const bsangee = await axios.get(`https://api.vhtear.com/neko3d&apikey=${config.vhtear}`)
                    const bsangee2 = bsangee.data
                    let keluarplay = `*List update 3D JAV*\n`
                    for (let i = 0; i < bsangee2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangee2.result[i].title}\n*Deskripsi* : ${bsangee2.result[i].description}\n*Link* : ${bsangee2.result[i].url}\n`
                    }
                    await geps.reply(from, keluarplay, id)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, 'Opps error', id)
                }
                break
            case prefix+'nekopoijav':
            case prefix+'javnekopoi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const bsangce = await axios.get(`https://api.vhtear.com/nekojavlist&apikey=${config.vhtear}`)
                    const bsangce2 = bsangce.data
                    let keluarplay = `*List update JAV*\n`
                    for (let i = 0; i < bsangce2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangce2.result[i].title}\n*Serial JAV* : ${bsangce2.result[i].seri}\n*Link* : ${bsangce2.result[i].url}\n`
                    }
                    await geps.reply(from, keluarplay, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'mostview':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://docs-jojo.herokuapp.com/api/mostviewfilm`)
                    const dataplay = dataplai.data
                    let mosviev = `*THIS IS MOST VIEWED MOVIE*\n`
                    for (let i = 0; i < dataplay.result.length; i++) {
                        mosviev += `\n═════════════════\n\n*Rank* : ${dataplay.result[i].rank}\n*Judul* : ${dataplay.result[i].title}\n*Penonton* : ${dataplay.result[i].penonton}\n*Information : ${dataplay.result[i].link}\n`
                    }
                    await geps.reply(from, mosviev, id)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, 'Yah error..', id)
                }
                break
            case prefix+'nekopoihentai':
            case prefix+'hentainekopoi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const bsangpe = await axios.get(`https://api.vhtear.com/nekohentai&apikey=${config.vhtear}`)
                    const bsangpe2 = bsangpe.data
                    let keluarplay = `*List update HEMTAI*\n`
                    for (let i = 0; i < bsangpe2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangpe2.result[i].title}\n*Info* : ${bsangpe2.result[i].detail}\n*Link* : ${bsangpe2.result[i].url}\n`
                    }
                    await geps.sendFileFromUrl(from, bsangpe2.result[0].image, 'kddk.jpg', keluarplay, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'nekopoicosplay':
            case prefix+'cosplaynekopoi':
                try {
                    if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    geps.reply(from, ind.wait(), id)
                    const bsangbe = await axios.get(`https://api.vhtear.com/nekojavcosplay&apikey=${config.vhtear}`)
                    const bsangbe2 = bsangbe.data
                    let keluarplay = `*List update Cosplay JAV*\n`
                    for (let i = 0; i < bsangbe2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangbe2.result[i].title}\n*Deskripsi* : ${bsangbe2.result[i].detail}\n*Link* : ${bsangbe2.result[i].url}\n`
                    }
                    await geps.reply(from, keluarplay, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'maluser':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const result = await axios.get(`https://api.jikan.moe/v3/user/${q}`)
                    const jikan = result.data
                    const Data = `*「 USER - MYANIMELIST 」*

• Username: ${jikan.username}
• User ID: ${jikan.user_id}
• Gender: ${jikan.gender}
• Location: ${jikan.location}
• Joined: ${jikan.joined}
⭐️ Anime Stats ⭐️
• Days Watched: ${jikan.anime_stats.days_watched}
• Mean Score: ${jikan.anime_stats.mean_score}
• Currently Watching: ${jikan.anime_stats.watching}
• Completed: ${jikan.anime_stats.completed}
• On Hold: ${jikan.anime_stats.on_hold}
• Dropped: ${jikan.anime_stats.dropped}
• Plan to Watch: ${jikan.anime_stats.plan_to_watch}
🎯️ Manga Stats 🎯️
• Days Read: ${jikan.manga_stats.days_read}
• Mean Score: ${jikan.manga_stats.mean_score}
• Currently Reading: ${jikan.manga_stats.reading}
• Completed: ${jikan.manga_stats.completed}
• On Hold: ${jikan.manga_stats.on_hold}
• Dropped: ${jikan.manga_stats.dropped}
• Plan to Read: ${jikan.manga_stats.plan_to_read}`

                    await geps.sendFileFromUrl(from, `${jikan.image_url}`, `user.png`, Data)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, User tidak ditemukan')
                }
                break
            case prefix+'captain':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                {
                    if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                    geps.reply(from, ind.wait(), id)
                    const puppeteer = require('puppeteer')
                    try {
                        (async () => {
                            const browser = await puppeteer.launch({
                                headless: true,
                            });
                            const page = await browser.newPage();
                            await page
                                .goto("https://textpro.me/captain-america-text-effect-905.html", {
                                    waitUntil: "networkidle2"
                                })
                                .then(async () => {
                                    await page.type("#text-0", q);
                                    await page.click("#submit");
                                    await new Promise(resolve => setTimeout(resolve, 3000));
                                    const element = await page.$(
                                        'div[class="thumbnail"] > img'
                                    );
                                    const text = await (await element.getProperty("src")).jsonValue();
                                    const urlmp4 = ({
                                        url: text
                                    })
                                    geps.sendFileFromUrl(from, text, id)
                                    await limitAdd(serial)
                                    browser.close();

                                })
                                .catch((err => {
                                    console.log(err)
                                    geps.reply(from, 'error', id)
                                }))
                        })();
                    } catch (error) {
                        console.log('error bang')
                        geps.reply(from, 'error', id)
                    }
                }
                break
            case prefix+'vintage':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/realvintage?text=${q}`, 'vintage.jpg', `ini kak ${pushname}\n*Udah Jadi Pesanan nya*`, id)
                break
            case prefix+'realcloud':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/realcloud?text=${q}`, 'realcloud.jpg', `Nihh Kak ${pushname}\n_Udah Jadi_`, id)
                break
            case prefix+'apkpure':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const puree = await axios.get(`https://api-melodicxt-3.herokuapp.com/api/apkpure/search?query=${q}&apiKey=administrator`)
                let purex = `*「 ApkPure Search 」*\nKata Kunci ${q}\n\n`
                for (let i = 0; i < puree.data.result.data_apk.length; i++) {
                    purex += `=> Title : ${puree.data.result.data_apk[i].title}\n=> Author : ${puree.data.result.data_apk[i].detail_author}\n=> SDK : ${puree.data.result.data_apk[i].detail_sdk}\n=> Link : ${puree.data.result.data_apk[i].link}\n=> Download Link : ${puree.data.result.data_apk[i].download_link}\n=> Deskripsi : ${puree.data.result.data_apk[i].description}\n\n`
                }
                geps.reply(from, purex, id)
                break
            case prefix+'summer':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/sandsummer?text=${q}`, 'summer.jpg', `Nih kak ${pushname}\n*Niih Kak Dah Jadi*`, id)
                break
            case prefix+'pantai':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/sandwrite?text=${q}`, 'pantai.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'pantai2':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/sandsummery?text=${q}`, 'pantai2.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'balon':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/foilballoon?text=${q}`, 'pantai.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'lem':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(from, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(from, `https://arugaz.my.id/api/textpro/glue3d?text=${q}`, 'pantai.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'lk21':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                const filmm = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${q}&apikey=${config.vhtear}`)
                const filmxx = filmm.data
                let filmx = `*「 Download Film 」*\nJudul : ${filmxx.result.judul}\n\n`
                for (let i = 0; i < filmxx.result.data.length; i++) {
                    filmx += `Resolusi : ${filmxx.result.data[i].resolusi}\nLink Download : ${filmxx.result.data[i].urlDownload}\n\n`
                }
                    geps.reply(from, filmx, id)
            } catch (err) {
                    geps.reply(from, 'Tidak dapat menemukan judul tersebut!', id)
                }
                break
            case prefix+'infomotor':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const istalk2s = await axios.get(`https://api.vhtear.com/infomotor?merk=${q}&apikey=${config.vhtear}`)
                    const { title, harga, kekurangan, kelebihan, image, spesifikasi } = istalk2s.data.result
                    const istalk3s = `*Data Ditemukan!*
\n➸ *Nama* : ${title}
\n➸ *Harga* : ${harga}
\n➸ *Kekurangan* : ${kekurangan}
\n➸ *Kelebihan* : ${kelebihan}
\n➸ *Spek* : ${spesifikasi}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, image, istalk3s)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Data tidak ditemukan')
                    geps.sendText(ownerNumber, 'infomotor Error : ' + err)
                }
                break
            case prefix+'infomobil':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const istalk2ss = await axios.get(`https://api.vhtear.com/infomobil?merk=${q}&apikey=${config.vhtear}`)
                    const { title, harga, kekurangan, kelebihan, image, spesifikasi } = istalk2ss.data.result
                    const istalk3ss = `*Data Ditemukan!*
                \n➸ *Nama* : ${title}
                \n➸ *Harga* : ${harga}
                \n➸ *Kekurangan* : ${kekurangan}
                \n➸ *Kelebihan* : ${kelebihan}
                \n➸ *Spek* : ${spesifikasi}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, image, istalk3ss)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Data tidak ditemukan')
                    geps.sendText(ownerNumber, 'infomobil Error : ' + err)
                }
                break
            case prefix+'infoalamat':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const isekai = body.slice(11)
                if (!isekai) return geps.reply(from, 'Kirim perintah *#infoalamat [optional]*Contoh : *#infoalamat jakarta*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/infoalamat?query=${isekai}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(from, resp.data.error, id)
                const anm2 = `➸ Info : ${resp.data.result.data}
\n➸ Deskripsi : ${resp.data.result.deskripsi}`
                geps.reply(from, anm2, id)
                } catch (err) {
                console.error(err.message)
                await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan', id)
                geps.sendText(ownerNumber, 'Ingfoalamat Error : ' + err)
                }
                break
            case prefix+'pokemon':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                q7 = Math.floor(Math.random() * 890) + 1;
                geps.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
                break
            case prefix+'quote':
            case prefix+'quotes':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes?apikey=BotWeA')
                geps.reply(from, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
                break
            case prefix+'infogempa':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const bmkg = await axios.get('https://tobz-api.herokuapp.com/api/infogempa?apikey=BotWeA')
                const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
                const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
                geps.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
                break
            case prefix+'inu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
                let kya = list[Math.floor(Math.random() * list.length)]
                geps.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu', id)
                break
            case prefix+'wallpaper':
            case prefix+'wp':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Getting wallpaper image...')
                await geps.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Success sending wallpaper image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id )
                    })
            break
            case prefix+'kemono':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Getting kemonomimi image...')
                await geps.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'komiku':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                weeaboo.manga(q)
                    .then(async ({ genre, info, link_dl, sinopsis, thumb }) => {
                        let mangak = `${info}${genre}\nSinopsis: ${sinopsis}\nLink download:\n${link_dl}`
                        await geps.sendFileFromUrl(from, thumb, 'mangak.jpg', mangak, null, null, true)
                            .then(() => console.log('Success sending manga info!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'wait':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await geps.reply(from, 'Anime not found! :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Low similarity. 🤔\n\n'
                                } else {
                                    teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await geps.sendFileFromUrl(from, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Success sending anime source!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            /*case prefix+'source':
            case prefix+'sauce':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    try {
                        const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
                        console.log('Searching for source...')
                        const results = await saus(imageLink)
                        for (let i = 0; i < results.length; i++) {
                            let teks = ''
                            if (results[i].similarity < 80.00) {
                                teks = 'Low similarity. 🤔\n\n'
                            } else {
                                teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                                await geps.sendLinkWithAutoPreview(from, results[i].url, teks)
                                    .then(() => console.log('Source found!'))
                            }
                        }
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break*/
            case prefix+'waifu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await geps.sendFileFromUrl(from, url, 'waifu.png', 'Waifunya nih bos', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'husbu':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const diti = fs.readFileSync('./lib/husbu.json')
                const ditiJsin = JSON.parse(diti)
                const rindIndix = Math.floor(Math.random() * ditiJsin.length)
                const rindKiy = ditiJsin[rindIndix]
                geps.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
                break
            case prefix+'malanime':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const keyword = body.slice(10)
                try {
                    const data = await fetch(
                        `https://api.jikan.moe/v3/search/anime?q=${keyword}`
                    )
                    const parsed = await data.json()
                    if (!parsed) {
                        await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                        return null
                    }
                    const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
                    const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

                    const image = await bent("buffer")(image_url)
                    const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                    geps.sendImage(from, base64, title, content)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                }
                break
            case prefix+'malcharacter':
                const keywords = args.join(' ')
                try {
                    const data = await fetch(
                        `https://api.jikan.moe/v3/search/character?q=${keywords}`
                    )
                    const parsed = await data.json()
                    if (!parsed) {
                        await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                        return null
                    }
                    const { name, alternative_names, url, image_url } = parsed.results[0]
                    const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

                    const image = await bent("buffer")(image_url)
                    const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                    geps.sendImage(from, base64, name, contentt)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                }
                break
            case prefix+'shota':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const imageToBase64 = require('image-to-base64')
                var shouta = ['shota anime', 'anime shota'];
                var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
                var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;

                axios.get(urlshot)
                    .then((result) => {
                        var sht = JSON.parse(JSON.stringify(result.data));
                        var shotaak = sht[Math.floor(Math.random() * sht.length)];
                        imageToBase64(shotaak)
                            .then(
                                (response) => {
                                    let img = 'data:image/jpeg;base64,' + response
                                    geps.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
                                })
                            .catch(
                                (error) => {
                                    console.log(error);
                                })
                    })
                break
            case prefix+'loli':
                if (!isOwner) return await geps.reply(from, ind.notRegistered(), id)
                const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${config.vhtear}`)
                const loly = loli.data.result
                geps.sendFileFromUrl(from, loly.result, 'loli.jpeg', 'Cintai loli mu', id)
                break
            case prefix+'anitoki':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                weeaboo.anitoki()
                    .then(async ({ result }) => {
                        let anitoki = '-----[ *ANITOKI LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, anitoki, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'neonimelast':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                weeaboo.neonime()
                    .then(async ({ status, result }) => {
                        if (status !== 200) return await geps.reply(from, 'Not found.', id)
                        let neoInfo = '-----[ *NEONIME LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            const { date, title, link, desc } = result[i]
                            neoInfo += `\n\n➸ *Title*: ${title}\n➸ *Date*: ${date}\n➸ *Synopsis*: ${desc}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, neoInfo, id)
                        console.log('Success sending Neonime latest update!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix +'anoboylast':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                weeaboo.anoboy()
                    .then(async ({ result }) => {
                        let anoboyInfo = '-----[ *ANOBOY ON-GOING* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyInfo += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, anoboyInfo, id)
                        console.log('Success sending on-going anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break

            // Fun
            case prefix+'asupan': // shansekai
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                fun.asupan()
                    .then(async (body) => {
                        const asupan = body.split('\n')
                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                        await geps.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Nehhh...', id)
                        console.log('Success sending video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'citacita': // Piyobot
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fun.cita()
                    .then(async (body) => {
                        const cita = body.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        await geps.sendFileFromUrl(from, randomCita, 'cita.mp3', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'profile':
            case prefix+'me':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await geps.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await geps.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await geps.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await geps.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await geps.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await geps.sendFileFromUrl(from, pfps, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case prefix+'hartatahta':
            case prefix+'tahta':
            case prefix+'harta':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating harta tahta text...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'artinama':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/artinama?nama=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const anm2 = `➸ Artinama : ${resp.data.result.hasil}`
                    geps.reply(from, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Artinama Error : ' + err)
                }
                break
            case prefix+'pasangan':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const nama = q.substring(0, q.indexOf('|') - 1)
                const pasangan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                fun.pasangan(nama, pasangan)
                    .then(async ({ result }) => {
                        await geps.reply(from, result.hasil, id)
                            .then(() => console.log('Success sending fortune!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'zodiac':
            case prefix+'zodiak':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await geps.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await geps.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'nulis':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating writing...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ffbanner': // By: VideFrelan
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating FF banner...')
                const teks1ffanjg = q.substring(0, q.indexOf('|') - 1)
                const teks2ffanjg = q.substring(q.lastIndexOf('|') + 2)
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/bannerff?title=${teks1ffanjg}&text=${teks2ffanjg}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case prefix+'caklontong': //By: VideFrelan
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, ind.wait(), id)
                fun.caklontong()
                .then(async ( { result }) => {
                    await geps.reply(from, `➸ *Soal*: ${result.soal}`, id)
                    geps.sendText(from, '30 Detik Tersisa...', id)
                    await sleeps(10000)
                    geps.sendText(from, '20 Detik Tersisa...', id)
                    await sleeps(10000)
                    geps.sendText(from, '10 Detik Tersisa...', id)
                    await sleeps(10000)
                    await geps.reply(from, `➸ *Jawaban*: ${result.jawaban}\n${result.desk}`, id)
                })
                .then(() => {
                    console.log('Sukses mengirim jawaban caklontong!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await geps.reply(from, 'Error!')
                })
            break
            case prefix+'fflogo': // By: VideFrelan
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return geps.reply(from, `Untuk membuat Logo Karakter Freefire\ngunakan ${prefix}fflogo karakter | teks\n\nContoh: ${prefix}fflogo Ridho | Come Homeeee`, id)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating FF logo...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case prefix+'':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isSimi) return geps.reply(from, 'command/Perintah Simi belum di aktifkan di group ini!', id)
                //if (ar.length === 1) return geps.reply(from, 'Kirim perintah *# [teks]*\nContoh : *# halo*', id)
                const que = body.slice(2)
                const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
                const sigot = sigo.data
                geps.reply(from, sigot.success, id)
                console.log(sigot)
                break
            case prefix+'simi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return geps.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (ar[0].toLowerCase() === 'enable') {
                    simi_.push(groupId)
                    fs.writeFileSync('./database/group/simih.json', JSON.stringify(simi_))
                    geps.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *# [teks]*\nContoh : *# halo*', id)
                } else if (ar[0].toLowerCase() === 'disable') {
                    simi_.splice(groupId, 1)
                    fs.writeFileSync('./database/group/simih.json', JSON.stringify(simi_))
                    geps.reply(from, 'Simsimi berhasil di nonaktifkan di group ini!', id)
                } else {
                    geps.reply(from, 'Pilih enable atau disable udin!', id)
                }
                break
            case prefix+'calender':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrli = await uploadImages(mediaData, false)
                    const imgnya = await calender(getUrli)
                    const calnder = imgnya.result.imgUrl
                    await geps.sendFileFromUrl(from, calnder)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrli = await uploadImages(mediaData, false)
                    const imgnya = await calender(getUrli)
                    const calnder = imgnya.result.imgUrl
                    await geps.sendFileFromUrl(from, calnder)
                } else {
                    await geps.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #calender`, id)
                }
                break
            case prefix+'neongreen': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const ajglah = args.join(' ')
                const puppeteer = require('puppeteer')
                if (!ajglah) return geps.reply(from, `Kirim perintah *${prefix}neongreen [text]*\n\nContoh : ${prefix}neongreen Alm. RidhoSenpai[BOT] Official`, id)
                geps.reply(from, ind.wait(), id)
        try {
            (async () => {
                const browser = await puppeteer.launch({
                    headless: true,
                });
                const page = await browser.newPage();
                await page
                    .goto("https://textpro.me/green-neon-text-effect-874.html", {
                        waitUntil: "networkidle2"
                    })
                    .then(async () => {
                        await page.type("#text-0", ajglah);
                        await page.click("#submit");
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        const element = await page.$(
                            'div[class="thumbnail"] > img'
                            );
                        const text = await (await element.getProperty("src")).jsonValue();
                        geps.sendFileFromUrl(from, text, id)
                        browser.close();
        
                    })
                    .catch((err => {
                        console.log(err)
                        geps.reply(from, 'error', id)
                        }))
                        })();
                        } catch (error) {
                        console.log('error bang')
                        geps.reply(from, 'error', id)
                        }
                    }
                    break
            case prefix+'neonblue': {
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const ajglahh = args.join(' ')
                const puppeteer = require('puppeteer')
                if (!ajglahh) return geps.reply(from, `Kirim perintah *${prefix}neonblue [text]*\n\nContoh : ${prefix}neonblue Alm. RidhoSenpai[BOT] Official`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/neon-light-text-effect-online-882.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", ajglahh);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const texts = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(from, texts, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'glitchtext':
            case prefix+'glitext':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const teks1 = q.substring(0, q.indexOf('|') - 1)
                const teks2 = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating glitch text...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${teks1}&text2=${teks2}&apikey=${config.vhtear}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'phmaker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating Pornhub text...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/pornlogo?text1=${kiri}&text2=${kanan}&apikey=${config.vhtear}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'blackpink':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating Blackpink text...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'galaxy':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating galaxy text...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/galaxytext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tod':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                await geps.reply(from, 'Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.' , id)
                await geps.sendText(from, `Silakan ketik *${prefix}truth* atau *${prefix}dare*`)
            break
            case prefix+'weton':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const tgl = q.substring(0, q.indexOf('|') - 1)
                const bln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thn = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                fun.weton(tgl, bln, thn)
                    .then(async ({ result }) => {
                        await geps.reply(from, result.hasil, id)
                        console.log('Success sending weton info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'truth':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fun.truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await geps.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'dare':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fun.dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await geps.reply(from, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'triggered':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, 'Akokawokoaw', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'wasted':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await geps.reply(from, ind.wait(), id)
                    //await geps.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Ini..., sticker nya lagi di kirim', id)
                    //.then(() => 
                    .then(async (body) => {
                    await geps.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`)
                    console.log('Success Wasted Sticker')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
                } else {
                    await geps.reply(from, `Format salah! Silahkan kirim gambar dengan caption${prefix}wasted atau reply gambar dengan caption ${prefix}wasted`, id)
                }
                break
                case prefix+'jadwalbola':
                    if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                    geps.reply(from, ind.wait(), id)
                    try {
                        const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${config.vhtearkey}`)
                        if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
                        const jdbola2 = await jdbola.json()
                        const { data } = await jdbola2.result
                        let xixixi = `*「 JADWAL BOLA 」*\n\n`
                        for (let i = 0; i < data.length; i++) {
                            xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}\n`
                        }
                        await geps.sendText(from, xixixi, id)
                    } catch (err) {
                            console.log(err)
                            await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
                            geps.sendText(ownerNumber, 'Jadwal Bola Error : ' + err)
                    }
                    break
            case prefix+'kiss':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(message, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await geps.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        const ppSecond = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (ppRaw === undefined) {
                            var ppFirsts = errorImg
                        } else {
                            ppFirsts = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirsts, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await geps.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await geps.reply(from, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'phcomment':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await geps.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await geps.reply(from, ind.wait(), id)
                const preproccessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await geps.sendFileFromUrl(from, preproccessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case prefix+'readmore':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const rawReadMore = `a


​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​b`
                const pertama = q.substring(0, q.indexOf('|') - 1)
                const kedua = q.substring(q.lastIndexOf('|') + 2)
                const formatted1 = rawReadMore.replace('a', pertama)
                const formatted2 = formatted1.replace('b', kedua)
                await geps.sendText(from, formatted2)
            break
            case prefix+'firemaker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/fire_maker?text=${q}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'mlmaker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const namaHero = q.substring(0, q.indexOf('|') - 1)
                const teksMl = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/logoml?hero=${namaHero}&text=${teksMl}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'balloonmaker':
            case prefix+'blmaker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const namaKiri = q.substring(0, q.indexOf('|') - 1)
                const namaKanan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/balloonmaker?text1=${namaKiri}&text2=${namaKanan}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break

            // Sticker
            case prefix+'stickerwm': // By Slavyan
            case prefix+'stcwm':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                //if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `stc_${sender.id}`)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/stc_${sender.id}.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stc_${sender.id}.exif`)
                                    }
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                    } else {
                        await geps.reply(from, ind.wrongFormat(), id)
                    }
            break
            case prefix+'stickermeme':
            case prefix+'stcmeme':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getUrl}`
                    const meme = await bent('buffer')(create)
                    webp.buffer2webpbuffer(meme, 'png', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return await geps.reply(from, `Pastikan data sudah benar!`, id)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'takestick': // By: VideFrelan
            case prefix+'take':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    const mediaDataTake = await decryptMedia(quotedMsg, uaOverride)
                    await geps.reply(from, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `takestick_${sender.id}`)
                    webp.buffer2webpbuffer(mediaDataTake, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/takestickstage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/takestick_${sender.id}.exif ./temp/takestickstage_${sender.id}.webp -o ./temp/takestick_${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/takestick_${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/takestick_${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestickstage_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.exif`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'stickerp':
            case prefix+'stikerp':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                //if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'contain',
                                    background: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        alpha: 0							
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                   await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'circlesticker':
            case prefix+'circlestiker':
            case prefix+'cs':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                //if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'sharp.fit.contain',
                                    background: {
                                        r: 0,
                                        g: 0,
                                        b: 0,
                                        alpha: 0							
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                   await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'ttps':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const ttp2t = body.slice(6)
                if (!ttp2t) return await geps.reply(from, `Kirim perintah ${prefix}ttps [teks]\nContoh : ${prefix}ttps halo`, id)
                const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
                const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
                await geps.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${config.vhtear}`)
                break
            case prefix+'stickergif':
            case prefix+'stikergif':
            case prefix+'sgif':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendMp4AsSticker(from, videoBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await geps.sendText(from, ind.ok())
                            })
                    } catch (err) {
                        //console.error(err)
                        await geps.reply(from, ind.videoLimit(), id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendMp4AsSticker(from, videoBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                            })
                    } catch (err) {
                        //console.error(err)
                        await geps.reply(from, ind.videoLimit(), id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'ttg':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                await geps.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${q}&apikey=${config.vhtear}`)
                    .then(() => console.log('Success creating GIF!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'stickertoimg':
            case prefix+'stikertoimg':
            case prefix+'toimg':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isQuotedSticker) {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'emojisticker':
            case prefix+'emojistiker':
            case prefix+'esticker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return geps.reply(from, ind.wrongFormat(), id)
                const emoji = emojiUnicode(args[0])
                await geps.reply(from, ind.wait(), id)
                console.log('Creating emoji code for =>', emoji)
                await geps.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`)
                    .then(async () => {
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Emoji not supported!', id)
                    })
            break

            // NSFW
            case prefix+'lewds':
            case prefix+'lewd':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                } else {
                    await geps.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                }
            break
            case prefix+'fetish':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (ar.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await geps.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, err, id)
                    }
                } else {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await geps.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'nhentai':
            case prefix+'nh':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await geps.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                    return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await geps.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        }
                    } else {
                        await geps.reply(from, ind.nhFalse(), id)
                    }
                } else {
                    await geps.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                    return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await geps.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        }
                    } else {
                        await geps.reply(from, ind.nhFalse(), id)
                    }
                }
                break
                case prefix+'nhdl':
                    if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                    if (isGroupMsg) {
                        if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                        await geps.reply(from, ind.wait(), id)
                        const kode = args[0]
                        const validate = await nhentai.exists(kode)
                        if (validate === true) {
                            try {
                                const dojin = await nhentai.getDoujin(kode)
                                const { title } = dojin
                                await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                                await geps.sendFile(from, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                                fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                            } catch (err) {
                                console.error(err)
                                await geps.reply(from, 'Error!', id)
                            }
                        } else {
                            await geps.reply(from, ind.nhFalse(), id)
                        }
                    } else {
                        await geps.reply(from, ind.wait(), id)
                        const kode = args[0]
                        const validate = await nhentai.exists(kode)
                        if (validate === true) {
                            try {
                                const dojin = await nhentai.getDoujin(kode)
                                const { title } = dojin
                                await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                                await geps.sendFile(from, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                                fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                            } catch (err) {
                                console.error(err)
                                await geps.reply(from, 'Error!', id)
                            }
                        } else {
                            await geps.reply(from, ind.nhFalse(), id)
                        }
                    }
                break
            case prefix+'nhsearch':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await geps.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                } else {
                    await geps.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await geps.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async(err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                }
            break
            case prefix+'jadian':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                const groupMemek = await geps.getGroupMembers(groupId)
                const mem = groupMemek
                const aku = mem[Math.floor(Math.random() * mem.length)];
                const kamu = mem[Math.floor(Math.random() * mem.length)];
                const sapa = `Cieee... @${aku.id.replace(/@c.us/g, '')} 💘 @${kamu.id.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
                await geps.sendTextWithMentions(from, sapa, id)
                break
            case prefix+'nekopoi':
            case prefix+'nekopoilast':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '-----[ *NEKOPOI LATEST* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                } else {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '-----[ *NEKOPOI LATEST* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'randomhentai':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return geps.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const hentai = await axios.get(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`)
                const henta = hentai.data
                if (henta.result.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                geps.reply(from, ind.wait(), id)
                geps.sendImage(from, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
                break
            case prefix+'randomnsfwneko':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return geps.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA')
                const nsfwn = nsfwneko.data
                if (nsfwn.result.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                geps.reply(from, ind.wait(), id)
                geps.sendImage(from, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
                break
            case prefix+'randomtrapnime':
            case prefix+'randomtrapanime':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return geps.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=BotWeA')
                const trapn = trapnime.data
                if (trapn.result.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                geps.reply(from, ind.wait(), id)
                geps.sendImage(from, trapn.result, `trapnime${ext}`, '*Trapnime!*', id)
                break
            case prefix+'randomblowjob':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isNsfw) return geps.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA')
                const rblow = sblow.data
                geps.reply(from, ind.wait(), id)
                geps.sendFileFromUrl(from, rblow.result, `RandoBlow${ext}`, '*Random Blowjob!*', id)
                break
            case prefix+'hug':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const janjing = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                geps.sendTextWithMentions(from, `${prefix}` + janjing + ' *peyuuuk* ' + q)
                break
            case prefix+'slap':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const person = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
                geps.sendTextWithMentions(from, '@' + person + ' *slapped* ' + q)
                break
            case prefix+'pat':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const jartod = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                geps.sendTextWithMentions(from, jartod + ' *👈 Si Mengelu-elus si👉* ' + q)
                break
            case prefix+'randomhug':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug?apikey=BotWeA')
                const rhug = shug.data
                geps.sendFileFromUrl(from, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
                break
            case prefix+'randomcry':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA')
                const rcry = scry.data
                geps.sendFileFromUrl(from, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
                break
            case prefix+'randomkiss':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA')
                const rkiss = skiss.data
                geps.sendFileFromUrl(from, rkiss.result, `RandomKiss${ext}`, 'Random Kiss!', id)
                break
            case prefix+'nekosearch':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                } else {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'waifu18':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(from, url, 'waifu.png', '*Waifu 18+*', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                } else {
                    await geps.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(from, url, 'waifu.png', '*Waifu 18+*', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                }
            break
            case prefix+'phdl':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await geps.reply(from, ind.wrongFormat(), id)
                    await geps.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await geps.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await geps.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                } else {
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await geps.reply(from, ind.wrongFormat(), id)
                    await geps.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await geps.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await geps.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'yuri':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    await geps.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '*Yuri!*', id)
                } else {
                    await geps.reply(from, ind.wait(), id)
                    await geps.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '*Yuri!*', id)
                }
            break
            case prefix+'lewdavatar':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    await geps.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '*Lewdavatar!*', id)
                } else {
                    await geps.reply(from, ind.wait(), id)
                    await geps.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '*Lewdavatar!*', id)
                }
            break
            case prefix+'ava':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa diugnakan di dalam grup', id)
                if (!quotedMsg) return geps.reply(from, 'Quote/reply pesan seseorang yang akan di download fotonya!!', id)
                try {
                    const dp = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                    if (dp == undefined) {
                        var pfp = geps.reply(from, 'Dia ini pemalu, mungkin sedang depresi tidak berani memasang foto profil', id)
                    } else {
                        var pfp = geps.sendFileFromUrl(from, dp, 'profile.png', 'Nih bro', id)
                    }
                } catch {
                    geps.reply(from, 'Tidak ada foto profil/private', id)
                }
                break
            case prefix+'setgroupname':
            case prefix+'setgrupname':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
                if (!isGroupAdmins) return geps.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                if (!isBotGroupAdmins) return geps.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                const namagrup = body.slice(13)
                let sebelum = chat.groupMetadata.formattedName
                let halaman = global.page ? global.page : await geps.getPage()
                await halaman.evaluate((chatId, subject) =>
                    Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
                geps.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us', '')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                break
            case prefix+'femdom':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(from, ind.notNsfw(), id)
                    await geps.reply(from, ind.wait(), id)
                    await geps.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '*Femdom!*', id)
                } else {
                    await geps.reply(from, ind.wait(), id)
                    await geps.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '*Femdom!*', id)
                }
            break

            // Moderation command
            case prefix+'add':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    await geps.addParticipant(from, `${args[0]}@c.us`)
                    await geps.sendText(from, '🎉 Welcome! 🎉')
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'kick':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await geps.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.sendTextWithMentions(from, `Good bye~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await geps.sendText(from, ind.wrongFormat())
                    await geps.removeParticipant(groupId, i)
                }
            break
            case prefix+'promote':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await geps.reply(from, ind.adminAlready(), id)
                await geps.promoteParticipant(groupId, mentionedJidList[0])
                await geps.reply(from, ind.ok(), id)
            break
            case prefix+'tagall':
            case prefix+'mentionall':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return geps.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem = await geps.getGroupMembers(groupId)
                let hehe = '┌──「 *Mention All* 」\n│\n'
                for (let i = 0; i < groupMem.length; i++) {
                    hehe += '├> '
                    hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                }
                hehe += '│\n└──「 *Alm. RidhoSenpai[BOT]* 」'
                await sleeps(2000)
                await geps.sendTextWithMentions(from, hehe)
                break
            case prefix+'family100':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/family100&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
                    const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
                    geps.reply(from, anm2, id)
                    geps.sendText(from, `30 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(from, `20 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(from, `10 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.reply(from, jwban, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, Soal Quiz tidak ditemukan')
                    geps.sendText(ownerNumber, 'Family100 Error : ' + err)
                }
                break
            case prefix+'adminlist':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                let mimin = ''
                for (let admon of groupAdmins) {
                    mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                }
                await sleeps(2000)
                await geps.sendTextWithMentions(from, mimin)
                break
            case prefix+'ownergroup':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const Owner_ = chat.groupMetadata.owner
                await geps.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
                break
            case prefix+'demote':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await geps.reply(from, ind.notAdmin(), id)
                await geps.demoteParticipant(groupId, mentionedJidList[0])
                await geps.reply(from, ind.ok(), id)
            break
            case prefix+'leave':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                await geps.sendText(from, 'Sayounara~ 👋')
                await geps.leaveGroup(groupId)
            break	
            case prefix+'groupicon':
            case prefix+'setgroupicon':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return geps.reply(from, ind.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setGroupIcon(groupId, imageBase64)
                    await geps.sendText(from, ind.ok())
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'antilink':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await geps.reply(from, ind.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await geps.reply(from, ind.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await geps.reply(from, ind.detectorOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'leveling':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await geps.reply(from, ind.levelingOnAlready(), id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await geps.reply(from, ind.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await geps.reply(from, ind.levelingOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'balance':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, "Fitur ini hanya bisa digunakan didalam Grup!", id)
                if (!isGroupAdmins) return await geps.reply(from, "Hanya admin yang bisa mengaktifkan fitur ini!", id)
                if (ar[0] === 'enable') {
                    if (isBalanceOn) return await geps.reply(from, "Fitur Ini sudah diaktifkan sebelumnya", id)
                    _balance.push(groupId)
                    fs.writeFileSync('./database/group/balance.json', JSON.stringify(_balance))
                    await geps.reply(from, "「 *FITUR BALANCE ENABLE!* 」\n\nKlean akan mendapatkan balance jika tidak menjadi seorang sider:v", id)
                } else if (ar[0] === 'disable') {
                    _balance.splice(groupId, 1)
                    fs.writeFileSync('./database/group/balance.json', JSON.stringify(_balance))
                    await geps.reply(from, `「 *FITUR BALANCE DISABLE!* 」\n\nFitur balance dimatikan oleh admin ${pushname}!`, id)
                } else {
                    await geps.reply(from, "Pilih enable atau disable cantik:v", id)
                }
            break
            case prefix+'sider':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!quotedMsg) return geps.reply(from, `Tolong Reply Pesan Bot Alm. RidhoSenpai[BOT]`, id)
                if (!quotedMsgObj.fromMe) return geps.reply(from, `Tolong Reply Pesan Bot Alm. RidhoSenpai[BOT] Ya...`, id)
                try {
                    const reader = await geps.getMessageReaders(quotedMsgObj.id)
                    let list = ''
                    for (let pembaca of reader) {
                        list += `- @${pembaca.id.replace(/@c.us/g, '')}\n`
                    }
                    geps.sendTextWithMentions(from, `Ciee, Ngeread...\n${list}`)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Bot Alm. RidhoSenpai[BOT] atau Mereka Menonaktifkan Read Receipts`, id)
                }
                break
            case prefix+'linkgroup':
            case prefix+'linkgrup':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
                if (!isGroupAdmins) return geps.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                if (!isBotGroupAdmins) return geps.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                const namagcnye = chat.formattedTitle
                var gclink = await geps.getGroupInviteLink(groupId)
                var linkgc = `Link group : *${namagcnye}*\n\n ${gclink}`
                geps.reply(from, linkgc, id)
                break
            case prefix+'resetlinkgrup':
            case prefix+'setlink':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
                if (!isGroupAdmins) return geps.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                if (!isBotGroupAdmins) return geps.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                if (isGroupMsg) {
                    await geps.revokeGroupInviteLink(groupId);
                    geps.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
                }
                break
            case prefix+'welcome':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isWelcomeOn) return await geps.reply(from, ind.welcomeOnAlready(), id)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await geps.reply(from, ind.welcomeOn(), id)
                } else if (ar[0] === 'disable') {
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await geps.reply(from, ind.welcomeOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'autosticker':
            case prefix+'autostiker':
            case prefix+'autostik':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAutoStickerOn) return await geps.reply(from, ind.autoStikOnAlready(), id)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await geps.reply(from, ind.autoStikOn(), id)
                } else if (ar[0] === 'disable') {
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await geps.reply(from, ind.autoStikOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'antinsfw':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await geps.reply(from, ind.antiNsfwOnAlready(), id)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await geps.reply(from, ind.antiNsfwOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await geps.reply(from, ind.antiNsfwOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'moddroid':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const moddroid = await axios.get(`https://tobz-api.herokuapp.com/api/moddroid?q=${q}&apikey=BotWeA`)
                    if (moddroid.data.error) return geps.reply(from, moddroid.data.error, id)
                    const modo = moddroid.data.result[0]
                    const resmod = `• *Title* : ${modo.title}\n• *Publisher* : ${modo.publisher}\n• *Size* : ${modo.size}\n• *MOD Info* : ${modo.mod_info}\n• *Version* : ${modo.latest_version}\n• *Genre* : ${modo.genre}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                    geps.sendFileFromUrl(from, modo.image, 'MODDROID.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'tebakgambar':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/tebakgambar&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
                    geps.sendFileFromUrl(from, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
                    geps.sendText(from, `30 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(from, `20 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(from, `10 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.reply(from, jwban, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                    geps.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
                }
                break
            case prefix+'heroml':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/herodetail?query=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}`
                    geps.sendFileFromUrl(from, resp.data.result.pictHero, 'hero.jpg', anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                    geps.sendText(ownerNumber, 'Heroml Error : ' + err)
                }
                break
            case prefix+'runtime':
                function format(seconds) {
                    function pad(s) {
                        return (s < 10 ? '0' : '') + s;
                    }
                    var hours = Math.floor(seconds / (60 * 60));
                    var minutes = Math.floor(seconds % (60 * 60) / 60);
                    var seconds = Math.floor(seconds % 60);

                    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
                }

                var uptime = process.uptime();
                geps.reply(from, `Bot telah berjalan selama ${format(uptime)}`, id)
                break
            case prefix+'infoloker':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const loker = await axios.get(`https://docs-jojo.herokuapp.com/api/infoloker`)
                    const loker2 = await loker.data
                    let lokerr = `*「 INFO LOKER 」*\n\n`
                    for (let i = 0; i < loker2.result.length; i++) {
                        lokerr += `\n─────────────────\n\n*Profesi* : ${loker2.result[i].profesi}\n*Deskripsi* : ${loker2.result[i].desc}\n*Edukasi* : ${loker2.result[i].edukasi}\n*Gaji* : ${loker2.result[i].gaji}\n*Job Function* : ${loker2.result[i].jobFunction}\n*Level Karir* : ${loker2.result[i].levelKarir}\n*Link* : ${loker2.result[i].link}\n*Lokasi* : ${loker2.result[i].lokasi}\n*Pengalaman* : ${loker2.result[i].pengalaman}\n*Perusahaan* : ${loker2.result[i].perusahaan}\n*Syarat* : ${loker2.result[i].syarat}`
                    }
                    await geps.reply(from, lokerr, id)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, Loker tidak ditemukan', id)
                    geps.sendText(ownerNumber, 'Loker Error : ' + err)
                }
                break
            /*case prefix+'pastebin': //BY VINZ
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const pastebinbro = body.slice(10)
                const pastesplit = pastebinbro.split('|')[0]
                geps.reply(from, ind.wait(), id)
                //var bdtrm = body.slice(10).trim().split('|')
                const pstbn = await axios.get(`http://api.zeks.xyz/api/pastebin?apikey=benbenz&text=${pastebinbro}&name=${pastesplit}`)
                console.log(bdtrm[0])
                if (pstbn.data.status == false) return geps.reply(from, pstbn.data.message, id)
                await geps.reply(from, pstbn.data.result, id)
                break*/
            case prefix+'samehadaku':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const animee = await axios.get(`https://docs-jojo.herokuapp.com/api/samehadaku?q=${q}`)
                const xaxaxa = `➸ *Judul* : ${animee.data.title}\n➸ *Deskripsi* : ${animee.data.desc}\n➸ *Link* : ${animee.data.link}`
                geps.reply(from, ind.wait(), id)
                geps.sendFileFromUrl(from, animee.data.thumb, 'thumb.jpg', xaxaxa, id)
                break
            case prefix+'renungan':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const renung = await axios.get('https://docs-jojo.herokuapp.com/api/renungan')
                geps.reply(from, `➸ *Judul* : ${renung.data.judul}\n➸ *Isi* : ${renung.data.Isi}\n➸ *Pesan* : ${renung.data.pesan}`, id)
                break
            case prefix+'mediafire':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const firem = await axios.get(`https://docs-jojo.herokuapp.com/api/mediafire?url=${q}`)
                geps.reply(from, ind.wait(), id)
                geps.reply(from, `➸ *Filename* : ${firem.data.filename}\n➸ *Deskripsi* : ${firem.data.desc}\n➸ *Filetype* : ${firem.data.filetype}\n➸ *Filesize* : ${firem.data.filesize}\n➸ *diupload pada* : ${firem.data.uploaded}`, id)
                ///geps.sendFileFromUrl(from, firem.data.url, firem.data.filename, 'Nih')
                break
            case prefix+'alkitabharian':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const alkitab = await axios.get(`https://docs-jojo.herokuapp.com/api/alkitab`)
                geps.sendFileFromUrl(from, alkitab.data.result.img,'alkitab.jpg',`➸ *Ayat* : ${alkitab.data.result.ayat}\n➸ *Isi* : ${alkitab.data.result.isi}\n➸ *Link* : ${alkitab.data.result.link}`,id)
                break
            case prefix+'cersex':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const cersex = await axios.get(`https://api.vhtear.com/cerita_sex&apikey=${config.vhtear}`)
                const cersexx = `Judul : ${cersex.data.result.judul}\nCerita : ${cersex.data.result.cerita}`
                geps.sendFileFromUrl(from, cersex.data.result.image, 'cersex.jpg', cersexx, id)
                break
            case prefix+'grayscale':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const grayscale = body.slice(11)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.greyscale(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(from, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })
                    } else if (grayscale == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.greyscale(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(from, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })

                    } else {
                        var texnugmm = body.slice(11)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.greyscale(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(from, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'beautiful':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const beautiful = body.slice(11)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.beautiful(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(from, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })
                    } else if (beautiful == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.beautiful(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(from, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })

                    } else {
                        var texnugmm = body.slice(11)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.beautiful(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(from, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'blur':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const blur = body.slice(6)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.blur(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(from, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })
                    } else if (blur == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.blur(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(from, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })

                    } else {
                        var texnugmm = body.slice(6)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.blur(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(from, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'invert':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const invert = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.invert(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(from, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })
                    } else if (invert == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.invert(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(from, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.invert(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(from, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'jokeoverhead':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const jookOverHead = body.slice(14)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.jokeOverHead(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(from, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })
                    } else if (jookOverHead == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.jokeOverHead(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(from, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })

                    } else {
                        var texnugmm = body.slice(14)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.jokeOverHead(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(from, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'hitler':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const hitler = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.hitler(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    } else if (hitler == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.hitler(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.hitler(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'pacefalm':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const facepalm = body.slice(10)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.facepalm(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(from, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })
                    } else if (facepalm == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.facepalm(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(from, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })

                    } else {
                        var texnugmm = body.slice(10)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.facepalm(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(from, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'circle':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const circle = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.circle(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(from, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })
                    } else if (circle == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.circle(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(from, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.circle(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(from, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'opinion':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const opinion = body.slice(9)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.opinion(ppRawww, opinion)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_opinion.png`)
                                await geps.sendFile(from, `${sender.id}_opinion.png`, `${sender.id}_opinion.png`, '', id)
                                fs.unlinkSync(`${sender.id}_opinion.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'fuse':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)
                var ppRaww = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                var getnomberr = await geps.checkNumberStatus(texnugmm)
                var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                var imagee = await geps.getProfilePicFromServer(useriqq)

                canvas.Canvas.fuse(ppRaww, imagee)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_fuse.png`)
                        await geps.sendFile(from, `${sender.id}_fuse.png`, `${sender.id}_fuse.png`, '', id)
                        fs.unlinkSync(`${sender.id}_fuse.png`)
                    })
                break
            case prefix+'ohno':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)

                canvas.Canvas.ohno(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_ohno.png`)
                        await geps.sendFile(from, `${sender.id}_ohno.png`, `${sender.id}_ohno.png`, '', id)
                        fs.unlinkSync(`${sender.id}_ohno.png`)
                    })
                break
            case prefix+'clyde':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)

                canvas.Canvas.clyde(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_clyde.png`)
                        await geps.sendFile(from, `${sender.id}_clyde.png`, `${sender.id}_clyde.png`, '', id)
                        fs.unlinkSync(`${sender.id}_clyde.png`)
                    })
                break
            case prefix+'changemymind':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(14)

                canvas.Canvas.changemymind(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_changemymind.png`)
                        await geps.sendFile(from, `${sender.id}_changemymind.png`, `${sender.id}_changemymind.png`, '', id)
                        fs.unlinkSync(`${sender.id}_changemymind.png`)
                    })
                break
            case prefix+'randompuisi':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                geps.sendFileFromUrl(from, `https://api.vhtear.com/puisi_image&apikey=${config.vhtear}`, 'puisi.jpg', `Nih`, id)
                break
            case prefix+'burn':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)
                if (isMedia && isImage || isQuotedImage) {
                    var encryptMedia = isQuotedImage ? quotedMsg : message
                    var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                    canvas.Canvas.burn(ppRawww, texnugmm)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_burn.png`)
                            await geps.sendFile(from, `${sender.id}_burn.png`, `${sender.id}_burn.png`, '', id)
                            fs.unlinkSync(`${sender.id}_burn.png`)
                        })
                }
                break
            case prefix+'sepia':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const sepia = body.slice(7)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.sepia(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(from, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })
                    } else if (sepia == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.sepia(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(from, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })

                    } else {
                        var texnugmm = body.slice(7)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.sepia(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(from, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'shit':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const shit = body.slice(6)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.shit(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(from, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })
                    } else if (shit == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.shit(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(from, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })

                    } else {
                        var texnugmm = body.slice(6)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.shit(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(from, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'rainbow':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const rainboww = body.slice(9)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.rainbow(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(from, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })
                    } else if (rainboww == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.rainbow(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(from, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })

                    } else {
                        var texnugmm = body.slice(9)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.rainbow(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(from, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'rip':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const ripp = body.slice(5)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.rip(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(from, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })
                    } else if (ripp == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.rip(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(from, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })

                    } else {
                        var texnugmm = body.slice(5)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.rip(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(from, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'wanted':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const wantedd = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRaww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.wanted(ppRaww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })
                    } else if (wantedd == "me") {
                        var ppRaww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.wanted(ppRaww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnck = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.wanted(jnck)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'cekwatak':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                var namao = pushname
                var prfx = await geps.getProfilePicFromServer(sender)
                const wtk = watak[Math.floor(Math.random() * (watak.length))]
                const akhlak = ratenyaasu[Math.floor(Math.random() * (ratenyaasu.length))]
                const sft = sifat[Math.floor(Math.random() * (sifat.length))]
                const hby = hobby[Math.floor(Math.random() * (hobby.length))]
                const klbh = kelebihan[Math.floor(Math.random() * (kelebihan.length))]
                const typo = tipe[Math.floor(Math.random() * (tipe.length))]
                await geps.reply(from, `[ INTROGASI SUKSES ]\n\n*[Nama]:${namao}\n\n[Watak]:${wtk}\n\n[Akhlak✨]:${akhlak}\n\n[Sifat]:${sft}\n\n[Hobby]:${hby}\n\n[Tipe]:${typo}\n\n[Kelebihan]:${klbh}\n\n*Note\n\n_ini hanya main main_`, id)
                break
            case prefix+'nye':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const jancuk7 = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, `https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif`)
                geps.sendTextWithMentions(from, '@' + jancuk7 + ' *nye nye* ' + q)
                break
            case prefix+'bucin':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/beniismael/whatsapp-bot/master/bucin.txt')
                    .then(res => res.text())
                    .then(body => {
                        let splitcinta = body.split('\n')
                        let randomcinta = splitcinta[Math.floor(Math.random() * splitcinta.length)]
                        geps.reply(from, randomcinta, id)
                    })
                    .catch(() => {
                        geps.reply(from, `Ada yang Error!`, id)
                    })
                break
            case prefix+'gplaybutton':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, ind.wait(), id)
                const gplay = await axios.get(`http://api.zeks.xyz/api/gplaybutton?text=${q}&apikey=apivinz`)
                geps.sendFileFromUrl(from, gplay.data.result, 'gplay.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'nhentaipdf':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const lnuklir = await axios.get(`https://api.vhtear.com/nhentaipdfdownload?query=${q}&apikey=${config.vhtear}`)
                geps.reply(from, `➸ *Title* : ${lnuklir.data.result.title}\n➸ *Secondary Title* : ${lnuklir.data.result.secondary_title}\n\nTunggu sebentar...\nFile PDF sedang dikirim`, id)
                geps.sendFileFromUrl(from, lnuklir.data.result.pdf_file, `${lnuklir.data.result.title}.pdf`, 'Nih.....', id)
                break
            case prefix+'gcbanall': // Credit By ./NotF0und
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa digunakan dalam group!`, id)
                if (!isOwner) return geps.reply(from, `Perintah ini hanya untuk Owner Bot!`, id)
                const bMem = await geps.getGroupMembers(groupId)
                const groupnamae = name
                let banal = `Banned All Members~!\n*Group :* ${groupnamae}\n\n`
                for (let i = 0; i < bMem.length; i++) {
                    banal += '• '
                    banal += ` @${bMem[i].id.replace(/@c.us/g, '')}\n`
                    banned.push(bMem[i].id)
                    fs.writeFileSync('./database/user/banned.json', JSON.stringify(banned))
                }
                banal += `\nBanned : 365 days!`
                await sleeps(2000)
                await geps.sendTextWithMentions(from, banal)
                break
            case prefix+'splaybutton':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, ind.wait(), id)
                const splay = await axios.get(` http://api.zeks.xyz/api/splaybutton?text=${q}&apikey=apivinz`)
                geps.sendFileFromUrl(from, splay.data.result, 'splay.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'cmd':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.sendFileFromUrl(from, `https://carbonnowsh.herokuapp.com/?code=${q}&theme=darcula&backgroundColor=rgba(144, 19, 254, 100)`, 'carbon.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'happymod':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const happymod = await axios.get(`https://tobz-api.herokuapp.com/api/happymod?q=${q}&apikey=BotWeA`)
                    if (happymod.data.error) return geps.reply(from, happymod.data.error, id)
                    const modo = happymod.data.result[0]
                    const resmod = `• *Title* : ${modo.title}\n• *Purchase* : ${modo.purchase}\n• *Size* : ${modo.size}\n• *Root* : ${modo.root}\n• *Version* : ${modo.version}\n• *Price* : ${modo.price}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                    geps.sendFileFromUrl(from, modo.image, 'HAPPYMOD.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                }
                break
            // Owner command
            case prefix+'info':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                const urlinfo = 'https://e.top4top.io/p_18060fxr71.jpg'
                await geps.sendFileFromUrl(from, `${urlinfo}`,'bc.jpg', `\n┌──「 *INFORMATION* 」
│ 
├ *BOT TYPE* : NodeJS V14
├ *NAME* : Alm. RidhoSenpai[BOT]
├ *VERSION* : 6.0 (edited)
├ *INSTAGRAM* : @hide_fact
├ *YOSUTUBE* : -
├ *Website* : https://ridhosenpai.my.id
├ *Blog* : https://wibucyber88.blogspot.com
├ *TEAM* : SenpaiSquad
│
├─「 *𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊* 」
│
├ *ALLAH SWT*
├ AgunnSenpai *(Special)*
├ RahmanSenpai
├ RidhoSenpai-Sama
├ ALL Member SenpaiSquad
│
└──「 *Alm. RidhoSenpai[BOT]* 」`, id)
                break
            case prefix+'bc':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya untuk Owner Alm. RidhoSenpai[BOT]`, id)
                bctxt = body.slice(4)
                txtbc = `「 *Alm. RidhoSenpai[BOT] BroadCast* 」\n${bctxt}`
                const semuagrup = await geps.getAllChatIds();
                if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for (let grupnya of semuagrup) {
                        var cekgrup = await geps.getChatById(grupnya)
                        if (!cekgrup.isReadOnly)
                            geps.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    geps.reply(from, 'Broadcast sukses!', id)
                } else {
                    for (let grupnya of semuagrup) {
                        var cekgrup = await geps.getChatById(grupnya)
                        if (!cekgrup.isReadOnly && isMuted(grupnya))
                            geps.sendText(grupnya, txtbc)
                    }
                    geps.reply(from, 'Broadcast Success!', id)
                }
                break
            case prefix+'clearall':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                const allChats = await geps.getAllChats()
                for (let delChats of allChats) {
                    await geps.deleteChat(delChats.id)
                }
                await geps.reply(from, ind.doneOwner(), id)
            break
            case prefix+'leaveall':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.emptyMess(), id)
                const allGroup = await geps.getAllGroups()
                for (let gclist of allGroup) {
                    await geps.sendText(gclist.contact.id, q)
                    await geps.leaveGroup(gclist.contact.id)
                }
                await geps.reply(from, ind.doneOwner())
            break
            case prefix+'getses':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                const ses = await geps.getSnapshot()
                await geps.sendFile(from, ses, 'session.png', ind.doneOwner())
            break
            case prefix+'kickreply':
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa digunakan didalam grup!', id)
                if (!isGroupAdmins) return geps.reply(from, 'Yahaha Gabisa LU bukan Admin Goblok!', id)
                if (!isBotGroupAdmins) return geps.reply(from, 'Gua bukan admin njer :<', id)
                if (quotedMsg) {
                var qmid = quotedMsgObj.sender.id
                await geps.removeParticipant(groupId, qmid)
                await geps.sendTextWithMentions(from, `TUSBOL @${qmid.replace('@c.us', '')}`, id)
                 }
                if(mentionedJidList.length === 0) return geps.reply(from, `...`, message.id)
                await geps.sendText(from, `Request Accepted! issued:\n${mentionedJidList.join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await geps.reply(from, '....', message.id)
                    await geps.removeParticipant(groupId, mentionedJidList[i])
                    await geps.sendTextWithMentions(from, `TUSBOL @${mentionedJidList[i].replace('@c.us', '')}`, id)
                }
                break
            case prefix+'edotensei':
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!isBotGroupAdmins) return geps.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return geps.reply(from, 'Fitur untuk menghapus member lalu menambahkan member kembali, kirim perintah *#edotensei @tagmember*', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return geps.reply(from, mess.error.Ki, id)
                if (ownerNumber.includes(mentionedJidList[i])) return geps.reply(from, mess.error.Ki, id)
                await geps.removeParticipant(groupId, mentionedJidList[i])
                await sleeps(3000)
                await geps.addParticipant(from,`${mentionedJidList}`)
                } 
                break
            case prefix+'ban':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await geps.reply(from, ind.doneOwner(), id)
                    } else {
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(from, ind.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(from, ind.doneOwner(), id)
                    } else{
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'block':
                if (!isOwner) return geps.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    let unblock = `${mentionedJidList[i]}`
                    await geps.contactBlock(unblock).then((a) => {
                        console.log(a)
                        geps.reply(from, `Success block ${args[1]}!`, id)
                    })
                }
                break
            case prefix+'restart': // WORK IF YOU RUN USING PM2
                if (!isOwner) return geps.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!', id)
                    geps.sendText(from, '*Perhatian* Bot di restart')
                    setting.restartState = true
                    setting.restartId = chatId
                    var obj = []
                    //fs.writeFileSync('./lib/setting.json', JSON.stringify(obj, null,2));
                    fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                    const spawn = require('child_process').exec;
                    function os_func() {
                        this.execCommand = function (command) {
                            return new Promise((resolve, reject) => {
                                spawn(command, (error, stdout) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(stdout)
                                });
                            })
                        }
                    }
                    var oz = new os_func();
                    oz.execCommand('pm2 restart index').then(() => {
                    }).catch(err => {
                        console.log("os >>>", err);
                    })
                break
            case prefix+'unblock':
                if (!isOwner) return geps.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    let unblock = `${mentionedJidList[i]}`
                    await geps.contactUnblock(unblock).then((a) => {
                        console.log(a)
                        geps.reply(from, `Success unblok ${args[1]}!`, id)
                    })
                }
                break
            case prefix+'eval':
            case prefix+'ev':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await geps.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'setname':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!`, id)
                const setnem = body.slice(9)
                await geps.setMyName(setnem)
                geps.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us', '')} 😘`)
                break
                case prefix+'addsay':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya untuk Owner Alm. RidhoSenpai[BOT]`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const says = body.slice(8)
                say.push(says)
                fs.writeFileSync('./database/bot/say.json', JSON.stringify(say))
                geps.reply(from, `Add ${says} sukses!\nUntuk melihat list ketik ${prefix}saylist`, id)
                break
            case prefix+'delsay':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya untuk Owner Alm. RidhoSenpai[BOT]`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                let delsayso = say.indexOf(q)
                say.splice(delsayso, 1)
                fs.writeFileSync('./database/bot/say.json', JSON.stringify(say))
                geps.reply(from, `Delete ${q} sukses!`, id)
                break
            case prefix+'setstatus':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!`, id)
                const setstat = body.slice(11)
                await geps.setMyStatus(setstat)
                geps.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us', '')} 😘`)
                break
            case prefix+'setpict':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Alm. RidhoSenpai[BOT]!`, id)
                if (isMedia) {
                    const mediaData = await decryptMedia(message)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setProfilePic(imageBase64)
                    geps.reply(from, `Makasih Owner Sama Foto Profilenya 😘`, id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setProfilePic(imageBase64)
                    geps.reply(from, `Makasih Owner Sama Foto Profilenya 😘`, id)
                } else {
                    geps.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setprofilepic`, id)
                }
                break
            case prefix+'shutdown':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                await geps.sendText(from, 'Otsukaresama deshita~ 👋')
                    .then(async () => await geps.kill())
                    .catch(() => new Error('Target closed.'))
            break
            case prefix+'premium':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                            premium.addPremiumUser(benet, args[2], _premium)
                            await geps.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${benet}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await geps.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await geps.reply(from, ind.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await geps.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break

            case prefix+'setstatus':
            case prefix+'setstats':
            case prefix+'setstat':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.emptyMess(), id)
                await geps.setMyStatus(q)
                await geps.sendText(from, ind.doneOwner())
            break
            case prefix+'exif':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const namaPack = q.substring(0, q.indexOf('|') - 1)
                const authorPack = q.substring(q.lastIndexOf('|') + 2)
                exif.create(namaPack, authorPack)
                await geps.reply(from, ind.doneOwner(), id)
            break
            default:
                if (isCmd) {
                    await geps.reply(from, ind.cmdNotFound(command), id)
                }
            break
        }
    }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
