const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
message.channel.send(":ship: "+ message.author.username + " x " + message.guild.members.random().displayName);
}

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'ship',

  description: 'The Bot will randomize random people that you will ship with.',

  usage: 'ship'

};
