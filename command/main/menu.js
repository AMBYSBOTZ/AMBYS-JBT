//WM JNGAN DI HAPUS DEKK

const { monospace } = require('../../lib/function')
const fs = require("fs");
let multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");
const moment = require("moment");
const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = {
  name: ['menu'].map((v) => v + ''),
  alias: ["cmd","menu"],
  category: "main",
  desc: "Menampilkan command",
  async run({conn, msg},{map, q}){
    let { body , reply} = msg
    let pref = multi_pref.test(body) ? body.split("").shift() : ".";
    let locale = "id"
    let d = new Date(new Date() + 3600000)
    let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    const { pushName, sender } = msg;
    const { prefix, command } = map;
    const cmds = command.keys();
    let category = [];

    try {
      if(q){
        for(const cmd of cmds){
          let info = command.get(cmd);
          if (!cmd) continue;
		  		if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
		  		cteg = info.category || "No Category";
		  		if (info.type == "changelog") continue;
			  	if (!cteg || cteg === "private") cteg = "owner";
		  		if (Object.keys(category).includes(cteg)) category[cteg].push(info);
		  		else {
		  		  category[cteg] = [];
				  	category[cteg].push(info);
		  		}
        }
        teks = global.footer + " *[ AMBYS BOTZ ]*\n\n"
		  	teks += monospace(" β Library : Baileys-MD") + "\n"
		  	teks += monospace(" β Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
		  	teks += monospace(" β Prefix : [ " + pref + " ]") + "\n\n"
		  	teks += monospace(`Halo, @${sender.split("@")[0]} Here my Command`) +`\n\n`;
		  	teks += `*δΉ ${q.toUpperCase()}*\n`
		  	nganu = category[q]
		  	if(nganu == undefined) throw "Category not found!!"
        for(let i of nganu){
          teks += monospace(` Γ ${pref + i.name} ${map.lockcmd.get(i.name) ? "β" : ""}`) + "\n"
        }
        teks += "\n*Bot Still in Development stage*"
        msg.reply(teks,{withTag: true})
      } else {
        for (let cmd of cmds){
          let info = command.get(cmd);
			  	if (!cmd) continue;
		  		if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
		  		cteg = info.category || "No Category";
		  		if (info.type == "changelog") continue;
		  		if (!cteg || cteg === "private") cteg = "owner";
			  	if (Object.keys(category).includes(cteg)) category[cteg].push(info);
		  		else {
		  		  category[cteg] = [];
			  		category[cteg].push(info);
			  	}
        }
			menu = global.footer + " *[ AMBYS BOTZ ]*\n\n"
			menu += monospace(" β Library : Baileys-MD") + "\n"
			menu += monospace(" β Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" β Prefix : [ " + pref + " ]") + "\n"
			menu += monospace(" β Date : " + date) + "\n"
			menu += monospace(" β Time : " + time) + "\n"
		  menu += monospace(" β Speed :  " + processTime(msg.messageTimestamp, moment()) + " Seccond") + "\n\n"
		  menu += "*bantu follow ig gua aja makasih : https://instagram.com/granger_ambys?igshid=YmMyMTA2M2Y=*\n_The sign β means the Error or Feature is being Disabled by the Owner!!_\n\n"
			menu += monospace(`Halo, @${sender.split("@")[0]} Here my Command List`) +`\n\n`;
			const keys = Object.keys(category)
			menu += "*δΉ CATEGORY MENU*\n"
			for(let o of keys){
			  menu += monospace(` Γ ${pref + msg.command} ${o}`) + "\n"
			}
			menu += "\n"
			for(let key of keys){
			  menu += `*δΉ ${key.toUpperCase()}*\n`
			  menu += `${category[key].map((cmd) => monospace(` Γ ${cmd.options.noPrefix ? "" : pref}${cmd.name} ${map.lockcmd.get(cmd.name) ? "β" : ""}`)).join("\n")} ` + "\n\n"
			}
			menu += `*Thanks To:*\nβ’BOTCAHX\nβ’XiaoSan\n\n`
			menu += `_Note : Type ${prefix}help <command> to view command info_`
			
		/*	const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Owner'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Speed'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://telegra.ph/file/642a95448d0d2d4750a37.jpg"},
           caption: menu,
           footer: "Bot Masih dalam tahap Perkembangan",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})*/
       
       const { generateWAMessageFromContent } = require ("@adiwajshing/baileys")
       prep = generateWAMessageFromContent(msg.from, { liveLocationMessage: { 
         degreesLatitude: 35.685506276233525,
         degreesLongitude: 139.75270667105852,
caption: menu,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null,
contextInfo: {mentionedJid: await parseMention(menu)}
}}, { quoted: msg
					})

return conn.relayMessage(msg.from, prep.message, { messageId: prep.key.id })
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}


async function parseMention(text = ""){
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
