const Discord = require('discord.js');
const profanities = require('profanities');
const client = new Discord.Client();
const config = require('./absettings.json');


client.on('ready', () => {
       console.log("[SUCCESS] AleeArmy Welcomer is now ready!");
       client.user.setStatus('invisible')
   });

   client.on("guildMemberAdd", function(member) {
     member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has joined the server")

});

client.on("guildMemberRemove", function(member) {
  member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has left the server");

});

client.on('message', message => {
  for (x = 0; x < profanities.length; x++) {
    if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
        client.channels.get('318874545593384970').sendMessage(":information_source: " + message.author.username + " just swore!");
        console.log('[WARNING] '+ message.author.username +' just swore!')
        switch (Math.floor(Math.random() * 1000) % 3) {
          case 0:
          message.reply('Keep this server clean buddy!');
          break;
          case 1:
          message.reply('We want this server PG!');
          break;
          case 2:
          message.reply('Hmm. You like swearing a lot well some other people don\'t!')
          break;
        }
        message.delete();
        return;
    }
  }
});

process.on('unhandledRejection', function(err, p) {
  console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});

client.login (config.aawtoken).catch(function() {
      console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
  });
