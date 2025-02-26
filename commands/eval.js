/** **************************************
 *
 *   Eval: Command for AleeBot
 *   Copyright (C) 2017-2021 Alee Productions & jtsshieh + PokeWorld
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
	const {MessageEmbed} = require('discord.js');
	const code = args.join(' ');

	let evaled;
	let remove;

	try {
		remove = (text) => {
			if (typeof(text) === 'string') {
				return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
			} else {
				return text;
			}
		};

		evaled = eval(code);

		if (typeof evaled !== 'string') {
			evaled = require('util').inspect(evaled);
		}
	} catch (err) {
		const embed = new MessageEmbed()
			.setAuthor('Eval Error')
			.setDescription('Eval\'s result')
			.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``)
			.addField(':outbox_tray: Output:', `\`\`\`${err}\`\`\``)
			.setFooter('Eval', client.user.avatarURL())
			.setColor('RED');
		return message.channel.send({embeds: [embed]});
	}

	try {
		const embed = new MessageEmbed()
			.setAuthor('Eval Success')
			.setDescription('Eval\'s result')
			.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``)
			.addField(':outbox_tray: Output:', `\`\`\`js\n${remove(evaled)}\n\`\`\``)
			.setFooter('Eval', client.user.avatarURL())
			.setColor('GREEN');

		return message.channel.send({embeds: [embed]});
	} catch (err) {
		const embed = new MessageEmbed()
			.setAuthor('Eval Error')
			.setDescription('Eval\'s result')
			.addField(':inbox_tray: Input:', `\`\`\`js\n${code}\n\`\`\``)
			.addField(':outbox_tray: Output:', `\`\`\`${err}\`\`\``)
			.setFooter('Eval', client.user.avatarURL())
			.setColor('RED');
		return message.channel.send({embeds: [embed]});
	}
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'eval',
	description: 'Evalulates commands.',
	usage: '<code>',
	category: '- Owners Only',
};
