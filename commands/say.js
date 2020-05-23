/** **************************************
 *
 *   Say: Command for AleeBot
 *   Copyright (C) 2017-2020 Alee Productions
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
  if (!['242775871059001344'].includes(message.author.id)) return message.reply('Nope! You need the person who created this bot to use this command.');
  const absay = args.join(' ');
  message.delete().catch();
  message.channel.send(absay);
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'say',
  description: 'You can control AleeBot now!',
  usage: 'say [context]',
  category: '- Owners Only',
};
