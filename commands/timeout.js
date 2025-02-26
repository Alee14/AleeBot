/** **************************************
 *
 *   Jail: Command for AleeBot
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
	const { MessageEmbed } = require('discord.js');

	if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('It looks like that you don\'t have the permissions to jail members.');
	if (!message.guild.members.cache.get(client.user.id).permissions.has('MANAGE_ROLES')) return message.reply('Uhh... I don\'t have permission to jail members.');

	if (!args[1]) message.reply('Determine the length of the timeout...');
	if (!args[2]) message.reply('Determine the reason of the timeout...');

	const member = message.mentions.members.first();
	if (!member) return await message.reply('Uhh... Please mention a member first.');

	const timeoutEmbed = new MessageEmbed()
	.setDescription(`${member.user.tag} just got timed out!`)
	.addField('Length', `${args[1]} minute(s)`)
	.addField('Reason', args[2])
	.setColor('#ec2727')
	member.timeout(args[1] * 60 * 1000, args[2]).then(message.reply({embeds: [timeoutEmbed]}));
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'timeout',
	description: 'Times out a member',
	usage: 'timeout [user]',
	category: '- Moderation Commands',
};
