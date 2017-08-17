const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
    message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
}
