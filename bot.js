const Discord = require('discord.js');
const client = new Discord.Client();
client.login ('')

client.on('message', message => {
    if(message.content === 'aleebot:profile'){
        message.reply(message.author.avatarURL);
    }

 });
 