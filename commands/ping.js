module.exports.run = async (client, message) => {
  message.reply('**PONG!** :ping_pong: ' + Math.round(client.ping) + ' ms');
};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'ping',
  description: 'Ping the bot.',
  usage: 'ping',
  category: '- General Commands',
};
