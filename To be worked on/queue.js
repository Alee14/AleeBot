/****************************************
 * 
 *   Queue: Command for AleeBot
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

module.exports.run = async (client, message, args, ops) => {
 
    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.reply('Currently, there isn\'t any music playing in this guild.');

    let queue = fetched.queue
    let nowPlaying = queue[0];

    let resp = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

    for (var i = 1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester}*\n`
    }

    message.channel.send(resp);

  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'queue',
    description: 'Checks what music is in queue.',
    usage: 'queue',
    category: '- Music Commands',
  };