/****************************************
 * 
 *   SetMoney: Command for AleeBot
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
module.exports.run = async (client, message, args) => {
    const { RichEmbed } = require('discord.js');
    const economy = require('discord-eco')
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("It looks like that you don't have the permissions to set your money.")

    if (!args[0]) {
        message.reply('You need a amount.');
        return;
    }

    if(isNaN(args[0])) {
        message.reply("Please make sure it's a number.");
        return;
    }
    
    let defineduser = '';
    if (!args[1]) {
        defineduser = message.author.id;
    } else {
        let firstMentioned = message.mentions.users.first();
        defineduser = firstMentioned.id;

    }

    economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => {
        message.reply(`User defined has ${args[0]} dollars added or removed to their account.`)
    });
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'setmoney',
    description: 'Sets money.',
    usage: 'setmoney [amount] [user]',
    category: '- Economy Commands',
  };
  