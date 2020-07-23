/** **************************************
 *
 *   Suggest: Command for AleeBot
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
	if (message.guild.id != '243022206437687296') return message.reply('This is a ALP exclusive command.');
	const {MessageEmbed} = require('discord.js');
	client.channels.cache.get('427495678390960148').send(
		new MessageEmbed()
			.setColor('#1fd619')
			.setTitle('Suggestion')
			.setDescription('This is a suggestion from '+ message.author.username +' please react to it using the following emojis.')
			.addField('Suggestion Contents', args.join(' ')),
	).then((message) => {
		message.react('\u2705');
		message.react('\u274E');
	});
	message.reply('Your suggestion has been shown in the suggestions channel.');
};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'suggest',
	description: 'Suggest a feature in ALP.',
	usage: 'suggest [suggestion]',
	category: '- ALP Exclusive Commands',
};
