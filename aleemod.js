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
const config = require('./amtoken.json');

   
   var expletiveFilter = true;
   var lastMessages = {};
   var sameMessageCount = {};
   

   client.on('ready', () => {
       console.log("AleeMod is now ready!");
    client.setInterval(setGame, 300000);
    setGame();
   });
   
   client.on('message', message => {
       var msg = message.content;
       if (lastMessages[message.author.id] == msg && sameMessageCount[message.author.id] > 3) {
           console.log("Spam limits kicking in!");
           switch (Math.floor(Math.random() * 1000) % 4) {
               case 0:
                   message.reply("Well... We all heard you.");
                   break;
               case 1:
                   message.reply("Stop typing the same thing! You're like a broken record!");
                   break;
               case 2:
                   message.reply("Hmm... Not sure if you'd actually say the same thing more than three times in public.");
                   break;
               case 3:
                   message.reply("Is that the only phrase you know? Can you try typing something else?");
                   break;
           }
           message.delete();
           return;
       }
       
       if (expletiveFilter) {
           var exp = msg.search(/(\s|^)(shit|shite|shitty|bullshit|fuck|fucking|ass|penis|cunt|faggot|damn|wank|wanker|nigger|bastard|piss|vagina|thisisnotarealwordbutatestword|aleesucks)(\s|$)/i);
           if (exp != -1) { //Gah! They're not supposed to say that!
               switch (Math.floor(Math.random() * 1000) % 5) {
                   case 0:
                       message.reply("Hey! This is not your time to swear.");
                       break;
                   case 1:
                       message.reply("Hey! Let's not have any of that please.");
                       break;
                   case 2:
                       message.reply("Did you just...");
                       break;
                   case 3:
                       message.reply("Cool. Now let's not forget the rules.");
                       break;
                   case 4:
                       message.reply("If I'm not going to delete it, a mod will. Let's save them some work.");
                       break;
               }
               message.delete();
               return;
           }
       }

       //No Caps
       /*    if (msg.match(/[A-Z]/gm) != null && msg.match(/[A-Z]/gm).length > (parseFloat(msg.length) * 0.8)) {
                        switch (Math.floor(Math.random() * 1000) % 6) {
                            case 0:
                                message.reply("Shh...");
                                break;
                            case 1:
                                message.reply("The community likes peace and quiet.");
                                break;
                            case 2:
                                message.reply("Isn't it weird when you're reading... and then you see a bunch of caps?");
                                break;
                            case 3:
                                message.reply("If you're going to type that, why not get out a pen and paper and do it yourself or shout in your head please!");
                                break;
                            case 4:
                                message.reply("DON'T SHOUT IN HERE K THIS IS ME :angry:");
                                break;
                            case 5:
                                message.reply("Whoa whoa, slow down, my friend! No need for raised voices!");
                                break;
                        }
                        message.delete();
                        return;
                    }
                }
            }
	} */
     
       //Spam limiting
       if (lastMessages[message.author.id] != msg) {
           sameMessageCount[message.author.id] = 0;
       }
       lastMessages[message.author.id] = msg
       sameMessageCount[message.author.id]   = 1;
   });
   
   client.on('guildMemberAdd', usr => {
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
            presence.game.name = "being a moderator";
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
            presence.game.name = "harking tiem";
            break;
		case 26:
			presence.game.name = "trying to DJ";
			break;
    }
client.user.setPresence(presence);
}

   client.login(config.token).catch(function() {
       console.log("[ERROR] Login failed.");
   });
