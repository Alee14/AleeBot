/****************************************
 * 
 *   LeaveGuild: Command for AleeBot
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
    if (!['242775871059001344', message.guild.owner.user.id].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot or the owner of this guild to use this command.');
    message.channel.send('Alright, I\'m leaving the server now. Bye everyone!')
    message.guild.leave();
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'leaveguild',
    description: 'Makes the bot leave the server',
    usage: 'leaveguild',
    category: '- Owners Only',
  };
  