/** **************************************
 *
 *   Daily: Command for AleeBot
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
const db = require('quick.db');
ms = require('parse-ms');

module.exports.run = async (client, message) => {
  const cooldown = 8.64e+7;
  const amount = 100;

  const lastDaily = await db.fetch(`lastDaily_${message.author.id}`);

  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    const timeObj = ms(cooldown - (Date.now() - lastDaily));

    message.reply(`You already collected your money, please wait **${timeObj.hours}h ${timeObj.minutes}m**!`);
  } else {
    message.channel.send(`You have successfully collected $${amount} dollars!`);

    const balance = await db.fetch(`userBalance_${message.author.id}`);

    if (balance == null) {
      db.set(`userBalance_${message.author.id}`, 0);
    }

    db.set(`lastDaily_${message.author.id}`, Date.now());
    db.add(`userBalance_${message.author.id}`, 100);
  }
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'daily',
  description: 'This gives you money everyday.',
  usage: 'daily',
  category: '- Economy Commands',
};
