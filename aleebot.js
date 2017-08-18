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
const blessed = require('blessed');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./absettings.json');


var logsChannel = "318874545593384970";

client.on('ready', () => {
  console.log("[SUCCESS] AleeBot is now ready! Running version "+ config.abversion +"!");
  });

   fs.readdir("./events/", (err, files) => {
     if (err) return console.error(err);
     files.forEach(file => {
       let eventFunction = require(`./events/${file}`);
       let eventName = file.split(".")[0];
       // super-secret recipe to call events with all their proper arguments *after* the `client` var.
       client.on(eventName, (...args) => eventFunction.run(client, ...args));
     });
   });


   function setGame() {
       var presence = {
           game: {
               type: 0
           },
           status: "online",

           afk: false
       };

       switch (Math.floor(Math.random() * 1000) % 35) {
           case 0:
              presence.game.name = "For help: ab:help";
              break;
           case 1:
              presence.game.name = "Running version "+ config.abversion +"";
              break;
           case 2:
              presence.game.name = `Running on ${client.guilds.size} servers`;
           case 3:
              presence.game.name = "with other bots c:"
             }
             client.user.setPresence(presence);
             }

/*
function wordFilter(content) {
    var word = content.search(/\b(fuck|fag|faggot|fuck|fuk|fuc|fucc|ho|phuck|hentai|porn|slut|bitch|succ|fucking|shit|ass|asshole|mofo|motherfucker|fucker|damn|hell|dick|cock|sex|cunt|nigger|nigga)+\b/i);

    if (word != -1) {
        return true;
    } else {
        return false;
    }
} */


client.on("guildCreate", guild => {

  // This event triggers when the bot joins a guild.

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);


  guild.defaultChannel.sendMessage(":wave: Hello I am AleeBot thanks for inviting me to your server for help type `"+ config.prefix +"help`.")

});



client.on("guildDelete", guild => {

  // this event triggers when the bot is removed from a guild.

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);


});


client.on("message", function(message){
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
  let commandFile = require(`./commands/${command}.js`);
  commandFile.run(client, message, args, config);
} catch (err) {
  console.error(err);
}

/*	if (wordFilter(message.content))
	{
		message.delete();
		client.channels.get('318874545593384970').sendMessage(":information_source: " + message.author.username + " just swore!");
		console.log("[INFO] " + message.author.username + " just swore!");
		switch (Math.floor(Math.random() * 1000) % 3) {
		message.reply("You have been caught swearing.");
		message.author.send("You have been caught swearing in AleeArmy Community.");
	} */

 });

 process.on('unhandledRejection', function(err, p) {
   console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});

 client.login (config.abtoken).catch(function() {
       console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
   });
