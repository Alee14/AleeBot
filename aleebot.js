/****************************************
 *
 *   AleeBot for AleeArmy Community and other servers
 *   Copyright (C) 2017 AleeCorp
 *
 *   This script is made by Alee14 and other people.
 *   Some stuff was made by swawesome95 (no longer a dev), Rain and AKidFromTheUK.
 *   Please say thanks to swawesome95 to laying the basics of this bot, and Rain for improving some of the code.
 *
 * *************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./absettings.json');

const prefix = "ab:";
var ver = "1.0.8";
var logsChannel = "318874545593384970";

client.on('ready', () => {
       console.log("[SUCCESS] AleeBot is now ready! Running version "+ ver +"!");
       client.user.setGame(`on ${client.guilds.size} servers`);
   });
//Only works for AleeAmry Community I need someone to work it for Public and it's disabled because it crashes AleeBot :(
/*client.on("guildMemberAdd", function(member) {
	member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " Welcome to the AleeArmy!");
});

client.on("guildMemberRemove", function(member) {
	member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " Nice knowing you bye...");
});*/

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

  client.user.setGame(`on ${client.guilds.size} servers`);

});



client.on("guildDelete", guild => {

  // this event triggers when the bot is removed from a guild.

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);

  client.user.setGame(`on ${client.guilds.size} servers`);

});


client.on("message", function(message){
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
/*	if (wordFilter(message.content))
	{
		message.delete();
		client.channels.get('318874545593384970').sendMessage(":information_source: " + message.author.username + " just swore!");
		console.log("[INFO] " + message.author.username + " just swore!");
		switch (Math.floor(Math.random() * 1000) % 3) {
		message.reply("You have been caught swearing.");
		message.author.send("You have been caught swearing in AleeArmy Community.");
	} */

	 if (command === 'help'){
		 var embed = new Discord.RichEmbed()
			.addField('Commands for AleeBot!\n\n',
			'**'+prefix+'profile** Shows your profile pic in a image.\n' +
			'**'+prefix+'git** Shows the repo of AleeBot.\n' +
			"**"+prefix+"ping** Type this command and you'll see ;).\n" +
			'**'+prefix+'owner** Shows who made this bot.\n' +
			'**'+prefix+'suggest** You suggest things (working progress).\n' +
      '**'+prefix+'userinfo** Tells you your info about you.\n' +
      '**'+prefix+'botinvite** Lets you bring AleeBot to your server.\n' +
      '**'+prefix+'serverinvite** Invites you to the AleeArmy Server.\n' +
      '**'+prefix+'mod** (For staff only) Displays the commands for moderation.\n', true)
      .setFooter("AleeBot Copyright 2017. The version that AleeBot's running is " + ver + "!")
			.setColor("#7af442")
			message.channel.sendEmbed(embed);

	}

    if(command === 'profile'){
        message.reply(message.author.avatarURL);
    }

    if(command === 'git'){
        message.channel.send ('Here is the github repo: https://github.com/AleeCorp/AleeBot');
    }

    if(command === 'ping'){
        message.reply('Pong! :ping_pong:');
    }

    if(command === 'owner'){
		message.channel.send ('The person who made this bot is Alee14#9928!');
    }

    if(command === 'suggest'){
        message.reply('Sorry this feature is still being worked on :(');
    }

    if(command === 'userinfo'){
         var embed = new Discord.RichEmbed()
         .setAuthor(message.author.username)
         .setDescription("This is your user info!")
         .setColor("#7af442")
         .addField("Username", `${message.author.username}#${message.author.discriminator}`)
         .addField("Created At", message.author.createdAt)
   			 message.channel.sendEmbed(embed);

    }

    if(command === 'serverinfo'){
      var embed = new Discord.RichEmbed()
      .addField("Coming soon!")
      .setColor("#7af442")
      message.channel.sendEmbed(embed);
    }

    if (command === 'botinvite'){
      message.reply(':arrow_left: Look at your DMs.');
      message.author.sendMessage("AleeBot on your server? Great! Here's the link: https://goo.gl/KDQyrp");
    }

    if (command === 'serverinvite'){
      message.reply(':arrow_left: Look at your DMs.');
      message.author.sendMessage("You want a invite to the AleeArmy server? Here's the link: https://discord.gg/JqgXrAJ");

    }

    if(command === 'mod'){
    //  if(!message.member.roles.some(r=>["Admin", "Moderator","Co-Owner"].includes(r.name)) )
    //  return message.reply("Hey! Your not a Co-Owner/Admin/Moderator");
      message.reply("We're working on the moderation feature if you want to help do **"+prefix+"git** then start a git pull request. ")
      /*message.channel.send ('```Commands for Staff!\n\n' +
                  'ab:kick Kicks people\n' +
                  'ab:ban Bans People\n' +
                  "ab:rm Removes the message with a amount\n" +
                  'Please note that we are still working on this feature!```');*/
    }

 });

 process.on('unhandledRejection', function(err, p) {
   console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});

 client.login (config.token).catch(function() {
       console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
   });
