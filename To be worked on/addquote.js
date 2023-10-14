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
const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
	if (!['242775871059001344'].includes(message.author.id)) return message.reply('**This command is disabled due to a new system being implemented.**');
	try {
		let newAuthor;
		let newAuthorImage;
		let newQuote;
		let newYear;

		let quoteOriginator;

		let isSetupRunning = false;

		const setupProcess = [
			'Provide the name of the author.',
			'Submit the image of the author\nYou need to use a picture link that ends in .jpg or .png (like those from IMGUR or Google Images), and the picture should be either 128x128 pixels or 512x512 pixels in size.',
			'Enter the quote',
			'Specify the year from which the quote originates.'
		]

		let setupMessage = "Welcome to the AleeBot Quote Setup!\n"
		setupMessage += "Please follow these rules when submitting quotes\n"
		setupMessage += "```1. Do not use profanity or offensive language.\n"
		setupMessage += "2. Do not send any personal information.\n"
		setupMessage += "3. Only send noteworthy quotes.```\n"
		setupMessage += "We reserve the right to reject any quotes that do not meet our criteria.\n"

		let counter = 0

		if (isSetupRunning) {
			return await message.reply('You are already setting up the quote.');
		}
		const filter = m => m.author.id === message.author.id

		isSetupRunning = true;
		await message.reply(':arrow_left: Check your DMs to continue.')
		await message.author.send(setupMessage);
		await message.author.send(setupProcess[counter++]);

		const collector = message.channel.createMessageCollector({
			filter,
			max: setupProcess.length,
			time: 1000 * 60
		});

		collector.on('collect', message => {
			console.log(`Collected ${message.content} from ${message.author.tag}`)
			if (setupProcess.length > setupProcess.length + 1) {
				message.author.send(setupProcess[counter++]);
			}
		});

		collector.on('end', collected => {
			if (collected.size === 0 && collected.size < 2) {
				message.author.send('Quote setup was not completed, rerun the command.')
			} else {
				let quoteContent = [];

				collected.forEach((message) => {
					quoteContent.push(message.content)
				})

				newAuthor = quoteContent[0]
				newAuthorImage = quoteContent[1]
				newQuote = quoteContent[2]
				newYear = quoteContent[3]

				const setupEmbed = new MessageEmbed()
					.setAuthor('AleeBot Quote Setup', client.user.avatarURL())
					.setDescription('Are you happy with this quote?\nThis quote will be sent for manual approval')
					.addField('Author', newAuthor)
					.addField('Author Image (URL)', newAuthorImage)
					.addField('Quote', newQuote)
					.addField('Year', newYear);

				message.author.send({embeds:[setupEmbed]})
				quoteOriginator = message.author.tag
				console.log(`This quote has been originated from ${quoteOriginator}`)
				isSetupRunning = false;
			}

		});

		/*await quoteDB.create({
                author: newAuthor,
                authorImage: newAuthorImage,
                quote: newQuote,
                year: newYear,
            });*/

		//let messageReact = await message.author.send({embeds: [setupEmbed]});
		/*await messageReact.react('🧑');
        await messageReact.react('📷');
        await messageReact.react('🖋️');
        await messageReact.react('📅');*/

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
	description: 'Adds a quote to the database.',
	usage: 'addquote',
	category: '- Quote Commands',
};

