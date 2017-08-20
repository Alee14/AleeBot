/****************************************
 *
 *   AleeBot for AleeArmy Community and other servers
 *   Copyright (C) 2017 AleeCorp
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *
 **************************************/
const Discord = require('discord.js');
const moment = require('moment');
const blessed = require('blessed');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./absettings.json');
const log = message => {

    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);

};


var logsChannel = "318874545593384970";


client.commands = new Discord.Collection();

client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Loading Command: ${props.help.name}. Done!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.on('ready', () => {
    log("[>] AleeBot is now ready! Running version " + config.abversion + "!");
    client.user.setPresence({
        game: {
            name: 'with version ' + config.abversion + '',
            type: 0
        }
    });
    client.user.setStatus('online')
});


client.on("guildCreate", guild => {

    // This event triggers when the bot joins a guild.

    log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);


    guild.defaultChannel.sendMessage(":wave: Hello I am AleeBot thanks for inviting me to your server for help type `" + config.prefix + "help`.")

});



client.on("guildDelete", guild => {

    // this event triggers when the bot is removed from a guild.

    log(`I have been removed from: ${guild.name} (id: ${guild.id})`);


});


client.on("message", function(message) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, config);
    } catch (err) {
        message.reply(`:no_entry_sign: Error!\nThe command ${command} isn't found. (Reported to console.)`)
        console.error(err);
    }


});

process.on('unhandledRejection', function(err, p) {
    log("[X | UNCAUGHT PROMISE] " + err.stack);
});

client.login(config.abtoken).catch(function() {
    log("[X] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
});
