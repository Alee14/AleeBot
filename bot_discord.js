/********************************
 * 
 * AleeBot for Discord Servers
 * 
 * Copyright (c) 2018 AleeCorp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************/
const Discord = require('discord.js');
const economy = require('discord-eco');
const client = new Discord.Client();
const abVersion = '2.4.0 Beta';
const prefix = 'abb:';
const fs = require('fs');
const config = require('./absettings.json');
console.log('Welcome to AleeBot NodeJS Terminal!');

client.apikey = config.ytapikey;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.servers = {};

fs.readdir('./commands', (err, files) => {
  if (err) console.error(err);
  console.log(`[!] Attempting to load a total of ${files.length} commands into the memory.`);
  files.forEach(file => {
    try {
      const command = require(`./commands/${file}`);
      console.log(`[!] Attempting to load the command "${command.help.name}".`);
      client.commands.set(command.help.name, command);
      command.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command.help.name);
        console.log(`[!] Attempting to load "${alias}" as an alias for "${command.help.name}"`);
      });
    }
    catch (err) {
      console.log('[X] An error has occured trying to load a command. Here is the error.');
      console.log(err.stack);
    }
  });
  console.log('[>] Command Loading complete!');
  console.log('\n');
});


client.on('ready', () => {
  console.log('[>] AleeBot is now ready!');
  console.log('[i] Running version ' + abVersion + ` and in ${client.guilds.size} guilds`);
  
  client.user.setPresence({
    game: {
      name: 'AleeBot ' + abVersion + ' | ' + config.prefix + 'help',
      type: 0,
    },
  });
  client.user.setStatus('online');
});

client.on('guildCreate', guild => {

  console.log(`[i] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});


client.on('guildDelete', guild => {

  console.log(`[i] I have been removed from: ${guild.name} (id: ${guild.id})`);

});


client.on('message', (msg) => {
  if (!msg.content.startsWith(prefix)) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (cmd.conf.guildOnly == true) {
      if (!msg.channel.guild) {
        return msg.channel.createMessage('This command can only be ran in a guild.');
      }
    }
    try {
      cmd.run(client, msg, args);
    }
    catch (e) {
      console.error(e);
    }
  }
});
client.login(config.abtoken).catch(function() {
  console.log('[X] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.');
});
