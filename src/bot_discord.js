/** *******************************************
 *
 *	AleeBot for Discord servers
 *	Copyright (C) 2018 AleeCorp
 *	License: MIT
 *
 **********************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const abVersion = '2.2.0 Beta';
const prefix = 'abb:';
const fs = require('fs');
const config = require('./absettings.json');
console.log('Welcome to AleeBot NodeJS Terminal!');

client.apikey = config.ytapikey;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
  if (err) console.error(err);
  console.log(`Attempting to load a total of ${files.length} commands into the memory.`);
  files.forEach(file => {
    try {
      const command = require(`./commands/${file}`);
      console.log(`Attempting to load the command "${command.help.name}".`);
      client.commands.set(command.help.name, command);
      command.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command.help.name);
        console.log(`Attempting to load "${alias}" as an alias for "${command.help.name}"`);
      });
    }
    catch (err) {
      console.log('An error has occured trying to load a command. Here is the error.');
      console.log(err.stack);
    }
  });
  console.log('Command Loading complete!');
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
  if (msg.author.bot) return;

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
