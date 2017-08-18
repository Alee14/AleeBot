const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
  //This command was ported from AstralMod

message.channel.send("<@" + message.author.id + "> :right_facing_fist: " + args);


commandProcessed = true;
}
exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'attack',

  description: 'If your mad at someone if they messed up use this command and mention them.',

  usage: 'attack [args]'

};
