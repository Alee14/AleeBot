const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
message.channel.send(":ship: "+ message.author.username + " x " + message.guild.members.random().displayName);
}
