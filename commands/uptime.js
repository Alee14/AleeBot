module.exports.run = async (client, message) => {

  let uptime = parseInt(client.uptime);
  uptime = Math.floor(uptime / 1000);
  let uptimeMinutes = Math.floor(uptime / 60);
  const minutes = uptime % 60;
  let hours = 0;
  while (uptimeMinutes >= 60) {
    hours++;
    uptimeMinutes = uptimeMinutes - 60;
  }
  const uptimeSeconds = minutes % 60;
  message.channel.send(':clock3: AleeBot has been up for ' + hours + ' hours, ' + uptimeMinutes + ' minutes, and ' + uptimeSeconds + ' seconds.');

};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'uptime',
  description: 'Displays Uptime.',
  usage: 'uptime',
  category: '- General Commands',
};
