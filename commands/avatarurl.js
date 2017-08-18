const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
message.reply(message.author.avatarURL);
}

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'avatarurl',

  description: 'It displays your avatar url.',

  usage: 'avatarurl'

};
