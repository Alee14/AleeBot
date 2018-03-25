module.exports.run = async (client, message) => {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor('AleeBot ' + '2.3.0 ' + 'Changelog', 'https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048')
    .setDescription('What\'s new in AleeBot 2.3?')
    .addField('[>] Purge Command!','Purge command only for moderators!', true)
    .addField('[>] Say Command!','Say command is only for the person who created the bot!', true)
    .setFooter('AleeCorp Copyright 2017')
    .setColor('#1fd619');
  message.channel.sendEmbed(embed);

};

exports.conf = {
  aliases: [],
  guildOnly: true,
};
exports.help = {
  name: 'changelog',
  description: 'What\'s new',
  usage: 'changelog',
  category: '- General Commands',
};
