/****************************************
 * 
 *   Leave: Command for AleeBot
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
    if (!message.member.voiceChannel) return message.reply('You need a voice channel to perform this action.');

    if (!message.guild.me.voiceChannel) return message.reply('Error: The bot isn\'t connected to a voice channel.')

    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.reply('Error: You aren\'t connected in the same voice channel as the bot...');

    message.guild.me.voiceChannel.leave();

    message.channel.send("Leaving channel...")

  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'leave',
    description: 'Leaves voice chat.',
    usage: 'leave',
    category: '- Music Commands',
  };