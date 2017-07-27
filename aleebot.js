/****************************************
 * 
 *   AleeBot for AleeArmy Community and other servers
 *   Copyright (C) 2017 AleeCorp
 *
 *   This script is made by Alee14 and other people.
 *   Some stuff was made by Victor Tran (vicr123), swawesome95 (no longer a dev), and Rain.
 *   Please say thanks to swawesome95 to laying the basics of this bot, thanks to vicr123 for
 *   letting me use some of his source code, and Rain for improving some of the code.
 *   
 * *************************************/
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./abtoken.json');

  client.on('ready', () => {
       console.log("[SUCCESS] AleeBot is now ready!");
    client.setInterval(setGame, 300000);
    setGame();
   });
   
var prefix = "ab:";
var ver = "1.0.4";
var logsChannel = "318874545593384970";

	function setGame() {
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
	
    switch (Math.floor(Math.random() * 1000) % 27) {
        case 0:
            presence.game.name = "with ban buttons";
            break; //SCRUATCHO
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
    if(message.content === prefix + 'profile'){
        message.reply(message.author.avatarURL);
    }

    if(message.content === prefix + 'git'){
        message.channel.send ('Here is the github repo: https://github.com/AleeCorp/AleeBot-AleeMod');
    }

    if(message.content === prefix + 'ping'){
        message.reply('Pong! :ping_pong:');
    }

    if(message.content === prefix + 'help'){
        message.channel.send ('```Commands for AleeBot!\n\n' +
			      'ab:profile\n' +
			      'ab:git\n' +
			      'ab:ping\n' +
			      'ab:owner\n' +
			      'ab:suggest\n' +
				  'ab:version ```');
    }

    if(message.content === prefix + 'owner'){
		message.channel.send ('The person who made this is Alee14#9928!');
    }


    if(message.content === prefix + 'suggest'){
        message.reply('Sorry this feature is still being worked on :(');
    }

    if(message.content === prefix + 'version') {
	message.channel.send("AleeBot's version is " + ver + ".");    
    }

 });

 process.on('unhandledRejection', function(err, p) {
    console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});
 
 client.login (config.token).catch(function() {
       console.log("[ERROR] Login failed.");
   });
