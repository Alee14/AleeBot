const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
    message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
}

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'ping',

  description: 'It tells you the pingtime.',

  usage: 'ping'

};
