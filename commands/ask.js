module.exports.run = async (client, message, args) => {
    let abaskanswer = [
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
  };
  
  exports.conf = {
    aliases: ['8ball'],
    guildOnly: true,
  };
  exports.help = {
    name: 'ask',
    description: 'Give AleeBot a question!',
    usage: 'ask [args]',
    category: '- Fun Commands',
  };
  