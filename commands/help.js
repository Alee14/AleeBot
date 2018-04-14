/****************************************
 * 
 *   Help: Command for AleeBot
 *   Copyright (C) 2018 AleeCorp
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * *************************************/
const Discord = require('discord.js');
module.exports.run = async (client, message) => {
  const categories = [];
  const commands = Array.from(client.commands.keys());

  commands.forEach(function(x) {
    if (!categories.includes(client.commands.get(x).help.category)) {
      categories.push(client.commands.get(x).help.category);
    }
  });

  const embed = new Discord.RichEmbed()
    .setTitle('AleeBot Help')
    .setAuthor('AleeBot 2.6.0' + ` Help and on ${client.guilds.size} servers`, 'https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048')
    .setDescription('Every command you input into AleeBot is `' + require('../absettings.json').prefix + '`')
    .setColor('#1fd619')
    .setFooter('AleeCorp Copyright 2018, Licensed with GPL-3.0');

  categories.forEach(function(x) {
    let cat = '';
    commands.forEach(function(command) {
      if (client.commands.get(command).help.category == x) {
        cat = cat + command + '\n';
      }
    });
    embed.addField(x, cat);
  });

  await message.channel.send({ embed });
};

exports.conf = {
  aliases: ['h'],
  guildOnly: false,
};
exports.help = {
  name: 'help',
  description: 'Displays all the commands or a page with information for 1 command.',
  usage: 'help (command:command-name)',
  category: '- General Commands',
};
