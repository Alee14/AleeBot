/** **************************************
 *
 *   Kick: Command for AleeBot
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
	const Discord = require('discord.js');
	const mreason = args.join(' ').slice(22);
	if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('It looks like that you don\'t have the permissions to kick people.');
	if (!message.guild.members.cache.get(client.user.id).permissions.has('KICK_MEMBERS')) return message.reply('I don\'t have permission to kick members.');
	const member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a member first.');
	await member.kick(`Kicked by ${message.author.tag} for ${mreason}.`);
	const kickEmbed = new Discord.MessageEmbed()
		.setTitle('User Kicked!')
		.setColor('#1fd619')
		.addField('**User:**', `${member.user.tag}`)
		if (mreason) return kickEmbed.addField('**Reason:**', `\`\`\`${mreason}\`\`\``);
	await message.channel.send({embeds: [kickEmbed]});
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'kick',
	description: 'Kicks a member',
	usage: 'kick [user]',
	category: '- Moderation Commands',
};
