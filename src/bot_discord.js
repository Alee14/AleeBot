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
const prefix = "abb:";
const fs = require("fs");
const config = require('./absettings.json');
console.log(`Welcome to AleeBot NodeJS Terminal!`);

client.commands = new Discord.Collection();

fs.readdir(`./commands/`, (err, files) => {
    if(err) console.log(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <= 0) { return console.log('[X] No commands found...')}
    else { console.log('[i] ' + jsfiles.length + ' commands found.') }

    jsfiles.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);
        console.log(`[i] Command ${f} loading...`);
        client.commands.set(cmds.config.command, cmds);
    })
    console.log('[>] Success! All commands are loaded...')
})


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


client.on("message", function(message) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    var msg = message.content;
    var cont = message.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);


    if (!message.content.startsWith(prefix)) return;

    var cmd = client.commands.get(cont[0])
    if (cmd) cmd.run(client, message, args);

});
client.login(config.abtoken).catch(function() {
    console.log("[X] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
});
