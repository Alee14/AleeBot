const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
  if(message.author.id !== config.ownerID) return;
  message.channel.sendMessage(args.join(" "));
  message.delete();

}

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'say',

  description: 'You cannot use this command host of the bot can use it!',

  usage: 'say [input]'

};
