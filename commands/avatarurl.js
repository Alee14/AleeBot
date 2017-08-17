const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
message.reply(message.author.avatarURL);
}
