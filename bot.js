const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
    if(message.content === 'aleebot:profile'){
        message.reply(message.author.avatarURL);
    }

 });

client.on('message', message => {
    if(message.content === 'aleebot:updates'){
        message ('https://github.com/Alee14/AleeBot');
    }

});

client.on('message', message => {
    if(message.content === 'aleebot:ping'){
        message.reply('Pong! :ping_pong:');
    }

});

client.on('message', message => {
    if(message.content === 'aleebot:pong'){
        message.reply('Ping! :ping_pong:');
    }

});

client.on('message', message => {
    if(message.content === 'aleebot:help'){
        message ('aleebot:profile\naleebot:updates\naleebot:ping\naleebot:pong');
    }

});

client.on("ready", () => client.user.setGame("aleebot:help")) 

 client.login ('')
