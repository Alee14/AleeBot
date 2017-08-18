const Discord = require('discord.js');
exports.run =  (client, message, args, config) => {
    message.channel.send ("Here's the github repo: https://github.com/AleeCorp/AleeBot");
}
exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'git',

  description: 'Tells you the repository of AleeBot.',

  usage: 'git'

};
