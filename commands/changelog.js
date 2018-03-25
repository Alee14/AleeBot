/********************************
 * 
 * Ban: Command for AleeBot
 * 
 * Copyright (c) 2018 AleeCorp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************/
module.exports.run = async (client, message) => {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor('AleeBot ' + '2.4.0 Beta ' + 'Changelog', 'https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048')
    .setDescription('What\'s new in AleeBot 2.4?')
    .addField('[>] Suggestion Command!','Suggest command is only for exclusive servers!', true)
    .addField('[>] Ban reasons!','For now the ban command is broken but we\'ll fix it soon!', true)
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
