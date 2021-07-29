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
const mongo = require('../plugins/mongo');
const quoteSchema = require('../schema/quote-schema');
module.exports.run = async (client, message, args) => {
	if (!['242775871059001344'].includes(message.author.id)) return message.reply('**This command is disabled due to a new system being implemented.**');
	const Discord = require('discord.js');

	let NewQuote;
	let quo;

	let quoId;
	let quoAuthor;
	let quoAuthorImage;
	let quoQuote;
	let quoYear;

	if (args) {
		await mongo().then(async (mongoose) => {
			try {
				const quote = await quoteSchema.findOne({quoteID: "1", author: quoAuthor, authorImage: quoAuthorImage, quote: quoQuote, year: quoYear})
				/*const embed = new Discord.MessageEmbed()
					.setAuthor(quoAuthor, quoAuthorImage)
					.setDescription(quoQuote)
					.setColor('#1fd619')
					.setFooter('- ' + quoYear);

				await message.channel.send({embed});*/
				console.log(quote);
			} finally {
				await mongoose.connection.close();
			}
		})
	} else {

	}

	/*

	function GetNewQuote(quoteNum = -1) {
		NewQuote = new Discord.MessageEmbed();

		let quo = require('../storage/quotes.json').quotes

		if (quoteNum === -1) {
			quoteNum = Math.floor(Math.random() * 1000) % quo.length;
			quo=quo[quoteNum];
		}

		const author = quo.author;
		const authorImage = quo.authorImage;
		const quote = quo.quote;
		const year = quo.year;
		const url = quo.url;

		NewQuote.setAuthor(author, authorImage);
		NewQuote.setColor('#1fd619');
		NewQuote.setDescription(quote);
		NewQuote.setFooter('- ' + year);
		//NewQuote.setURL(url);

		return NewQuote;
	}

	const newquote = GetNewQuote();
	message.reply('Alright, here\'s your quote.');
	await message.channel.send(newquote);*/
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
