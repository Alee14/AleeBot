const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
  //This command was ported from AstralMod

message.channel.send("<@" + message.author.id + "> :right_facing_fist: " + args);


commandProcessed = true;
}
