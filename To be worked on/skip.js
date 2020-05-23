/** **************************************
 *
 *   Skip: Command for AleeBot
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
  const fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.reply('Currently, there isn\'t any music playing in this guild.');

  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.reply('Sorry, you are currently not in the same channel as the bot.');

  const userCount = message.member.voiceChannel.members.size;

  const required = Math.ceil(userCount/2);

  if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

  if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.reply(`Sorry, you have already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);

  fetched.queue[0].voteSkips.push(message.member.id);

  ops.active.set(message.guild.id, fetched);

  if (fetched.queue[0].voteSkips.length >= required) {
    message.channel.send('Successfully skipped song!');

    return fetched.dispatcher.emit('finish');
  }

  message.channel.send(`Successfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'skip',
  description: 'Skips a music.',
  usage: 'skip',
  category: '- Music Commands',
};
