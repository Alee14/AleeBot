const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./absettings.json');


client.on('ready', () => {
       console.log("[SUCCESS] AleeArmy Welcomer is now ready!");
       client.user.setStatus('invisible')
   });

   client.on("guildMemberAdd", function(member) {
     member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has joined the server");

});

client.on("guildMemberRemove", function(member) {
  member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " has left the server");

});

process.on('unhandledRejection', function(err, p) {
  console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});

client.login (config.aawtoken).catch(function() {
      console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
  });
