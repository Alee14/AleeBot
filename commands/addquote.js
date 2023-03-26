/** **************************************
 *
 *   AddQuote: Command for AleeBot
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
const quoteDB = require('../models/quote');
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
	if (!['242775871059001344'].includes(message.author.id)) return message.reply('**This command is disabled due to a new system being implemented.**');
	try {
		let newAuthor;
		let newAuthorImage;
		let newQuote;
		let newYear;

		const quote = await quoteDB.create({
			author: newAuthor,
			authorImage: newAuthorImage,
			quote: newQuote,
			year: newYear
		})

		const setupEmbed = new Discord.MessageEmbed()
			.setTitle('AleeBot Quote Setup', client.user.avatarURL())
			.setDescription('Input the data to the following embed')
			.addField('Author', newAuthor, true)
			.addField('Author Image (URL)', newAuthorImage, true)
			.addField('Quote', newQuote, true)
			.addField('Year', newYear, true);

		message.reply({embeds: [setupEmbed]});
	} catch (error) {
		console.log(error)
	}
};

exports.conf = {
	aliases: [],
	guildOnly: true,
};
exports.help = {
	name: 'addquote',
	description: 'Sets the guild prefix.',
	usage: 'addquote [author] [authorImage] [quote] [year]',
	category: '- Quote Commands',
};

