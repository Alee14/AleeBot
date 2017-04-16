const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
    if(message.content === 'ab:profile'){
        message.reply(message.author.avatarURL);
    }

 });

client.on('message', message => {
    if(message.content === 'ab:git'){
        message.channel.sendMessage ('Here is the github repo: https://github.com/Alee14/AleeBot');
    }

});

client.on('message', message => {
    if(message.content === 'ab:ping'){
        message.reply('Pong! :ping_pong:');
    }

});

client.on('message', message => {
    if(message.content === 'ab:pong'){
        message.reply('Ping! :ping_pong:');
    }

});

client.on('message', message => {
    if(message.content === 'ab:help'){
        message.channel.sendMessage ('```Commands for AleeBot!\n\nab:profile\nab:git\nab:ping\nab:pong\nab:owner```');
    }

});

client.on('message', message => {
    if(message.content === 'ab:owner'){
		message.channel.sendMessage ('The person who made this is Alee14#9928!');
    }

});

client.on("ready", () => client.user.setGame("For help: ab:help")) 

 client.login ('token')
 console.log('[INFO] Success! Bot is running, Logged in as ${client.user.username}!')
