const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
   client.user.setStatus('online') 
   client.user.setActivity(`Created By. Teymen`);
   console.log(`[BOT] - [ SUNUCULAR - ${client.guilds.cache.size} ] - [ KULLANICILAR - ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()} ]`)
     

};