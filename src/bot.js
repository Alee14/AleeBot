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
const fs = require("fs");
const config = require('./absettings.json');

client.on('ready', () => {
    console.log("[>] AleeBot is now ready!")
    console.log("[i] Running version " + abVersion + ` and in ${client.guilds.size} guilds`)
    client.user.setPresence({
        game: {
            name: 'AleeBot '+ abVersion + ' | ' + config.prefix +'help',
            type: 0
        }
    });
    client.user.setStatus('online')
});

client.on("guildCreate", guild => {

    console.log(`[i] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});


client.on("guildDelete", guild => {

    console.log(`[i] I have been removed from: ${guild.name} (id: ${guild.id})`);

});
/*
client.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has joined the server");
});

client.on('guildMemberRemove', member => {
    member.guild.channels.find("name", "welcomes-and-byes").sendMessage(`**${member.user.username}** has left the server`);
}); */


client.on("message", function(message) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


    if (command === 'help') {
        var embed = new Discord.RichEmbed()
            .setAuthor('AleeBot ' + abVersion + ` Help and on ${client.guilds.size} servers`, "https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
            .setDescription("Every command you input into AleeBot is `" + config.prefix + "`")
            .addField("- General Commands", "ping\nuptime\ngit", true)
            .setFooter("AleeCorp Copyright 2017")
            .setColor("#1fd619")
        message.channel.sendEmbed(embed);
    }

    if (command === 'ping') {
        message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
    }

    if (command === 'uptime') {
        var uptime = parseInt(client.uptime);
			uptime = Math.floor(uptime / 1000);
			var uptimeMinutes = Math.floor(uptime / 60);
			var minutes = uptime % 60;
			var hours = 0;
			while (uptimeMinutes >= 60) {
				hours++;
				uptimeMinutes = uptimeMinutes - 60;
			}
			var uptimeSeconds = minutes % 60;
        message.channel.send(":clock3: AleeBot has been up for " + hours + " hours, " + uptimeMinutes + " minutes, and " + uptimeSeconds + " seconds.")
    }

    if (command === 'git') {
        message.author.send("I can see you want to contribute to this project.\nHere's the link: https://github.com/AleeCorp/AleeBot")
    }

});
client.login(config.abtoken).catch(function() {
    console.log("[X] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
});
