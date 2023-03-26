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
		quoteID = Math.floor(Math.random() * (quoteList.length - 1)) + 1
	}

	const quote = await quoteDB.findOne({ where: { id: quoteID } })


	if (quote) {
		const embed = new MessageEmbed()
			.setAuthor({ name: quote.author, iconURL: quote.authorImage})
			.setDescription(quote.quote)
			.setColor('#1fd619')
			.setFooter('- ' + quote.year);

		await message.reply('Alright, here\'s your quote.')
		await message.channel.send({embeds:[embed]});
	} else {
		message.reply('Cannot find quote');
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
