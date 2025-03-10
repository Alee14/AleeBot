/** **************************************
 *
 *   Nick: Command for AleeBot
 *   Copyright (C) 2017-2021 Alee Productions
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
    if (!message.guild.members.cache.get(client.user.id).permissions.has('MANAGE_NICKNAME')) return message.reply('**ERROR:** I can\'t change nicknames. (Check permissions)');
    const nick = args.join(' ');
    message.member.setNickname(nick);
    message.channel.send(`Alright! I changed your nickname to \`${nick}\``);   
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'nick',
	description: 'Changes nickname.',
	usage: 'nick [context]',
	category: '- General Commands',
};
