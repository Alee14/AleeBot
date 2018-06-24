/****************************************
 * 
 *   Pay: Command for AleeBot
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
    const db = require('quick.db');
    if (!message.mentions.members.first()) return message.reply('Please mention a user...');

    let targetMember = message.mentions.members.first(),
        amount = parseInt(args.join(' ').replace(targetMember, ''));
        
    if (isNaN(amount)) return message.reply('Please define an amount.')

    let targetBalance = await db.fetch(`userBalance_${targetMember.id}`),
        selfBalance = await db.fetch(`userBalance_${message.author.id}`);

    if (targetBalance === null) {
        db.set(`userBalance_${targetMember.id}`, 0);
        targetBalance = 0
    } 

    if (selfBalance === null) {
        db.set(`userBalance_${message.author.id}`, 0);
        selfBalance = 0
    } 

    if (amount > selfBalance) return message.reply('Sorry you don\'t have enough money.');

    db.add(`userBalance_${targetMember.id}`, amount);
    db.subtract(`userBalance_${message.author.id}`, amount);

    message.reply(`Successfully transfered $${amount} to ${targetMember.user}`)
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'pay',
    description: 'You can pay others!',
    usage: 'pay [@user] [interger]',
    category: '- Economy Commands',
  };