const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
  message.reply(':arrow_left: Continue in DMs.');
  message.author.sendMessage("You want a invite to the AleeArmy server? Here's the link: https://discord.gg/JqgXrAJ");
}

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'serverinvite',

  description: 'The bot will DM you the server invite',

  usage: 'serverinvite'

};
