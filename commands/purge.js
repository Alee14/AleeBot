/****************************************
 * 
 *   Purge: Command for AleeBot
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
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("It looks like that you don't have the permissions to delete messages.")
    if (isNaN(args[0])) return message.reply("Please put the valid number of messages to purge.");

    if (args[0] > 100) return message.channel.send("Please put a number less than 100.");

    message.channel.bulkDelete(args[0])
    .then( messages => message.channel.send(`Successfully deleted ${messages.size} messages.`))
  };
  
  exports.conf = {
    aliases: ['rm'],
    guildOnly: false,
  };
  exports.help = {
    name: 'purge',
    description: 'Removes messages in a bulk.',
    usage: 'purge [number]',
    category: '- Moderation Commands',
  };
  