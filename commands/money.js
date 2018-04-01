/****************************************
 * 
 *   Money: Command for AleeBot
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
module.exports.run = async (client, message) => {
    const { RichEmbed } = require('discord.js');
    const economy = require('discord-eco')
    economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
        const embed = new RichEmbed()
        .setDescription(`**${message.guild.name} Bank**`)
        .addField('Account Holder: ', message.author.username, true)
        .addField('Account Balance: ', i.money, true)
        .setColor('#1fd619')

        message.channel.send({embed})
    })
  };
  
  exports.conf = {
    aliases: ['bal', 'balance'],
    guildOnly: false,
  };
  exports.help = {
    name: 'money',
    description: 'Displays your balance.',
    usage: 'money',
    category: '- Economy Commands',
  };
  