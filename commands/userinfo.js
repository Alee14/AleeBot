/** **************************************
 *
 *   UserInfo: Command for AleeBot
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
module.exports.run = async (client, message) => {
	const Discord = require('discord.js');
	const embed = new Discord.MessageEmbed()
		.setAuthor(message.author.tag, message.author.avatarURL())
		.setDescription('User Information')
		.setThumbnail(message.author.avatarURL())
		.addField('Names', '**Username:** ' + message.author.username + '\n**Current Nickname:** ' + message.member.displayName)
		.addField('Identity', `**User ID:** ${message.author.id} `)
		.addField('Create and Join Times', '**Created At:** ' + message.member.user.createdAt.toUTCString() + '\n**Joined Guild At:** ' + message.member.joinedAt.toUTCString())
		.setColor('#1fd619');
	await message.channel.send({embed});

};

exports.conf = {
	aliases: ['uinfo'],
	guildOnly: false,
};
exports.help = {
	name: 'userinfo',
	description: 'Tells your info.',
	usage: 'userinfo',
	category: '- Information Commands',
};
