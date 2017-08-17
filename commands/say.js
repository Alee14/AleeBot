const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
  if(message.author.id !== config.ownerID) return;
  message.channel.sendMessage(args.join(" "));
  message.delete();

}
