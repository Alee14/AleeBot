/****************************************
 * 
 *   AleeBot and AleeMod for AleeArmy Community
 *   Copyright (C) 2017 Alee14
 *
 *   This script is made by Alee14 and other people.
 *   Some stuff was made by Victor Tran (vicr123) and swawesome95 (no longer a dev).
 *   Please say thanks to swawesome95 to laying the basics of this bot and thanks for vicr123 for
 *   letting me use some of his source code.
 *   
 * *************************************/
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
    if(message.content === 'ab:profile'){
        message.reply(message.author.avatarURL);
    }

 });

client.on('message', message => {
    if(message.content === 'ab:git'){
        message.channel.sendMessage ('Here is the github repo: https://github.com/AleeCorp/AleeBot-AleeMod');
    }

});

client.on('message', message => {
    if(message.content === 'ab:ping'){
        message.reply('Pong! :ping_pong:');
    }

});

client.on('message', message => {
    if(message.content === 'ab:pong'){
        message.reply('Ping! :ping_pong:');
    }

});

client.on('message', message => {
    if(message.content === 'ab:help'){
        message.channel.sendMessage ('```Commands for AleeBot!\n\nab:profile\nab:git\nab:ping\nab:pong\nab:owner```');
    }

});

client.on('message', message => {
    if(message.content === 'ab:owner'){
		message.channel.sendMessage ('The person who made this is Alee14#9928!');
    }

});

  client.on('ready', () => {
       console.log("AleeBot is now ready!");
    client.setInterval(setGame, 300000);
    setGame();
   });
   
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
            presence.game.name = "bending space";
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

 client.login ('token').catch(function() {
       console.log("[ERROR] Login failed.");
   });
// WE NEED DEVELOPERS!!!!!!!!!!
