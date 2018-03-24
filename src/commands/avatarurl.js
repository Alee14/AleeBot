module.exports.run = async (client, message) => {
    message.reply(message.author.avatarURL);
};
  
exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'avatarurl',
  description: 'Sends you your avatar picture.',
  usage: 'avatarurl',
  category: '- Fun Commands',
};
