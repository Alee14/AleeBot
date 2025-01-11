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
const { pendingQuote } = require('../models/quote');
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
	try {
		let newAuthor, newAuthorImage, newQuote, newYear;
		let isSetupRunning = false;

		const setupProcess = [
			'Provide the name of the author:',
			'Submit the image of the author:\nYou need to use a picture link that ends in .jpg or .png (like those from IMGUR or Google Images), and the picture should be either 128x128 pixels or 512x512 pixels in size.',
			'Enter the quote:',
			'Specify the year from which the quote originates:'
		];

		async function createQuote() {
			await pendingQuote.create({
				author: newAuthor,
				authorImage: newAuthorImage,
				quote: newQuote,
				year: newYear,
			});
		}

		let setupMessage = "Welcome to the AleeBot Quote Setup!\n";
		setupMessage += "Please follow these rules when submitting quotes:\n";
		setupMessage += "```1. Do not use profanity or offensive language.\n";
		setupMessage += "2. Do not send any personal information.\n";
		setupMessage += "3. Only send noteworthy quotes.```\n";
		setupMessage += "We reserve the right to reject any quotes that do not meet our criteria.\n";

		if (isSetupRunning) {
			return await message.reply('You are already setting up a quote.');
		}

		const filter = (m) => m.author.id === message.author.id;

		isSetupRunning = true;
		await message.reply(':arrow_left: Check DMs to continue.');

		const dmChannel = await message.author.createDM();
		await dmChannel.send(setupMessage);
		await dmChannel.send(setupProcess[0]);

		let counter = 1;
		const collector = dmChannel.createMessageCollector({
			filter,
			max: setupProcess.length,
			time: 1000 * 120
		});

		collector.on('collect', async () => {
			if (counter < setupProcess.length) {
				await dmChannel.send(setupProcess[counter++]);
			}
		});

		collector.on('end', async (collected) => {
			if (collected.size < setupProcess.length) {
				dmChannel.send('Quote setup was not completed. Please rerun the command.');
			} else {
				const quoteContent = collected.map((m) => m.content);
				newAuthor = quoteContent[0];
				newAuthorImage = quoteContent[1];
				newQuote = quoteContent[2];
				newYear = quoteContent[3];

				const setupEmbed = new MessageEmbed()
					.setAuthor('AleeBot Quote Setup', client.user.avatarURL())
					.setDescription('Are you happy with this quote?\nThis quote will be sent for manual approval automatically in 2 minutes.')
					.addField('Author', newAuthor)
					.addField('Author Image (URL)', newAuthorImage)
					.addField('Quote', newQuote)
					.addField('Year', newYear)
					.setColor('#1fd619');

				let messageReact = await dmChannel.send({embeds: [setupEmbed]});
				await messageReact.react('🧑');
				await messageReact.react('📷');
				await messageReact.react('🖋️');
				await messageReact.react('📅');
				await messageReact.react('✅');
				await messageReact.react('❌');

				const reactionFilter = (reaction, user) => {
					return ['🧑', '📷', '🖋️', '📅', '✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
				};

				const reactionCollector = messageReact.createReactionCollector({
					filter: reactionFilter,
					time: 1000 * 120
				});

				reactionCollector.on('collect', async (reaction) => {
					switch (reaction.emoji.name) {
						case '🧑':
							await dmChannel.send('You selected the author. Please provide the name of the author.');
							const authorResponse = await dmChannel.awaitMessages({ filter, max: 1, time: 60000 });
							if (authorResponse.size) newAuthor = authorResponse.first().content;
							await dmChannel.send('Updated author name.');
							break;
						case '📷':
							await dmChannel.send('You selected the author image. Please provide the image URL.');
							const imageResponse = await dmChannel.awaitMessages({ filter, max: 1, time: 60000 });
							if (imageResponse.size) newAuthorImage = imageResponse.first().content;
							await dmChannel.send('Updated author URL.');
							break;
						case '🖋️':
							await dmChannel.send('You selected the quote. Please provide the quote.');
							const quoteResponse = await dmChannel.awaitMessages({ filter, max: 1, time: 60000 });
							if (quoteResponse.size) newQuote = quoteResponse.first().content;
							await dmChannel.send('Updated quote.');
							break;
						case '📅':
							await dmChannel.send('You selected the year. Please provide the year.');
							const yearResponse = await dmChannel.awaitMessages({ filter, max: 1, time: 60000 });
							if (yearResponse.size) newYear = yearResponse.first().content;
							await dmChannel.send('Updated year.');
							break;
						case '✅':
							reactionCollector.stop('completed');
							break;
						case '❌':
							reactionCollector.stop('cancelled');
							break;
					}

					const updatedEmbed = new MessageEmbed()
						.setAuthor('AleeBot Quote Setup', client.user.avatarURL())
						.setDescription('Are you happy with this quote?\nThis quote will be sent for manual approval automatically in 2 minutes.')
						.addField('Author', newAuthor)
						.addField('Author Image (URL)', newAuthorImage)
						.addField('Quote', newQuote)
						.addField('Year', newYear)
						.setColor('#1fd619');

					await messageReact.edit({embeds: [updatedEmbed]});
				});

				reactionCollector.on('end', async (collected, reason) => {
					if (reason === 'cancelled') {
						isSetupRunning = false;
						dmChannel.send('Cancelling quote setup.');
					} else if (reason === 'completed') {
						dmChannel.send('Sending this quote for manual approval.');
						isSetupRunning = false;
						await createQuote();
					} else {
						dmChannel.send('You have not responded. Sending this quote for manual approval.');
						isSetupRunning = false;
						await createQuote();
					}
				});

			}
		});
	} catch (error) {
		console.error(error);
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

