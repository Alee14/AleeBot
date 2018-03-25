module.exports.run = async (client, message) => {
  message.author.send('I can see you want to contribute to this project.\nHere\'s the link: https://github.com/AleeCorp/AleeBot');
};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'git',
  description: 'Get the git info.',
  usage: 'git',
  category: '- General Commands',
};
