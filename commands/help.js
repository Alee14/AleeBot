/** **************************************
 *
 *   Help: Command for AleeBot
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
const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message) => {
	const categories = [];
	const commands = Array.from(client.commands.keys());
	const settings = require('../storage/settings.json');
	commands.forEach(function(x) {
		if (!categories.includes(client.commands.get(x).help.category)) {
			categories.push(client.commands.get(x).help.category);
		}
	});

	const prefixes = JSON.parse(fs.readFileSync('./storage/prefixes.json', 'utf8'));

	if (!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefixes: settings.prefix,
		};
	}

	const prefix = prefixes[message.guild.id].prefixes;
	if (!message.guild.members.cache.get(client.user.id).permissions.has('EMBED_LINKS')) return message.reply('ERROR: AleeBot doesn\'t have the permission to send embed links, please enable them to use the full help.');
	const embed = new Discord.MessageEmbed()
		.setAuthor('AleeBot ' + require('../storage/settings.json').abVersion + ` Help`, client.user.avatarURL())
		.setDescription('Every command you input into AleeBot is `' + prefix + '`')
		.setFooter(`Currently serving on ${client.guilds.cache.size} servers`)
		.setColor('#1fd619')

	categories.forEach(function(x) {
		let cat = '';
		commands.forEach(function(command) {
			if (client.commands.get(command).help.category == x) {
				cat = cat + command + '\n';
			}
		});
		embed.addField(x, cat, true);
	});

	await message.channel.send({embeds: [embed]});
};

exports.conf = {
	aliases: ['h'],
	guildOnly: false,
};
exports.help = {
	name: 'help',
	description: 'Displays all the commands or a page with information for 1 command.',
	usage: 'help (command:command-name)',
	category: '- General Commands',
};
