const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');

exports.run = async (client, msg, args) => {

    let u = msg.mentions.users.first() || msg.author;

    if (u.bot === true) return;

    var g = "50"

    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(750, 240)
    const ctx = canvas.getContext('2d');

    ctx.quality = "best"
    let avatarURL = u.displayAvatarURL({ format: 'png', size: 1024 });
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);

    ctx.fillStyle = "rgba(0, 0, 0, 0." + g + ")";
    ctx.fill()
    ctx.fillRect(25, 20, 700, 200)
    ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
    ctx.fill()
    ctx.fillRect(0, 0, 750, 240)

    var re = "3385ff"

    var xp = db.fetch(`puan_${u.id + msg.guild.id}`);
    var lvl = db.fetch(`seviye_${u.id + msg.guild.id}`);

    let sira = ''
    const sorted = msg.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => {
        return db.fetch(`seviye_${b.user.id + msg.guild.id}`) - db.fetch(`seviye_${a.user.id + msg.guild.id}`)
    });

    const top10 = sorted.splice(0, msg.guild.members.cache.size)
    const mappedID = top10.map(s => s.user.id);
    for (var i = 0; i < msg.guild.members.cache.size; i++) {
        if (mappedID[i] === u.id) {
            sira += `${i + 1}`
        }
    }

    var de = 1.6
  
   ctx.lineWidth = 20;
   ctx.strokeStyle = "#3385ff";
   ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    ctx.fillStyle = "#999999";
    ctx.arc(257 + 18.5, 125.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
    ctx.fillRect(257 + 18.5, 125.5 + 36.15, 250 * de, 37.5);
    ctx.arc(257 + 18.5 + 250 * de, 125.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#${re}`;
    ctx.arc(257 + 18.5, 125.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
    ctx.fillRect(257 + 18.5, 125.5 + 36.25, xp * de, 37.5);
    ctx.arc(257 + 18.5 + xp * de, 125.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.fill();
    ctx.fillStyle = `#${re}`;
    ctx.font = '28px Impact';
    ctx.textAlign = "right";
    ctx.fillText(`Sıralama #${sira} | Seviye ${lvl || 0}`, 670, 70);
    ctx.font = '20px Impact';
    ctx.textAlign = "right";
    ctx.fillText(`${xp || 0} / 150 XP`, 670, 100);
    ctx.fillStyle = `#fcfdff`;
    ctx.font = 'bold 28px Impact';
    ctx.textAlign = "left";
    ctx.fillText(`${u.tag}`, 257, 150)

    ctx.beginPath()
    ctx.lineWidth = 9;
    ctx.strokeStyle = "#3385ff";
    ctx.arc(130, 122, 80, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath()
    ctx.clip();
    ctx.drawImage(avatar, 50, 42, 165, 165);

    msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "seviye.png" }] })

};

exports.conf = {
    enabled: true,
    aliases: [],
};

exports.help = {
    name: 'seviye',
};
