const dbbb = require('quick.db');
const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const ayarlar = require("../ayarlar.json");
const request = require('node-superfetch');

exports.run = async (client, message, args) => {

// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */

    let u = message.mentions.users.first() || message.author;
    if (u.bot === true) return;


    var xp = dbbb.fetch(`puan_${u.id + message.guild.id}`);
    var lvl = dbbb.fetch(`seviye_${u.id + message.guild.id}`);

    let sira = ''
    const sorted = message.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => {
        return dbbb.fetch(`seviye_${b.user.id + message.guild.id}`) - dbbb.fetch(`seviye_${a.user.id + message.guild.id}`)
    });

    const top10 = sorted.splice(0, message.guild.members.cache.size)
    const mappedID = top10.map(s => s.user.id);
    for (var i = 0; i < message.guild.members.cache.size; i++) {
        if (mappedID[i] === u.id) {
            sira += `${i + 1}`
        }
    }

    var de = 1.6


    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var data = db.get(`invites.${message.member.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
    var embed = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({ dynamic: true }))
.setTitle(`Legend Server Bakiyen`)  
.addField('**Bakiyen**',`TTcoin: \`${(data.total || 0) + (data.bonus || 0)}\` \n`+ `Lcoin: \`${data.leave || 0}\``)
.addField('**Profilin**',`Vip Durumu: ${ayarlar.mevcutdegil} \n`+ `PP: \`\``)
.addField('**Seviye Bilgilerin**',`Sıralama: \`#${sira}\` \n`+ `Sıralama: \`${lvl || 0}\`\n`+ `XP: \`${xp || 0} / 150 XP\` \n`)
    .setColor(ayarlar.embedcolor);
    message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'lcoin',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};
