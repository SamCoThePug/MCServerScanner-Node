let url = "https://discord.com/api/invites/"
const axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client()

let settings = {
  "token": "Discord token",
  "channelid": "Channel ID of the channel to send servers to"
}

let scanned = []

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}
console.log("Script Starting.")
setTimeout(() => {
    scan()
    setInterval(() => {
        scan()
    }, 20)
}, 5000)
const util = require('minecraft-server-util');
function scan() {
    var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
    if(!scanned.includes(`${ip}`)) {
    scanned.push(`${ip}`)
    util.status(`${ip}`)
    .then((response) => {
            console.log("Server found on "+ip+":25565")
        axios.get("http://extreme-ip-lookup.com/json/"+response.host).then(resp => {
        let emb = new Discord.MessageEmbed()
        .setTitle("Found Server!")
        .addField("IP:", `${response.host}`, true)
        .addField(`Port:`, `${response.port}`, true)
        .addField("Version:", `${response.version}`, true)
        .addField("Players:", `${response.onlinePlayers}/${response.maxPlayers}`)
        .addField("Host:", `${resp.data.isp} - ${resp.data.org}`)
        .setColor("GREEN")
        client.channels.cache.get(settings.channelid).send(emb)
        })
    })
    .catch((error) => {
        console.log("No server on "+ip+":25565")
        //console.log(error)
    });
    }
}

client.login(settings.token)
