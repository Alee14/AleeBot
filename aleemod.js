const Discord = require('discord.js');
 const client = new Discord.Client();
   
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
           var exp = msg.search(/(\s|^)(shit|shite|shitty|bullshit|fuck|fucking|ass|penis|cunt|faggot|damn|wank|wanker|nigger|bastard|piss|vagina|thisisnotarealwordbutatestword)(\s|$)/i);
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
       
       if (msg.startsWith("mod:")) {
           //Check for moderator/admin permission
           
           //Moderator ID: 285427075043819530
           //Admin ID:     259877121793458179
           if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Moderators")) { 
               var command = msg.substr(4);
               switch (command) {
                   case "ping":
                       message.channel.send('<:vtBoshyTime:280178631886635008> PONG! I want to play pong too... :\'(');
                       break;
                   case "pong":
                       message.channel.send('<:vtBoshyTime:280178631886635008> PING!');
                       break;
                   case "filter":
                       if (expletiveFilter) {
                           message.channel.send(':arrow_forward: Expletive Filter: on');
                       } else {
                           message.channel.send(':arrow_forward: Expletive Filter: off');
                       }
                       message.delete();
                       break;
                   case "filter on":
                       if (expletiveFilter) {
                           message.channel.send(':arrow_forward: Expletive Filter is already on.');
                       } else {
                           expletiveFilter = true;
                           message.channel.send(':white_check_mark: Expletive Filter is now turned on.');
                           console.log("Expletive Filter is now on.");
                       }
                       message.delete();
                       break;
                   case "filter off":
                       if (expletiveFilter) {
                           expletiveFilter = false;
                           message.channel.send(':white_check_mark: Expletive Filter is now turned off.');
                           console.log("Expletive Filter is now off.");
                       } else {
                           message.channel.send(':arrow_forward: Expletive Filter is already off.');
                       }
                       message.delete();
                       break;
                   default:
                       if (command.startsWith("uinfo")) {
                           if (message.channel.id == 277923386959855626) {
                               message.channel.send(':no_entry_sign: Not ready yet. Check back soon!');
                           } else {
                               message.channel.send(':no_entry_sign: NO: Unable to use this command in this channel.');
                           }
                       }
               }
           } else {
               message.reply(':no_entry_sign: NO: What? You\'re not an admin! Why would you be allowed to type that!?');
           }
       }
       
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
            presence.game.name = "around";
            break;
        case 5:
            presence.game.name = "bot games";
            break;
        case 6:
            presence.game.name = "with ones and zeroes";
            break;
        case 7:
            presence.game.name = "being a stepswitcher";
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
            presence.game.name = "TimeHACK";
            break;
        case 24:
            presence.game.name = "TiemHARK";
            break;
        case 25:
            presence.game.name = "harking tiem";
            break;
		case 26:
			presence.game.name = "trying to DJ";
			break;
    }
client.user.setPresence(presence);
    client.user.setPresence(presence);
}

   client.login('MzE5MTI2ODI2NDczNzUwNTI4.DBCmKg.VGHbwB3-1GiDuybYi-rIam6LDoM').catch(function() {
       console.log("[ERROR] Login failed.");
   });
