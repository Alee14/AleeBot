/****************************************
 *
 *   AleeBot: Made for discord servers
 *   Copyright (C) 2017-2020 Alee Productions
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * *************************************/
const Discord = require('discord.js');
const moment = require('moment');
const readline = require('readline');
const colors = require('colors');
const DBL = require("dblapi.js");
const client = new Discord.Client({
  disableEveryone: true
});
const settings = require('./storage/settings.json')
const fs = require('fs');
const api = require('./tokens.json');
const dbl = new DBL(api.dbltoken, client);
const active = new Map();
const ownerID = "242775871059001344";

const log = message => {

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`.white);

};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '.gray
});

console.log(`AleeBot ${settings.abVersion}: Copyright (C) 2017-2020 Alee Productions`.gray);
console.log('This program comes with ABSOLUTELY NO WARRANTY; for details type `show w\'.'.gray);
console.log ('This is free software, and you are welcome to redistribute it'.gray);
console.log ('under certain conditions; type `show c\' for details.\n'.gray)

if (process.argv.indexOf("--debug") == -1) {
  console.log("Running AleeBot without --debug command line flag. Debug output disabled.\n".yellow);
} else {
  console.log('[!] Entering debug mode...'.yellow)
  client.on('debug', function(info) {
      log(info.gray);
  });
  client.on('warn', function(info) {
      log(info.red);
  });
}

if (process.argv.indexOf("--beta") == -1) {
  client.login(api.abtoken).catch(function() {
    console.log('[X] Login failed. The token that you put in is invalid, please put in a new one...'.red);
    process.exit(0);
  });

} else {
  client.login(api.abbtoken).catch(function() {
    console.log('[X] Login failed. The token that you put in is invalid, please put in a new one...'.red);
    process.exit(0);
  });
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
  if (err) console.error(err);
  log(`[!] Attempting to load a total of ${files.length} commands into the memory.`.cyan);
  files.forEach(file => {
    try {
      const command = require(`./commands/${file}`);
      log(`[!] Attempting to load the command "${command.help.name}".`.cyan);
      client.commands.set(command.help.name, command);
      command.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command.help.name);
        log(`[!] Attempting to load "${alias}" as an alias for "${command.help.name}"`.cyan);
      });
    }
    catch (err) {
      log('[X] An error has occured trying to load a command. Here is the error.'.red);
      console.log(err.stack);
    }
  });
  log('[>] Command Loading complete!'.green);
  console.log('\n');
});

rl.on('line', function(cmd){
  var args = cmd.split(" ");
  switch(args[0]) {
      case "guilds":
          if (client.guilds.size === 0) {
              console.log(('[!] No guilds found.'.yellow));
          } else {
              console.log('[i] Here\'s the servers that AleeBot is connected to:')
              for ([id, guild] of client.guilds) {
                  console.log(`   Guild Name: ${guild.name} - ID: ${guild.id}`.blue);
              }
          }
          break;
      case "channels":
            if (!args[1]) {
              console.log('[!] Please insert the guild\'s ID.'.yellow)
            } else {
              var guild = client.guilds.get(args[1]);
              console.log('[i] Here\'s the channels that this guild have:'.blue)
              for ([id, channel, guild] of guild && client.channels) {
                  console.log(`   Channel: #${channel.name} - ID: ${channel.id}`.blue);
              }
            }
          break;
      case "leave":
          if (!args[1]) {
              console.log('[!] Please insert the guild\'s ID.'.yellow);
          } else {
              var guild = client.guilds.get(args[1]);
              guild.leave();
          }
          break;
      case "broadcast":
          if (!args[1]) {
              console.log('[!] Usage: broadcast [guildID] [channelID].'.yellow);
          } else {
              let broadcast = args.join(" ").slice(48);
              var guild = null;
              guild = client.guilds.get(args[1]);
              var channel = null;
              channel = guild.channels.get(args[2])
              if (channel != null) {
                channel.send(broadcast);
              }
          }
          break;
      case "uptime":
      let uptime = parseInt(client.uptime);
      uptime = Math.floor(uptime / 1000);
      let uptimeMinutes = Math.floor(uptime / 60);
      const minutes = uptime % 60;
      let hours = 0;
      while (uptimeMinutes >= 60) {
      hours++;
      uptimeMinutes = uptimeMinutes - 60;
      }
      const uptimeSeconds = minutes % 60;
      console.log(`[i] AleeBot has been up for ${hours} hours, ${uptimeMinutes} minutes, and ${uptimeSeconds} seconds.`.blue);
      break;
      case "exit":
        console.log('[i] AleeBot will now exit!'.blue)
        const embed = new Discord.RichEmbed()
        .setAuthor("AleeBot Status", client.user.avatarURL)
        .setDescription("AleeBot is now going offline...")
        .setColor("#ff3333")
        client.channels.find('id', '606602551634296968').send({embed});
        client.destroy();
        process.exit(0);
          break;
      case "help":
          var msg = (`AleeBot `+ settings.abVersion +` Console Help\n\n`);
          msg += (`guilds - Shows all guilds that AleeBot's on.\n`)
          msg += (`channels - Shows all the channels that the guilds have.\n`)
          msg += (`leave - Leaves a guild.\n`)
          msg += (`broadcast - Broadcasts a message to a server.\n`)
          msg += (`uptime - Shows the uptime for AleeBot.\n`)
          msg += (`help - Shows this command.\n`)
          msg += (`exit - Exits AleeBot.\n`)
          console.log(msg.cyan);
          break;
      default:
     console.log('Unknown command, type \'help\' to list the commands...'.yellow)
  }
  rl.prompt();
});


client.on('ready', () => {
  log('[>] AleeBot is now ready!'.green);
  log(`[i] Logged in as ${client.user.tag}`.green);
  log(`[i] Default Prefix: ${settings.prefix}`.green)
  log(`[i] Bot ID: ${client.user.id}`.green);
  log(`[i] Token: ${api.abtoken}`.green);
  log(`[i] Running version ${settings.abVersion} and in ${client.guilds.size} guilds`.green);

  client.setInterval(function() {
    const games = [
      'AleeBot ' + settings.abVersion + ' | ' + settings.prefix + 'help',
      'Annoying Alee',
      'Coding stuff',
      'Drawing shapes',
      'Fighting AstralMod',
    ];
    setInterval(() => {
      dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);
    client.user.setPresence({
      status: 'online',
      afk: false,
      game: {
        type: 0,
        name: games[Math.floor(Math.random() * games.length)],
      },
    });
  }, 200000);
  client.user.setStatus('online');
  const embed = new Discord.RichEmbed()
  .setAuthor("AleeBot Status", client.user.avatarURL)
  .setDescription("AleeBot has started")
  .setColor("#5cd65c")
  client.channels.find('id', '606602551634296968').send({embed});
  rl.prompt();
});

client.on('guildMemberAdd', member => {
    if (member.guild.id != '243022206437687296') return 0
    var role = member.guild.roles.find((role) => role.name === "Member");
    member.addRole(role);
    log(`[i] ${member.user.username} joined Alee Productions.`.green);
    log(`[i] I gave ${member.user.username} the "Member" role.`.green);
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if (oldMessage.guild.id != '243022206437687296') return 0
    if (oldMessage.content === newMessage.content){
      return;
    }
    const logEmbed = new Discord.RichEmbed()
    .setAuthor("AleeBot Logging", client.user.avatarURL)
    .setDescription(`A message from ${oldMessage.author.username} was edited`)
    .addField("Before: ", `\`\`\`${oldMessage.content}\`\`\``)
    .addField("After: ", `\`\`\`${newMessage.content}\`\`\``)
    .setColor("#ffff1a")
    .setTimestamp()

    let editmessage = newMessage.guild.channels.find(ch => ch.name === "logs")
    if(!editmessage) return;

    editmessage.send(logEmbed);


})

client.on('guildCreate', guild => {

  log(`[i] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`.blue);

});


client.on('guildDelete', guild => {

  log(`[i] I have been removed from: ${guild.name} (id: ${guild.id})`.red);

});

dbl.on('posted', () => {
  log('Server count posted!'.blue);
});

dbl.on('error', e => {
 log(`[X | DBL ERROR] ${e}`.red);
});

client.on('message', (msg) => {
  if (msg.author.bot) return;

  if (msg.mentions != null && msg.mentions.users != null) {
    if (msg.mentions.users.has("282547024547545109")){
            if (msg.content.toLowerCase().includes("hello") || (msg.content.toLowerCase().includes("hi"))) {
                msg.reply(`Hello ${msg.author.username}!`);
        } else {
            if (msg.content.toLowerCase().includes("shut") && msg.content.toLowerCase().includes("up")) {
            switch (Math.floor(Math.random() * 1000) % 3) {
              case 0:
                  msg.reply("Hey, Can you not speak to me in that tone...")
                  break;
              case 1:
                  msg.reply("NO! I can talk as much I can!");
                  break;
              case 2:
                  msg.reply("Nah I won't....");
                  break;
            }
          } else if (msg.content.toLowerCase().includes("how") && msg.content.toLowerCase().includes("are") && msg.content.toLowerCase().includes("you")) {
            msg.reply("I'm doing OK, I suppose...");
          } else if (msg.content.toLowerCase().includes("ok") && msg.content.toLowerCase().includes("google")) {
            msg.reply("Erm... I am not google, if you want to use Google here's the link: https://www.google.com");
          } else if (msg.content.toLowerCase().includes("f") && msg.content.toLowerCase().includes("off")) {
            msg.reply("Do you want a hammer? :hammer:");
          } else if (msg.content.toLowerCase().includes("aleearmy")) {
            msg.reply("Oh yeah.. that thing Alee made...");
          }
      }
    }
  };


  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));

  if(!prefixes[msg.guild.id]){
    prefixes[msg.guild.id] = {
      prefixes: settings.prefix
    };
  }

  let prefix = prefixes[msg.guild.id].prefixes


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

      let ops = {
        ownerID: ownerID,
        active: active
      }

      cmd.run(client, msg, args, ops);
    }
    catch (e) {
      console.error(e);
    }
  }
});

process.on('unhandledRejection', function(err, p) {

log("[X | UNCAUGHT PROMISE] " + err.stack.red);

});
client.on('reconnecting', function() {
  log("[!] AleeBot has disconnected from Discord and is now attempting to reconnect.".yellow);
});

client.on('disconnect', function() {
  log("[X] AleeBot has disconnected from Discord and will not attempt to reconnect.".red);
  console.log("At this point, you'll need to restart AleeBot.".red);
  process.exit(0);
});
