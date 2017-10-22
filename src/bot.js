/*********************************************
 *
 *	AleeBot for Discord servers
 *	Copyright (C) 2017 AleeCorp
 *	License: MIT
 *
 **********************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const abVersion = "2.0.0 Beta";
const prefix = "abb:"
const config = require('./absettings.json');

client.on('ready', () => {
    console.log("[>] AleeBot is now ready!")
    console.log("[i] Running version " + abVersion + ` and in ${client.guilds.size} guilds`)
    client.user.setPresence({
        game: {
            name: `ab:help | ${client.guilds.size} servers`,
            type: 0
        }
    });
    client.user.setStatus('online')
});

client.on("guildCreate", guild => {

    console.log(`[i] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

    client.user.setPresence({
        game: {
            name: `ab:help | ${client.guilds.size} servers`,
            type: 0
        }
    });

});


client.on("guildDelete", guild => {

    console.log(`[i] I have been removed from: ${guild.name} (id: ${guild.id})`);

    client.user.setPresence({
        game: {
            name: `ab:help | ${client.guilds.size} servers`,
            type: 0
        }
    });


});

client.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has joined the server");
});

client.on('guildMemberRemove', member => {
    member.guild.channels.find("name", "welcomes-and-byes").sendMessage(`**${member.user.username}** has left the server`);
});


client.on("message", function(message) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command === 'help') {
        var embed = new Discord.RichEmbed()
            .setAuthor('AleeBot ' + abVersion + ' Commands', "https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
            .addField('**ab:ping** Ping Pong!', true)
            .setFooter("AleeCorp Copyright 2017")
            .setColor("#1fd619")
        message.channel.sendEmbed(embed);
    }

    if (command === 'ping') {
        message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
    }

});
client.login(config.abtoken).catch(function() {
    console.log("[X] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
});
