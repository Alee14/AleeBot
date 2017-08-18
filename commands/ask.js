const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
var abaskanswer = [
  "Yes.",
  "Nope. Just kidding :P",
  "Definitely!",
  "No.",
  "Yep. Just kidding :P",
  "I doubt it.",
  "Maybe?",
  "I don't know?",
  "Hmm let me think :thinking:"
];
if (args[1]) {
   message.channel.sendMessage(abaskanswer[Math.floor(Math.random() * abaskanswer.length)]);
} else {
  message.channel.sendMessage("Sorry, I don't know what your saying.")
}
}
exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'ask',

  description: 'Go ask AleeBot a question let\'s see what AleeBot\'s response!',

  usage: 'ask [args]'

};
