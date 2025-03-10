/** **************************************
 *
 *   avatarurl: Command for AleeBot
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
module.exports.run = async (client, message) => {
	if(!message.mentions.users.first()) {
		message.reply(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }));
	} else {
		let targetMember;
		targetMember = message.mentions.users.first();
		message.reply(targetMember.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
	}
};

exports.conf = {
	aliases: ['pic'],
	guildOnly: false,
};
exports.help = {
	name: 'avatarurl',
	description: 'Sends you your avatar picture.',
	usage: 'avatarurl',
	category: '- Fun Commands',
};
