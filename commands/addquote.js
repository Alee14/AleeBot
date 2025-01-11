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

const setupUsers = new Set();

module.exports.run = async (client, message) => {
	try {
		let newAuthor, newAuthorImage, newQuote, newYear;

		if (setupUsers.has(message.author.id)) {
			return await message.reply('You are already setting up a quote.');
		}

		setupUsers.add(message.author.id);

		const setupProcess = [
			'Provide the name of the author:',
			'Submit the image of the author:\nYou can use an attachment or a link that ends in .jpg/.jpeg or .png (like those from IMGUR or Google Images), and the picture should be either 128x128 pixels or 512x512 pixels in size.',
			'Enter the quote:',
			'Specify the year from which the quote originates:'
		];

		async function createQuote() {
			await pendingQuote.create({
				author: newAuthor,
				authorImage: newAuthorImage,
				quote: newQuote,
				year: newYear,
				submitterAuthor: message.author.username,
				submitterID: message.author.id
			});
		}

		async function imageCheck(message) {
			const attachment = message.attachments.first();
			if (attachment) {
				const fileExtension = attachment.name.split('.').pop().toLowerCase();
				if (['jpg', 'png', 'jpeg'].includes(fileExtension)) {
					newAuthorImage = attachment.url.toString(); // Use the attachment's URL directly
				} else {
					await dmChannel.send('Invalid file type. Please attach a .jpg or .png image.');
					return await imageCheck(message);
				}
			} else if (msg.content.startsWith('http') && (message.content.endsWith('.jpg') || message.content.endsWith('.jpeg')  || message.content.endsWith('.png'))) {
				newAuthorImage = msg.content; // Use the provided URL
			} else {
				await dmChannel.send('Invalid input. Please provide an image URL or attach an image file.');
				return await imageCheck(message);
			}
		}

		let setupMessage = "Welcome to the AleeBot Quote Setup!\n";
		setupMessage += "Please follow these rules when submitting quotes:\n";
		setupMessage += "```1. No offensive content (NSFW, Racism, etc).\n";
		setupMessage += "2. Do not send any personal information.\n";
		setupMessage += "3. Only send noteworthy quotes.```\n";
		setupMessage += "We reserve the right to reject any quotes that do not meet our criteria.\n";

		const filter = (m) => m.author.id === message.author.id;

		await message.reply(':arrow_left: Check DMs to continue.');

		const dmChannel = await message.author.createDM();
		await dmChannel.send(setupMessage);
		await dmChannel.send(setupProcess[0]);

		let counter = 1;
		const collector = dmChannel.createMessageCollector({
			filter,
			max: setupProcess.length,
			time: 1000 * 1200
		});

		collector.on('collect', async (msg) => {
			if (counter === 2) { // Collecting author image
				await imageCheck(msg);
			}

			if (counter < setupProcess.length) {
				await dmChannel.send(setupProcess[counter++]);
			}
		});

		collector.on('end', async (collected) => {
			if (collected.size < setupProcess.length) {
				dmChannel.send('Quote setup was not completed. Please rerun the command.');
				setupUsers.delete(message.author.id);
			} else {
				const quoteContent = collected.map((m) => m.content);
				newAuthor = quoteContent[0];
				if (!newAuthorImage) {
					newAuthorImage = quoteContent[1] || 'N/A';
				}
				newQuote = quoteContent[2];
				newYear = quoteContent[3];

				const setupEmbed = new MessageEmbed()
					.setAuthor('AleeBot Quote Setup', client.user.avatarURL())
					.setDescription('Are you happy with this quote?\nThis quote will be sent for manual approval automatically in 20 minutes.')
					.addField('Author', newAuthor || 'N/A')
					.addField('Author Image (URL)', newAuthorImage || 'N/A')
					.addField('Quote', newQuote || 'N/A')
					.addField('Year', newYear || 'N/A')
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
					time: 1000 * 1200
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
							await dmChannel.send('You selected the author image. Please provide the image URL or attach an image file.');
							const imageResponse = await dmChannel.awaitMessages({ filter, max: 1, time: 60000 });
							await imageCheck(imageResponse.first());
							await dmChannel.send('Updated author image.');
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

					await messageReact.edit({embeds: [setupEmbed]});
				});

				reactionCollector.on('end', async (collected, reason) => {
					if (reason === 'cancelled') {
						dmChannel.send('Cancelling quote setup.');
					} else if (reason === 'completed') {
						dmChannel.send('Sending this quote for manual approval.');
						await createQuote();
					} else {
						dmChannel.send('You have not responded. Sending this quote for manual approval.');
						await createQuote();
					}
					setupUsers.delete(message.author.id);
				});
			}
		});
	} catch (error) {
		message.author.send('An error occurred while setting up the quote. Please try again.');
		setupUsers.delete(message.author.id);
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

