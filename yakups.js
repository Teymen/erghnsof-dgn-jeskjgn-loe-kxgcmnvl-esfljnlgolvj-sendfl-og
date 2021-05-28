const fs = require('fs');
const db = require('quick.db')
const wiodb = require('wio.db')
const ms2 = require('parse-ms')
const ms = require("ms")
const Canvas = require('canvas')
const ayarlar = require('./ayarlar.json');
require('./invite.js')
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
  process.on('warning', function (err) {
    if ( 'MaxListenersExceededWarning' == err.name ) {
    process.exit(1); 

    }
  });
function foo() {
  return new Promise((resolve, reject) => {
  return resolve();
});
}

async function foobar() {
foobar();
foo().then(() => {}).catch(() => {});
foobar().catch(console.error);
}

var prefix = ayarlar.prefix

const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION']});
Discord.Role.prototype.toString = function() {
return `@${this.name}`
}
const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
         reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
   if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
    return permlvl;
};

client.login(process.env.token).then(
  function() {
    console.log("[Token-Log] Token Çalışıyor.");
  },
  function(err) {
    console.log("[ERROR] Token'de Bir Hata Oluştu: " + err);
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);


//---Bu Kod botun ana dosyasına atılacaktır.
//###CodeMareFi tarafından hazırlanmıştır - - - Ekleyen //###Sadista

const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));
var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on("message", async message => {
    if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;
  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };
  let userData = points[user.id];
  userData.points++;
  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
message.channel.send(`🆙 **| ${user.username} Tebrikler! Level atladın**`)
    }
fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })
  if (message.content.toLowerCase() === prefix + 'level' || message.content.toLowerCase() === prefix + 'profil') {
const level = new Discord.MessageEmbed().setTitle(`${user.username}`).setDescription(`**Seviye:** ${userData.level}\n**EXP:** ${userData.points}`).setColor("RANDOM").setFooter(``).setThumbnail(user.avatarURL())
message.channel.send(`📝 **| ${user.username} Adlı Kullanıcının Profili Burada!**`)
message.channel.send(level)
  }
});




//**Botunuzun Ana Dosyasına atılacak bot.js, index.js, main.js hangisini kullanıyorsanız**// | //--codemarefi
client.on("message", async msg => {
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puan_${msg.author.id + msg.guild.id}`, 3)
};

  if (db.fetch(`puan_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    
    db.delete(`puan_${msg.author.id + msg.guild.id}`)
    
  };
  
});










































































////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async message => {
let teymen = db.fetch(`teymen_${message.author.id}`)

const kod = [
"F3NFB7r0BZtA",
"fBJk36lb4YoY",
"gYvd7ht1z72E",
"npVT4U4XfWQn",
"QWO4rMO3otF5",
"wDDCgpedHGd9",
"q66TtrD54wnC",
"CK0pDGZeeYj6",
"ui4pb04i0NZe",
"DgYac4onIrmx",
"f84pEgNMaine",
"HoWWvmlv0jHp",
"xD11iGGgk75V",
"o6gkg67spXKG",
"CrZaZGQ3pM51",
"AHyRofbjOy3p",
"Kmu3nrPlN1nm",
"Q0Wda72QR3ks",
"nNp5hU3XqwgM",
"Bi7xFWKmhqQj",
"NOYXdC8CqVUI",
"s51HdfEjyjk3",
"r1hYQI7bzTyj",
"yAmPU48xpBQx",
"qulTtvugut5y",
"WqE0JnuwgXgS",
"g10rWucLwNYd",
"u6MlSMFetP6s",
"MhAya2gRaY6H",
"e3W149TqWGFD",
"MHv0vgILNzHu",
"NAJXAXAt8Fcb",
"61C6txrRMrk1",
"M8yUXWX2E8E2",
"x3o4NmCTG3zC",
"RdkoiJPsGV5Z",
"E0dBnrMnHIOM",
"QwM3VXnDPovO",
"TcsbU7XHFkmS",
"ENHPvdXe2znK",
"vozOfUjZFSr2",
"xskIgNABB8WS",
"huFtJBhu3fVm",
"FkW6DzcoklkI",
"KSRRRlJennm1",
"KSZx7vgttQTu",
"nV5tfwjDyXUn",
"t3ueMIRKsfUI",
"jz2JBspg7s4M",
"D3Bs1pKpdlhR",
"M2csMN7CVath",
"avx0N8WyBlmp",
"UZiIpEpFvLd9",
"TA1iYRCsSohb",
"OWOqDbGk96Yc",
"hEpfwp3hjhCj",
"Q7wZRDLtd11q",
"SeU7EwVQT3HU",
"G6f39ms0i4WU",
"UhmWyYYQu6Vw",
"800xhCy2EYLo",
"MCW7tKLNfU1N",
"F8eveB2Pw2xc",
"zxg9lSPXBKex",
"hEJvY8k7INnP",
"msXFFQsk3SIZ",
"L2tH6nmjMCNX",
"Ff8Yhnp7j2V8",
"tNFNXigdNqS0",
"lEbH8qVzDDOi",
"E47xHwsOlcfy",
"ljyZHn2oP5OL",
"GAk6CnGNQmQU",
"O01Ln5loCX2c",
"rRv5gfHIzvCt",
"fDCUcPxtK5Xu",
"YREn1b9XAgUq",
"jrQUd9QY2Q5T",
"L23ZBnN9BvBN",
"F9f41ZUATFS1",
"mTT3dqbpuLps",
"DfCmAFRnVQ6E",
"qMIP3OfA4GRl",
"ugsXnXuC5mdg",
"p5O0b9ZnhzQU",
"01efTIlPup0f",
"w2PwfN4TiE4W",
"lOc3yDnqt6XG",
"L95dOYHFDMpp",
"B8A8pvsaHJah",
"k7lUAxeMwD1z",
"Mvuf5bkyVpmU",
"otSH9cgozVHp",
"XkNwUTna6JlA",
"Yz5CfZVGOsYS",
"A80rTM2iVsFD",
"v8cYO425WlU9",
"x5CWcUX7XRty",
"Pbak9N7I7Mgx",
"D7hFsetxc7YG",
];
if (kod.some(word => message.content.includes(word))) {

if (message.content.includes("deneme1")) {
if (db.has(`kullanildi1${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi1${message.author.id}`, "kullandı1")
}

else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}

else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}
else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}
else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}
else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}
else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}
else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}
else if (message.content.includes("deneme2")) {
if (db.has(`kullanildi2${message.author.id}`) === true) return message.channel.send(`**<@${message.author.id}> Bu Kod Daha Önce Kullanılmış ${ayarlar.uyar}**`)
db.set(`kullanildi2${message.author.id}`, "kullandı2")
}



else if (message.content.includes("deneme3")) {
if (db.has(`kullanildi3${message.author.id}`) === true) return message.channel.send(`**:x: <@${message.author.id}> Hakkını zaten daha önce kullandığın için tekrar kullanamazsın!**`)
db.set(`kullanildi3${message.author.id}`, "kullandı3")
} else {
return
}
    
      try {
 {

  if(teymen == 100){
db.set(`teymen_${message.author.id}`, 1)
message.channel.send(`**${message.author.tag}** 100 Kodu Başarıyla Tamamladın ! :mavitik:`)
    return false;
}

          if(teymen === null){
            db.add(`teymen_${message.author.id}`, 1)
            teymen = 1
          } 
     
     

  db.add(`teymen_${message.author.id}`, 1)         
message.channel.send(`**<@${message.author.id}>** Kod Başarılı !:mavitik:\n**${teymen}/100**`)
              message.delete()


        }
      } catch (err) {
        console.log(err);
      }
    }
})




