/** **************************************
 *
 *   Ban: Command for AleeBot
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
	const Discord = require('discord.js');
	const mreason = args.join(' ').slice(22);
	if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('It looks like that you don\'t have the permissions to ban people.');
	if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Uhh... I don\'t have permission to ban members.');
	const member = message.mentions.members.first();
	if (!member) return message.reply('Uhh... Please mention a member first.');
	member.ban(`Banned by ${message.author.tag} Reason: ` + mreason);
	const embed = new Discord.MessageEmbed()
		.setTitle('User Banned!')
		.setColor('#1fd619')
		.addField('**User:**', `${member.user.tag}`)
		.addField('**Reason:**', `\`\`\`${mreason}\`\`\``);
	await message.channel.send({embed});
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'ban',
	description: 'Bans a member',
	usage: 'ban [user] [reason]',
	category: '- Moderation Commands',
};
