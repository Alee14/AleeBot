/** **************************************
 *
 *   Quote: Command for AleeBot
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
	const quoteDB = require('../models/quote');
	const { MessageEmbed } = require('discord.js');
	let quoteID = args[0];

	if (quoteID === undefined) {
		const quoteList = await quoteDB.findAll({ attributes: ['id'] })
		const random = crypto.getRandomValues(new Uint32Array(1));
		quoteID = quoteList[random[0] % quoteList.length].id;
	}

	const quote = await quoteDB.findOne({ where: { id: quoteID } })


	if (quote) {
		const quoteEmbed = new MessageEmbed()
			.setAuthor({ name: quote.author, iconURL: quote.authorImage })
			.setDescription(quote.quote)
			.setColor('#1fd619')
			.setFooter('- ' + quote.year);

		await message.reply({ content: 'Alright, here\'s your quote.', embeds: [quoteEmbed] })
	} else {
		message.reply('Cannot find quote, specify the correct quote id.');
	}


};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'quote',
	description: 'Tells you quotes',
	usage: 'quote',
	category: '- Quote Commands',
};
