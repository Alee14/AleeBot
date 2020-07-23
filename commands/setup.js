/****************************************
 * 
 *   Setup: Command for AleeBot
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
	if (!['242775871059001344', message.guild.owner.user.id].includes(message.author.id)) return message.reply(':warning: You must be a server owner or be the creator of the bot to access this command.');
	message.reply('Look at your DMs.');
	//message.reply("This feature is coming soon. Stay tuned!");
	const Discord = require('discord.js');
	const setupEmbed = new Discord.MessageEmbed()
		.setTitle('AleeBot Setup', client.user.avatarURL())
		.setDescription('Select the options')
		.addField('Chat Logs', 'placeholder', true)
		.addField('Chat Logs', 'placeholder', true)
		.addField('Chat Logs', 'placeholder', true);

	message.author.send(setupEmbed);
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'setup',
	description: 'Setting up AleeBot.',
	usage: 'setup',
	category: '- Settings Commands',
};