const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
message.reply(':arrow_left: Continue in DMs.');
message.author.sendMessage("AleeBot on your server? Great! Here's the link: https://goo.gl/KDQyrp");
}

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'botinvite',

  description: 'Now you can invite your bot to your server!',

  usage: 'botinvite'

};
