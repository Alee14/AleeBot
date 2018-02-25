module.exports.run = async (client, message) => {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor('AleeBot ' + '2.0.0 ' + 'Changelog', 'https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048')
    .setDescription('What\'s new in AleeBot 2.0?')
    .addField('+ Rewritten command handler (Written by jtsshieh big thanks to him!)', true)
    .addField('+ New uptime command (Thanks to Rain)', true)
    .addField('? Some commands are the same from 1.x', true)
    .setFooter('AleeCorp Copyright 2017')
    .setColor('#1fd619');
  message.channel.sendEmbed(embed);

};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'changelog',
  description: 'What\'s new',
  usage: 'changelog',
  category: '- General Commands',
};
