/****************************************
 * 
 *   AleeBot for AleeArmy Community and other servers
 *   Copyright (C) 2017 AleeCorp
 *
 *   This script is made by Alee14 and other people.
 *   Some stuff was made by Victor Tran (vicr123), swawesome95 (no longer a dev), Rain and AKidFromTheUK.
 *   Please say thanks to swawesome95 to laying the basics of this bot, and Rain for improving some of the code.
 *   
 * *************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./abtoken.json');
   
var prefix = "ab:";
var ver = "1.0.6";
var logsChannel = "318874545593384970";

client.on('ready', () => {
       console.log("[SUCCESS] AleeBot is now ready! Running version "+ ver +"!");
    client.setInterval(setGame, 300000);
    setGame();
   });
//Only works for AleeAmry Community I need someone to work it for Public and it's disabled because it crashes AleeBot :(
/*client.on("guildMemberAdd", function(member) {
	member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " Welcome to the AleeArmy!");
});

client.on("guildMemberRemove", function(member) {
	member.guild.channels.find("name", "welcomes-and-byes").sendMessage(member.toString() + " Nice knowing you bye...");
});*/
   
	function setGame() {
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
	
    switch (Math.floor(Math.random() * 1000) % 27) {
        case 0:
            presence.game.name = "with ban buttons";
            break;
        case 1:
            presence.game.name = "AleeOS or ShiftOS";
            break;
        case 2:
            presence.game.name = "Annoy Alee";
            break;
        case 3:
            presence.game.name = "with an internal bug";
            break;
        case 4:
            presence.game.name = "in the forest";
            break;
        case 5:
            presence.game.name = "bot games";
            break;
        case 6:
            presence.game.name = "with binary code";
            break;
        case 7:
            presence.game.name = "being very cool";
            break;
        case 8:
            presence.game.name = "with supa weapon";
            break;
        case 9:
            presence.game.name = "solving puzzles";
            break;
        case 10:
            presence.game.name = "rewinding time";
            break;
        case 11:
            presence.game.name = "checking archives";
            break;
        case 12:
            presence.game.name = "being unbreakable";
            break;
        case 13:
            presence.game.name = "sandwiches";
            break;
        case 14:
            presence.game.name = "drawing pokemon";
            break;
        case 15:
            presence.game.name = "obsessing";
            break;
        case 16:
            presence.game.name = "the waiting game";
            break;
        case 17:
            presence.game.name = "da VMware World!";
            break;
        case 18:
            presence.game.name = "with hexagons";
            break;
        case 19:
            presence.game.name = "with music";
            break;
        case 20:
            presence.game.name = "being a ninja";
            break;
        case 21:
            presence.game.name = "if money cant buy happiness then why is it so fabulous";
            break;
        case 22:
            presence.game.name = "being awesome";
            break;
        case 23:
            presence.game.name = "AleeCraft";
            break;
        case 24:
            presence.game.name = "AleeChat";
            break;
        case 25:
            presence.game.name = "For help ab:help";
            break;
	case 26:
	    presence.game.name = "trying to DJ";
	    break;
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

client.on("message", function(message){
/*	if (wordFilter(message.content))
	{
		message.delete();
		client.channels.get('318874545593384970').sendMessage(":information_source: " + message.author.username + " just swore!");
		console.log("[INFO] " + message.author.username + " just swore!");
		switch (Math.floor(Math.random() * 1000) % 3) {
		message.reply("You have been caught swearing.");
		message.author.send("You have been caught swearing in AleeArmy Community.");
	} */
	
	 if (message.content === prefix + 'help'){
		 var embed = new Discord.RichEmbed()
			.addField('Commands for AleeBot!\n\n', 
			'**ab:profile** Shows your profile pic in a image\n' +
			'**ab:git** Shows the repo of AleeBot\n' +
			"**ab:ping** Type this command and you'll see ;)\n" +
			'**ab:owner** Shows who made this bot\n' +
			'**ab:suggest** You suggest things (working progress)\n\n' + 
			"**The version that AleeBot's running is " + ver + "!**", true)
			.setColor(0x00FFFF)
			message.channel.sendEmbed(embed);
	}
	
    if(message.content === prefix + 'profile'){
        message.reply(message.author.avatarURL);
    }

    if(message.content === prefix + 'git'){
        message.channel.send ('Here is the github repo: https://github.com/AleeCorp/AleeBot');
    }

    if(message.content === prefix + 'ping'){
        message.reply('Pong! :ping_pong:');
    }

    if(message.content === prefix + 'owner'){
		message.channel.send ('The person who made this is Alee14#9928!');
    }


    if(message.content === prefix + 'suggest'){
        message.reply('Sorry this feature is still being worked on :(');
    }
	

 });

 
 client.login (config.token).catch(function() {
       console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
   });
